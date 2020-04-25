using Microsoft.EntityFrameworkCore;

namespace ObrasBibliograficas.Models
{
    public class AutorContext : DbContext
    {
        public AutorContext(DbContextOptions<AutorContext> options) : base(options)
        {
        }

        public DbSet<AutorModel> Autor { get; set; }
    }
}