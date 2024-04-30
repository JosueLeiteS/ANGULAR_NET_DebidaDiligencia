import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { proveedor } from '../models/proveedor';
import { response } from '../models/response'

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.proveedorApiUrlBase + "Proveedor"

  constructor() { }

  listar(){
    return this.http.get<proveedor[]>(this.apiUrl)
  }

  obtener(id: number){
    console.log("Obtener")
    return this.http.get<proveedor>(`${this.apiUrl}/${id}`)
  }

  crear(obj: proveedor){
    console.log("Crear")
    return this.http.post<response>(this.apiUrl, obj)
  }

  editar(obj: proveedor){
    console.log("Editar")
    return this.http.put<response>(this.apiUrl, obj)
  }

  eliminar(id: number){
    return this.http.delete<response>(`${this.apiUrl}/${id}`)
  }
}
