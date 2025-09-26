using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TradeByte.Services.Interfaces;
using TradeByte.Repositories.Interfaces;
using TradeByte.Dtos.Categories;
using TradeByte.Models;

namespace TradeByte.Services
{
    /// <summary>
    /// Kategóriák kezelése. Listázás publikus; módosítások admin-only.
    /// </summary>
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categories;
        private readonly IUnitOfWork _uow;
        private readonly ICurrentUser _current;

        public CategoryService(ICategoryRepository categories, IUnitOfWork uow, ICurrentUser current)
        {
            _categories = categories;
            _uow = uow;
            _current = current;
        }

        public async Task<IReadOnlyList<CategoryDto>> GetAllAsync(CancellationToken ct = default)
        {
            var list = await _categories.GetAllAsync(ct);
            // egyszerű DTO-map
            return list.Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name
            }).ToList();
        }

        public async Task<int> CreateAsync(CreateCategoryDto dto, CancellationToken ct = default)
        {
            if (!_current.IsInRole("Admin"))
                throw new UnauthorizedAccessException();

            if (string.IsNullOrWhiteSpace(dto.Name))
                throw new ArgumentException("Name is required.", nameof(dto));

            var name = dto.Name.Trim();

            // duplikátum védelem
            var exists = (await _categories.GetAllAsync(ct))
                         .Any(c => c.Name.ToLower() == name.ToLower());
            if (exists)
                throw new InvalidOperationException("Category with the same name already exists.");

            var entity = new Category { Name = name };
            await _categories.AddAsync(entity, ct);
            await _uow.SaveChangesAsync(ct);

            return entity.Id;
        }

        public async Task<bool> UpdateAsync(int id, UpdateCategoryDto dto, CancellationToken ct = default)
        {
            if (!_current.IsInRole("Admin"))
                throw new UnauthorizedAccessException();

            var entity = await _categories.GetByIdAsync(id, ct);
            if (entity is null) return false;

            if (!string.IsNullOrWhiteSpace(dto.Name))
            {
                var name = dto.Name.Trim();

                // duplikátum védelem update-nél is
                var exists = (await _categories.GetAllAsync(ct))
                             .Any(c => c.Id != id && c.Name.ToLower() == name.ToLower());
                if (exists)
                    throw new InvalidOperationException("Category with the same name already exists.");

                entity.Name = name;
            }

            await _categories.UpdateAsync(entity, ct);
            await _uow.SaveChangesAsync(ct);
            return true;
        }

        public async Task<bool> DeleteAsync(int id, CancellationToken ct = default)
        {
            if (!_current.IsInRole("Admin"))
                throw new UnauthorizedAccessException();

            var entity = await _categories.GetByIdAsync(id, ct);
            if (entity is null) return false;

            await _categories.RemoveAsync(entity, ct);
            await _uow.SaveChangesAsync(ct);
            return true;
        }
    }
}
