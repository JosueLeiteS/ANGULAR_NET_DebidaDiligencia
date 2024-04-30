namespace Back_NET_DebidaDiligencia_API.Models
{
    public class Proveedor
    {
        public int IdProveedor { get; set; }
        public string RazonSocial { get; set; }
        public string? NombreComercial { get; set; }
        public long? IdentificacionTributaria { get; set; }
        public string? NumeroTelefonico { get; set; }
        public string? CorreoElectronico { get; set; }
        public string? SitioWeb { get; set; }
        public string? DireccionFisica { get; set; }
        public string? Pais { get; set; }
        public decimal? FacturacionAnualDolares { get; set; }
        public DateTime FechaUltimaEdicion { get; set; }

    }
}
