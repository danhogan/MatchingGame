using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MatchingApi.Models;
using Microsoft.IdentityModel.Tokens;

namespace MatchingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageItemsController : ControllerBase
    {
        private readonly ImageContext _context;

        public ImageItemsController(ImageContext context)
        {
            _context = context;
        }

        // GET: api/ImageItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImageItem>>> GetImageItems()
        {
            if (_context.ImageItems.IsNullOrEmpty())
            {
                var files = from file in Directory.EnumerateFiles("../images") select Path.GetFileName(file);
                int idCounter = 1;
                foreach (var file in files)
                {
                    ImageItem newItem = new ImageItem()
                    {
                        Id = idCounter,
                        FileName = file
                    };
                    _context.ImageItems.Add(newItem);
                    idCounter++;
                }
                await _context.SaveChangesAsync();
            }

            return await _context.ImageItems.ToListAsync();
        }

        // GET: api/ImageItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ImageItem>> GetImageItem(long id)
        {
            var imageItem = await _context.ImageItems.FindAsync(id);

            if (imageItem == null)
            {
                return NotFound();
            }

            return imageItem;
        }

        // PUT: api/ImageItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImageItem(long id, ImageItem imageItem)
        {
            if (id != imageItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(imageItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ImageItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ImageItem>> PostImageItem(ImageItem imageItem)
        {
            _context.ImageItems.Add(imageItem);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetImageItem", new { id = imageItem.Id }, imageItem);
            return CreatedAtAction(nameof(GetImageItem), new { id = imageItem.Id }, imageItem);
        }

        // DELETE: api/ImageItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImageItem(long id)
        {
            var imageItem = await _context.ImageItems.FindAsync(id);
            if (imageItem == null)
            {
                return NotFound();
            }

            _context.ImageItems.Remove(imageItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImageItemExists(long id)
        {
            return _context.ImageItems.Any(e => e.Id == id);
        }
    }
}
