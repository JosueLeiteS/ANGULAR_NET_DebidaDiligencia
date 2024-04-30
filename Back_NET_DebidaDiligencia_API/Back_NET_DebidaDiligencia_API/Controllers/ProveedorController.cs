using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Back_NET_DebidaDiligencia_API.Data;
using Back_NET_DebidaDiligencia_API.Models;

namespace Back_NET_DebidaDiligencia_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProveedorController : ControllerBase
    {
        private readonly ProveedorData _data;
        public ProveedorController(ProveedorData proveedorData)
        {
            _data = proveedorData;
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            List<Proveedor> Lista = await _data.Listar();

            return StatusCode(StatusCodes.Status200OK, Lista);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Obtener(int id)
        {
            Proveedor obj = await _data.Obtener(id);

            return StatusCode(StatusCodes.Status200OK, obj);
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] Proveedor obj)
        {
            bool respuesta = await _data.Crear(obj);

            return StatusCode(StatusCodes.Status200OK, new { responseState = respuesta});
        }

        [HttpPut]
        public async Task<IActionResult> Editar([FromBody] Proveedor obj)
        {
            bool respuesta = await _data.Editar(obj);

            return StatusCode(StatusCodes.Status200OK, new { responseState = respuesta });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            bool respuesta = await _data.Eliminar(id);

            return StatusCode(StatusCodes.Status200OK, new { responseState = respuesta });
        }
    }
}
