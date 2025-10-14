using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TradeByte.Services.Interfaces;

namespace TradeByte.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PictureController : ControllerBase
    {
        private readonly IPictureService _pictureService;

        public PictureController(IPictureService pictureService)
        {
            _pictureService = pictureService;
        }

        /// <summary>
        /// Egy adott hirdetéshez tartozó képek listázása.
        /// </summary>
        [HttpGet("{adId:int}")]
        public async Task<IActionResult> GetPictures(int adId, CancellationToken ct)
        {
            IList<IFormFile> pictures = await _pictureService.ListAsync(adId, ct);
            return Ok(pictures);
        }

        /// <summary>
        /// Képek feltöltése egy adott hirdetéshez.
        /// </summary>
        [HttpPost("{adId}")]
        //[RequestSizeLimit(10_000_000)] 
        public async Task<IActionResult> UploadPictures(int adId, [FromForm] IList<IFormFile> files, CancellationToken ct)
        {
            if (files == null || files.Count == 0)
                return BadRequest(new { message = "Nem lett feltöltve fájl." });

            try
            {
                bool success = await _pictureService.UploadAsync(files, adId, ct);

                if (!success)
                    return BadRequest(new { message = "A feltöltés nem sikerült." });

                return Ok(new { message = $"{files.Count} fájl sikeresen feltöltve." });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Képek törlése egy adott hirdetéshez.
        /// </summary>
        [HttpDelete("byadid/{adId}")]
        public async Task<IActionResult> DeletePictures(int adId, CancellationToken ct)
        {
            bool result = await _pictureService.DeleteByAdIdAsync(adId, ct);

            if (!result)
                return Ok(new { message = "Nem volt mit törölni (a hirdetéshez nem tartozott kép)." });

            return Ok(new { message = "A kép(ek) sikeresen törölve lettek." });
        }

        /// <summary>
        /// Képek törlése egy adott hirdetéshez.
        /// </summary>
        [HttpDelete("{pictName}")]
        public async Task<IActionResult> DeletePictureById(string pictName, CancellationToken ct)
        {
            bool result = await _pictureService.DeleteAsync(pictName, ct);

            if (!result)
                return Ok(new { message = "Nem volt mit törölni (a hirdetéshez nem tartozott kép)." });

            return Ok(new { message = "A kép sikeresen törölve." });
        }
    }
}
