using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using TradeByte.Dtos.Ads;
using TradeByte.Dtos.Common;
using TradeByte.Models;
using TradeByte.Repositories.Interfaces;
using TradeByte.Services.Interfaces;

namespace TradeByte.Services
{
    /// <summary>
    /// Hirdetések üzleti logikája (CRUD, listázás, saját hirdetések).
    /// - Jogosultság: tulaj vagy Admin a módosító műveleteknél.
    /// - Publikus vs. bejelentkezett nézet mappelése.
    /// </summary>
    public class AdService : IAdService
    {
        private readonly IAdRepository _ads;
        private readonly IUnitOfWork _uow;
        private readonly ICurrentUser _current;
        private readonly ICategoryRepository _categories; // validációhoz / későbbi m2m frissítéshez jól jöhet
        private readonly IUserRepository _user;

        public AdService(
            IAdRepository ads,
            IUnitOfWork uow,
            ICurrentUser current,
            ICategoryRepository categories)
        {
            _ads = ads;
            _uow = uow;
            _current = current;
            _categories = categories;
        }

        //jelenlegi user Id int-ként. Unauthorized, ha nincs bejelentkezve vagy nem parse-olható.
        private int CurrentUserId
        {
            get
            {
                if (!_current.IsAuthenticated) throw new UnauthorizedAccessException();
                if (!int.TryParse(_current.UserId, out var id))
                    throw new UnauthorizedAccessException("Invalid user id.");
                return id;
            }
        }

        public async Task<int> CreateAsync(CreateAdDto dto, CancellationToken ct = default)
        {
            //User? user = await _user.GetByIdAsync(dto.UserId, ct)
              //          ?? throw new ArgumentException("Invalid user ID.", nameof(dto.UserId));

                if (dto is null) throw new ArgumentNullException(nameof(dto));
            var userId = CurrentUserId;

            if (string.IsNullOrWhiteSpace(dto.Title))
                throw new ArgumentException("Title is required.", nameof(dto));
            if (dto.Price < 0)
                throw new ArgumentException("Price must be >= 0.", nameof(dto));

            var entity = new Classified
            {
                Title = dto.Title.Trim(),
                Description = dto.Description?.Trim() ?? "",
                Price = dto.Price,
                CreatedAt = DateTime.UtcNow,
                UserId = userId,
                // Categories feltöltése lent
            };

            // --- Kategóriák hozzárendelése (M2M) ---
            if (dto.CategoryIds is { Count: > 0 })
            {
                var ids = dto.CategoryIds.Where(id => id > 0).Distinct().ToList();

                // Lekérjük a létező kategóriákat TRACKELT állapotban
                var categories = await _categories.GetByIdsAsync(ids, ct);

                // Validáció: minden kért ID létezzen
                var found = categories.Select(c => c.Id).ToHashSet();
                var missing = ids.Where(id => !found.Contains(id)).ToList();
                if (missing.Count > 0)
                    throw new KeyNotFoundException("Ismeretlen kategória ID(k): " + string.Join(", ", missing));

                // Hozzákötjük a kategóriákat az új hirdetéshez
                entity.Categories = new List<Category>(categories);
            }

            await _ads.AddAsync(entity, ct);
            await _uow.SaveChangesAsync(ct);

            return entity.Id;
        }


        public async Task<bool> UpdateAsync(int adId, UpdateAdDto dto, CancellationToken ct = default)
        {
            if (dto is null) throw new ArgumentNullException(nameof(dto));

            // Jogosultság: Tulajdonos vagy Admin
            var isOwner = await _ads.IsOwnerAsync(adId, CurrentUserId, ct);
            var isAdmin = _current.IsInRole("Admin");
            if (!isOwner && !isAdmin)
                throw new UnauthorizedAccessException();

            // Tracked entitás + kategóriák betöltése az M2M cseréhez
            var ad = await _ads.GetByIdAsync(
                adId,
                includeUser: false,
                includeCategories: true,
                includePictures: false,
                track: true,
                ct: ct);

            if (ad is null) return false;

            // ---- Mezők frissítése CSAK ha érkezett új érték ----

            // Cím
            if (dto.Title is not null)
            {
                var newTitle = dto.Title.Trim();
                if (newTitle.Length < 3)
                    throw new ArgumentException("A cím legalább 3 karakter legyen.", nameof(dto.Title));
                ad.Title = newTitle;
            }

            // Leírás (üresre is állítható)
            if (dto.Description is not null)
            {
                var newDesc = dto.Description.Trim();
                ad.Description = string.IsNullOrWhiteSpace(newDesc) ? null : newDesc;
            }

            // Ár (nullable -> csak ha küldöd)
            if (dto.Price is not null)
            {
                if (dto.Price.Value < 0)
                    throw new ArgumentOutOfRangeException(nameof(dto.Price), "Az ár nem lehet negatív.");
                ad.Price = dto.Price.Value;
            }

            // ---- Kategória M2M csere (csak ha érkezett CategoryIds) ----
            if (dto.CategoryIds is not null)
            {
                // deduplikálás
                var requestedIds = dto.CategoryIds
                    .Where(id => id > 0)
                    .Distinct()
                    .ToList();

                // Ha üres listát küldesz -> minden kategóriát leválasztunk
                if (requestedIds.Count == 0)
                {
                    ad.Categories.Clear();
                }
                else
                {
                    // Valóban létező kategóriák lekérése (ATTACH-elt entitások)
                    var categories = await _categories.GetByIdsAsync(requestedIds, ct);

                    // Validáció: minden kért ID létezzen
                    var foundIds = categories.Select(c => c.Id).ToHashSet();
                    var missing = requestedIds.Where(id => !foundIds.Contains(id)).ToList();
                    if (missing.Count > 0)
                        throw new KeyNotFoundException("Ismeretlen kategória ID(k): " + string.Join(", ", missing));

                    // Teljes csere: töröljük a régi kapcsolatokat és berakjuk a megtalált entitásokat
                    ad.Categories.Clear();
                    foreach (var c in categories)
                        ad.Categories.Add(c);   // ezek már létező, attach-elt entitások -> EF nem szúr duplán
                }
            }

            await _ads.UpdateAsync(ad, ct);      // ha tracked, ez akár no-op is lehet; maradhat a tisztaság kedvéért
            await _uow.SaveChangesAsync(ct);

            return true;
        }

        public async Task<bool> DeleteAsync(int adId, CancellationToken ct = default)
        {
            // Trackelt entitás a törléshez
            var ad = await _ads.GetByIdAsync(
                adId,
                includeUser: false,
                includeCategories: false,
                includePictures: false,
                track: true,
                ct: ct);

            if (ad is null) return false;

            // Jogosultság: Admin
            var isAdmin = _current.IsInRole("Admin");
            if (ad.UserId != CurrentUserId && !isAdmin)
                throw new UnauthorizedAccessException();

            await _ads.RemoveAsync(ad, ct);
            await _uow.SaveChangesAsync(ct);
            return true;
        }

        public async Task<AdDto?> GetByIdAsync(int adId, bool includeSellerProtectedData, CancellationToken ct = default)
        {
            var ad = await _ads.GetByIdAsync(
                adId,
                includeUser: true,
                includeCategories: true,
                includePictures: true,
                track: false,
                ct: ct);

            if (ad is null) return null;

            var showSeller = includeSellerProtectedData && _current.IsAuthenticated;
            return MapToAdDto(ad, showSeller);
        }

        public async Task<PagedResult<AdDto>> ListAsync(AdListQuery query, CancellationToken ct = default)
        {
            var page = await _ads.ListAsync(
                query,
                sortBy: "createdAt",
                desc: true,
                ct: ct);

            return new PagedResult<AdDto>
            {
                Items = page.Items.Select(MapToPublicDto).ToList(),
                Total = page.Total,
                Page = page.Page,
                PageSize = page.PageSize
            };
        }

        public async Task<PagedResult<AdDto>> ListMineAsync(PaginationQuery query, CancellationToken ct = default)
        {
            var page = await _ads.ListByUserAsync(
                CurrentUserId,
                query,
                sortBy: "createdAt",
                desc: true,
                ct: ct);

            return new PagedResult<AdDto>
            {
                Items = page.Items.Select(MapToPrivateDto).ToList(),
                Total = page.Total,
                Page = page.Page,
                PageSize = page.PageSize
            };
        }

        // ---- Mapping helpers ----
        private static AdDto MapToAdDto(Classified ad, bool includeSeller)
        {
            return new AdDto
            {
                Id = ad.Id,
                Title = ad.Title,
                Description = ad.Description,
                Price = ad.Price,
                CreatedAt = ad.CreatedAt,
                UserId = ad.UserId,
                SellerDisplayName = includeSeller ? ad.User?.Username : null,
                CategoryIds = ad.Categories?.Select(c => c.Id).ToList() ?? new List<int>(),
                
                PictureUrls = ad.Pictures?.Select(p => p.FileName).ToList() ?? new List<string>()
            };
        }

        // Publikus listanézet – eladó adatai nélkül
        private static AdDto MapToPublicDto(Classified ad)
            => MapToAdDto(ad, includeSeller: false);

        // Saját listanézet – seller info is mehet
        private static AdDto MapToPrivateDto(Classified ad)
            => MapToAdDto(ad, includeSeller: true);

    }
}
