using Microsoft.EntityFrameworkCore;
using ObrasBibliograficas.Models;
using System;
using System.Collections.Generic;

namespace ObrasBibliograficas.Test
{
    public class CarregarBancoInMemory
    {
        public static AutorContext DataInMemory()
        {
            var options = new DbContextOptionsBuilder<AutorContext>()
                .EnableSensitiveDataLogging()
                .UseInMemoryDatabase(Guid
                .NewGuid().ToString()).Options;

            var context = new AutorContext(options);

            context.Autor.AddRange(new List<AutorModel>()
            {
                new AutorModel(){Id = 1, Nome = "Erick Henrique de Oliveira"},
                new AutorModel(){Id = 2, Nome = "Claudia Carvalho dos Santos"},
                new AutorModel(){Id = 3, Nome = "Fatima dos Santos"},
            });

            context.SaveChanges();

            return context;
        }
    }
}