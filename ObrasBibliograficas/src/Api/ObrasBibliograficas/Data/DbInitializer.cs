using ObrasBibliograficas.Models;
using System.Linq;

namespace ObrasBibliograficas.Api.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AutorContext context)
        {
            context.Database.EnsureCreated();

            if (context.Autor.Any())
            {
                return;
            }

            var autores = new AutorModel[]
            {
                new AutorModel{ Nome = "Erick de Oliveira"},
                new AutorModel{ Nome = "Erick de Oliveira Junior"},
                new AutorModel{ Nome = "Erick Filho"},
                new AutorModel{ Nome = "Claudia Carvalho"},
                new AutorModel{ Nome = "Antonio dos Santos"},
                new AutorModel{ Nome = "Antonio"},
                new AutorModel{ Nome = "Antonio Andrade"},
            };

            foreach (AutorModel autor in autores)
            {
                context.Autor.Add(autor);
            }

            context.SaveChanges();
        }
    }
}