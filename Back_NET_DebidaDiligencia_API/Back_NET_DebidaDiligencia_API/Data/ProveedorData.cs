using Back_NET_DebidaDiligencia_API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Data;
using System.Data.SqlClient;

namespace Back_NET_DebidaDiligencia_API.Data
{
    public class ProveedorData
    {
        private readonly string conexion;

        public ProveedorData(IConfiguration config)
        {
            conexion = config.GetConnectionString("CadenaConexionSQL")!;
        }

        public async Task<List<Proveedor>> Listar()
        {
            List<Proveedor> lista = new List<Proveedor>();

            using (var conn = new SqlConnection(conexion))
            {
                await conn.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_listarProveedores", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync()) 
                {
                    while (await reader.ReadAsync()) 
                    {
                        lista.Add(new Proveedor()
                        {
                            IdProveedor = Convert.ToInt32(reader["id_proveedor"]),
                            RazonSocial = reader["razon_social"].ToString(),
                            NombreComercial = reader["nombre_comercial"].ToString(),
                            IdentificacionTributaria = (long)reader["identificacion_tributaria"],
                            NumeroTelefonico = reader["numero_telefonico"].ToString(),
                            CorreoElectronico = reader["correo_electronico"].ToString(),
                            SitioWeb = reader["sitio_web"].ToString(),
                            DireccionFisica = reader["direccion_fisica"].ToString(),
                            Pais = reader["pais"].ToString(),
                            FacturacionAnualDolares = (decimal)reader["facturacion_anual_dolares"],
                            FechaUltimaEdicion = (DateTime)reader["fecha_ultima_edicion"],
                        });
                    }
                }
                return lista;
            }
        }

        public async Task<Proveedor> Obtener(int id)
        {
            Proveedor obj = new Proveedor();

            using (var conn = new SqlConnection(conexion))
            {
                await conn.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_obtenerProveedor", conn);
                cmd.Parameters.AddWithValue("@id_proveedor", id);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        obj = new Proveedor()
                        {
                            IdProveedor = Convert.ToInt32(reader["id_proveedor"]),
                            RazonSocial = reader["razon_social"].ToString(),
                            NombreComercial = reader["nombre_comercial"].ToString(),
                            IdentificacionTributaria = (long)reader["identificacion_tributaria"],
                            NumeroTelefonico = reader["numero_telefonico"].ToString(),
                            CorreoElectronico = reader["correo_electronico"].ToString(),
                            SitioWeb = reader["sitio_web"].ToString(),
                            DireccionFisica = reader["direccion_fisica"].ToString(),
                            Pais = reader["pais"].ToString(),
                            FacturacionAnualDolares = (decimal)reader["facturacion_anual_dolares"],
                            FechaUltimaEdicion = (DateTime)reader["fecha_ultima_edicion"],
                        };
                    }
                }
                return obj;
            }
        }

        public async Task<Boolean> Crear(Proveedor obj)
        {
            bool respuesta = true;

            using (var conn = new SqlConnection(conexion))
            {
                
                SqlCommand cmd = new SqlCommand("sp_crearProveedor", conn);
                cmd.Parameters.AddWithValue("@razon_social", obj.RazonSocial);
                cmd.Parameters.AddWithValue("@nombre_comercial", obj.NombreComercial);
                cmd.Parameters.AddWithValue("@identificacion_tributaria", obj.IdentificacionTributaria);
                cmd.Parameters.AddWithValue("@numero_telefonico", obj.NumeroTelefonico);
                cmd.Parameters.AddWithValue("@correo_electronico", obj.CorreoElectronico);
                cmd.Parameters.AddWithValue("@sitio_web", obj.SitioWeb);
                cmd.Parameters.AddWithValue("@direccion_fisica", obj.DireccionFisica);
                cmd.Parameters.AddWithValue("@pais", obj.Pais);
                cmd.Parameters.AddWithValue("@facturacion_anual_dolares", obj.FacturacionAnualDolares);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await conn.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true: false;
                }
                catch
                {
                    respuesta = false;
                }

                return respuesta;
            }
        }

        public async Task<Boolean> Editar(Proveedor obj)
        {
            bool respuesta = true;

            using (var conn = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("sp_editarProveedor", conn);
                cmd.Parameters.AddWithValue("@id_proveedor", obj.IdProveedor);
                cmd.Parameters.AddWithValue("@razon_social", obj.RazonSocial);
                cmd.Parameters.AddWithValue("@nombre_comercial", obj.NombreComercial);
                cmd.Parameters.AddWithValue("@identificacion_tributaria", obj.IdentificacionTributaria);
                cmd.Parameters.AddWithValue("@numero_telefonico", obj.NumeroTelefonico);
                cmd.Parameters.AddWithValue("@correo_electronico", obj.CorreoElectronico);
                cmd.Parameters.AddWithValue("@sitio_web", obj.SitioWeb);
                cmd.Parameters.AddWithValue("@direccion_fisica", obj.DireccionFisica);
                cmd.Parameters.AddWithValue("@pais", obj.Pais);
                cmd.Parameters.AddWithValue("@facturacion_anual_dolares", obj.FacturacionAnualDolares);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await conn.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }

                return respuesta;
            }
        }

        public async Task<Boolean> Eliminar(int id)
        {
            bool respuesta = true;

            using (var conn = new SqlConnection(conexion))
            {

                SqlCommand cmd = new SqlCommand("sp_eliminarProveedor", conn);
                cmd.Parameters.AddWithValue("@id_proveedor", id);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    await conn.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch
                {
                    respuesta = false;
                }

                return respuesta;
            }
        }


    }
}
