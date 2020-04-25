using ObrasBibliograficas.Controllers;
using ObrasBibliograficas.Models;
using Xunit;

namespace ObrasBibliograficas.Test
{
    public class AutorTest
    {
        [Fact(DisplayName = "Deve retornar autores cadastrados")]
        public void deve_retornar_autores_cadastrados()
        {
            bool exist;

            using (var context = CarregarBancoInMemory.DataInMemory())
            {
                var controller = new AutorController(context);
                var autores = controller.GetAutor();
                exist = (autores.Result.Value != null);
            }
            Assert.True(exist);
        }

        [Fact(DisplayName = "Deve retornar autor por id")]
        public void deve_retornar_autor_por_id()
        {
            bool exist;

            using (var context = CarregarBancoInMemory.DataInMemory())
            {
                var controller = new AutorController(context);
                var autores = controller.GetAutorModel(1);
                exist = (autores.Result.Value != null);
            }
            Assert.True(exist);
        }

        [Fact(DisplayName = "Deve cadastrar um autor")]
        public void deve_cadastrar_um_autor()
        {
            var autor = new AutorModel() { Id = 4, Nome = "Teste" };

            using (var context = CarregarBancoInMemory.DataInMemory())
            {
                var controller = new AutorController(context);
                var cadastrar = controller.PostAutorModel(autor);
                var result = controller.GetAutorModel(autor.Id);
                Assert.Equal(autor, result.Result.Value);
            }
        }

        [Fact(DisplayName = "Deve atualizar um autor")]
        public void deve_atualizar_um_autor()
        {
            using (var context = CarregarBancoInMemory.DataInMemory())
            {
                var controller = new AutorController(context);
                var atualizar = controller.PutAutorModel(new AutorModel() { Id = 1, Nome = "Erick Oliveira" });
                var result = controller.GetAutorModel(1);
                Assert.Equal("Erick Oliveira", result.Result.Value.Nome);
            }
        }

        [Fact(DisplayName = "Deve deletar autor por id")]
        public void deve_deletar_autor_por_id()
        {
            bool deleted;

            using (var context = CarregarBancoInMemory.DataInMemory())
            {
                var controller = new AutorController(context);
                var deletar = controller.DeleteAutorModel(3);
                var result = controller.GetAutorModel(3);
                deleted = (result.Result.Value == null);
            }
            Assert.True(deleted);
        }
    }
}