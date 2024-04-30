
CREATE DATABASE DBDebidaDiligencia
GO

USE DBDebidaDiligencia;

CREATE TABLE Proveedor(
id_proveedor int primary key identity,
razon_social varchar(255),
nombre_comercial varchar(255),
identificacion_tributaria bigint,
numero_telefonico varchar(20),
correo_electronico varchar(255),
sitio_web varchar(255),
direccion_fisica varchar(255),
pais varchar(50),
facturacion_anual_dolares DECIMAL(10,2),
fecha_ultima_edicion DATETIME DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO [dbo].[Proveedor]
           ([razon_social]
           ,[nombre_comercial]
           ,[identificacion_tributaria]
           ,[numero_telefonico]
           ,[correo_electronico]
           ,[sitio_web]
           ,[direccion_fisica]
           ,[pais]
           ,[facturacion_anual_dolares])
     VALUES
           ('EGIS LIMITED', 'EGIS', '1234567890123', '+14155551212','egis@example.com','https://www.egis.com','100 Main Street, San Francisco, CA','USA','1000000.50')
GO

INSERT INTO [dbo].[Proveedor]
           ([razon_social]
           ,[nombre_comercial]
           ,[identificacion_tributaria]
           ,[numero_telefonico]
           ,[correo_electronico]
           ,[sitio_web]
           ,[direccion_fisica]
           ,[pais]
           ,[facturacion_anual_dolares])
     VALUES
           ('COMPUTECH BUSINESS SERVICES LIMITED', 'COMPUTECH', '12343446953125', '+14152521112','computech@example.com','https://www.computech.com','777 Side Street','FR','8460000.50')
GO

INSERT INTO [dbo].[Proveedor]
           ([razon_social]
           ,[nombre_comercial]
           ,[identificacion_tributaria]
           ,[numero_telefonico]
           ,[correo_electronico]
           ,[sitio_web]
           ,[direccion_fisica]
           ,[pais]
           ,[facturacion_anual_dolares])
     VALUES
           ('ABASCIENCE TECH CO. LTD.', 'ABASCIENCE TECH', '1234232292123', '+141523412','abascience@example.com','https://www.egis.com','100 Main Street, San Francisco, CAL','CA','1245000.50')
GO

CREATE PROCEDURE sp_listarProveedores
AS
BEGIN
	SELECT 
		id_proveedor,
		razon_social,
		nombre_comercial,
		identificacion_tributaria,
		numero_telefonico,
		correo_electronico,
		sitio_web,
		direccion_fisica,
		pais,
		facturacion_anual_dolares,
		fecha_ultima_edicion
  FROM Proveedor;
END;
GO

CREATE PROCEDURE sp_obtenerProveedor(
@id_proveedor int
)
AS
BEGIN
	SELECT 
		id_proveedor,
		razon_social,
		nombre_comercial,
		identificacion_tributaria,
		numero_telefonico,
		correo_electronico,
		sitio_web,
		direccion_fisica,
		pais,
		facturacion_anual_dolares,
		fecha_ultima_edicion
  FROM Proveedor where id_proveedor = @id_proveedor;
END;
GO

CREATE PROCEDURE sp_crearProveedor(
    @razon_social varchar(255),
    @nombre_comercial varchar(255),
    @identificacion_tributaria bigint,
    @numero_telefonico varchar(20),
    @correo_electronico varchar(255),
    @sitio_web varchar(255),
    @direccion_fisica varchar(255),
    @pais varchar(50),
    @facturacion_anual_dolares DECIMAL(10,2)
)
AS
BEGIN
    INSERT INTO Proveedor (
        razon_social,
        nombre_comercial,
        identificacion_tributaria,
        numero_telefonico,
        correo_electronico,
        sitio_web,
        direccion_fisica,
        pais,
        facturacion_anual_dolares
    )
    VALUES (
        @razon_social,
        @nombre_comercial,
        @identificacion_tributaria,
        @numero_telefonico,
        @correo_electronico,
        @sitio_web,
        @direccion_fisica,
        @pais,
        @facturacion_anual_dolares
    );
END;
GO

CREATE PROCEDURE sp_editarProveedor (
  @id_proveedor INT,
  @razon_social VARCHAR(255),
  @nombre_comercial VARCHAR(255),
  @identificacion_tributaria BIGINT,
  @numero_telefonico VARCHAR(20),
  @correo_electronico VARCHAR(255),
  @sitio_web VARCHAR(255),
  @direccion_fisica VARCHAR(255),
  @pais VARCHAR(50),
  @facturacion_anual_dolares DECIMAL(10,2)
)
AS
BEGIN
  UPDATE Proveedor
  SET razon_social = @razon_social,
      nombre_comercial = @nombre_comercial,
      identificacion_tributaria = @identificacion_tributaria,
      numero_telefonico = @numero_telefonico,
      correo_electronico = @correo_electronico,
      sitio_web = @sitio_web,
      direccion_fisica = @direccion_fisica,
      pais = @pais,
      facturacion_anual_dolares = @facturacion_anual_dolares,
      fecha_ultima_edicion = CURRENT_TIMESTAMP
  WHERE id_proveedor = @id_proveedor;
END;

CREATE PROCEDURE <(
@id_proveedor int
)
AS
BEGIN
	DELETE FROM Proveedor where id_proveedor = @id_proveedor;
END;
GO