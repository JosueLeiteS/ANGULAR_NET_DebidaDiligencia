export interface proveedor {

    idProveedor: number;
    razonSocial: string;
    nombreComercial?: string;
    identificacionTributaria?: number;
    numeroTelefonico?: string;
    correoElectronico?: string;
    sitioWeb?: string;
    direccionFisica?: string;
    pais?: string;
    facturacionAnualDolares?: number;
    fechaUltimaEdicion: Date;

}