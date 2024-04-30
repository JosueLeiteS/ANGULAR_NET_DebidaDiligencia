# Aplicación de Debida Diligencia con Angular, .NET y SQL

Esta aplicación web permite realizar la debida diligencia de múltiples proveedores. Cuenta con un frontend desarrollado en Angular que se conecta a un backend .NET y una base de datos SQL.

La configuracion de conexion a la base de datos se encuentra en el archivo backend appsettings.json

## Backend .NET y DB SQL

El backend .NET se conecta a una base de datos SQL para almacenar la información de los proveedores.

## Frontend Angular

El frontend Angular se conecta al backend .NET y a la API Webscraper, ubicada en [el siguiente enlace](https://github.com/JosueLeiteS/NET_WebScraping_API), para obtener información de los proveedores y realizar el proceso de debida diligencia al igual que la verificacion de sanciones.

Configuración por defecto:

    API .NET Proveedores: http://localhost:5183/api/
    API Webscraper: https://localhost:44388/

La configuración predeterminada está definida en el archivo frontend TypeScript appsettings.ts. Para modificar los puertos o la URL de la API Webscraper en el programa, edite las variables correspondientes en este archivo.

### Autenticación API Webscraper:

La API Webscraper requiere autenticación JWT. Los valores de autenticación necesarios se encuentran en el archivo frontend appsettings.ts.
