using TradeByte.Models;
using TradeByte.Repositories.Interfaces;
using TradeByte.Services.Interfaces;

namespace TradeByte.Services
{
    /// <summary>
    /// Képek kezelésének üzleti logikája (CRUD, listázás, saját hirdetések).
    /// </summary>
    public class PictureService : IPictureService
    {
        private readonly IUnitOfWork _uow;
        private readonly IPictureRepository _pictureRepository;
        private readonly IAdRepository _adRepository;

        private readonly string _imageFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

        private static readonly string[] permittedExtensions = new string[] { ".jpg", ".jpeg", ".png" };
        private const long maxFileSize = 3 * 1024 * 1024; // 3 MB

        public PictureService(IUnitOfWork uow, IPictureRepository pictureRepository, IAdRepository adRepository)
        {
            _uow = uow;
            _pictureRepository = pictureRepository;
            _adRepository = adRepository;
        }

        public async Task<bool> DeleteByAdIdAsync(int adId, CancellationToken ct = default)
        {
            IList<Picture> pictures = await _pictureRepository.ListByAdAsync(adId, ct);

            if (pictures.Count == 0)
            {
                return false;
            }

            foreach (Picture pict in pictures)
            {
                await DeletePicture(pict, ct);
            }

            return true;
        }

        public async Task<IList<IFormFile>> ListAsync(int adId, CancellationToken ct = default)
        {
            IList<IFormFile> files = new List<IFormFile>();
            IList<Picture> pictures = await _pictureRepository.ListByAdAsync(adId, ct);

            foreach (Picture pict in pictures)
            {
                string filePath = Path.Combine(_imageFolder, adId.ToString(), pict.FileName);
                if (File.Exists(filePath))
                {
                    MemoryStream memory = new MemoryStream();
                    using (FileStream stream = new FileStream(filePath, FileMode.Open))
                    {
                        await stream.CopyToAsync(memory);
                    }
                    memory.Position = 0;
                    IFormFile file = new FormFile(memory, 0, memory.Length, null, pict.FileName)
                    {
                        Headers = new HeaderDictionary(),
                        ContentType = "application/octet-stream"
                    };
                    files.Add(file);
                }
            }

            return files;
        }

        public async Task<bool> UploadAsync(IList<IFormFile> files, int adId, CancellationToken ct = default)
        {
            if (files == null || files.Count == 0)
                return false;

            if (!await _adRepository.ExistsAsync(adId, ct))
            {
                throw new KeyNotFoundException($"A megadott hírdetés azonosító ({adId}) nem található.");
            }

            if (files.Any(x => !permittedExtensions.Contains(Path.GetExtension(x.FileName).ToLower().Trim())))
            {
                throw new ArgumentException("Csak .jpg, .jpeg és .png kiterjesztésű fájlok tölthetők fel.");
            }

            if (files.Any(x => x.Length > maxFileSize))
            {
                throw new ArgumentException("Egy fájl mérete nem lehet nagyobb 3 MB-nál.");
            }

            foreach (IFormFile file in files)
            {
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                string uploadPath = Path.Combine(_imageFolder, adId.ToString());

                if (!Directory.Exists(uploadPath))
                    Directory.CreateDirectory(uploadPath);

                string filePath = Path.Combine(uploadPath, fileName);

                // Mentés szerverre
                using (FileStream stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                Picture pict = new Picture(fileName, adId);
                await _pictureRepository.AddAsync(pict, ct);
                await _uow.SaveChangesAsync(ct);
            }

            return true;
        }

        public async Task<bool> DeleteAsync(int pictId, CancellationToken ct = default)
        {
            Picture? picture = await _pictureRepository.GetByIdAsync(pictId, ct);

            if (picture == null)
            {
                return false;
            }

            return await DeletePicture(picture, ct);
        }

        private async Task<bool> DeletePicture(Picture pict, CancellationToken ct = default)
        {
            string filePath = Path.Combine(_imageFolder, pict.ClassifiedId.ToString(), pict.FileName);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
            await _pictureRepository.RemoveAsync(pict, ct);

            return true;
        }
    }
}
