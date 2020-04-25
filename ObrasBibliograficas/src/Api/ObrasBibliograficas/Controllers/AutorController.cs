using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ObrasBibliograficas.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ObrasBibliograficas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutorController : ControllerBase
    {
        private readonly AutorContext _context;

        public AutorController(AutorContext context)
        {
            _context = context;
        }

        // GET: api/Autor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AutorModel>>> GetAutor()
        {
            return await _context.Autor.ToListAsync();
        }

        // GET: api/Autor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AutorModel>> GetAutorModel(int id)
        {
            var autorModel = await _context.Autor.FindAsync(id);

            if (autorModel == null)
            {
                return NotFound();
            }

            return autorModel;
        }

        // PUT: api/Autor
        [HttpPut]
        public async Task<IActionResult> PutAutorModel(AutorModel autorModel)
        {
            try
            {
                var autor = _context.Find<AutorModel>(autorModel.Id);

                if (autor == null)
                {
                    return NotFound();
                }

                _context.Entry(autor).State = EntityState.Detached;
                autor = autorModel;
                _context.Update(autor);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                var exception = ex;
                return BadRequest();
            }
        }

        // POST: api/Autor
        [HttpPost]
        public async Task<ActionResult<AutorModel>> PostAutorModel(AutorModel autorModel)
        {
            _context.Autor.Add(autorModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAutorModel", new { id = autorModel.Id }, autorModel);
        }

        // DELETE: api/Autor/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AutorModel>> DeleteAutorModel(int id)
        {
            var autorModel = await _context.Autor.FindAsync(id);
            if (autorModel == null)
            {
                return NotFound();
            }

            _context.Autor.Remove(autorModel);
            await _context.SaveChangesAsync();

            return autorModel;
        }
    }
}