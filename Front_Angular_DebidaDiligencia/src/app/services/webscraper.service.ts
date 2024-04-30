import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { responseModel } from '../models/webscraping/responseModel';

@Injectable({
  providedIn: 'root'
})
export class WebscraperService {

  private http = inject(HttpClient);
  private apiUrl: string = appsettings.webscraperApiUrlBase + "api/WebScraper";
  private authUrl: string = appsettings.webscraperApiUrlBase + "auth";

  constructor() { }

  webscraper(searchQuery: string, auth: string){
    const authHeaders = new HttpHeaders().set('Authorization', `Bearer ${auth}`);
    return this.http.get<responseModel>(`${this.apiUrl}?searchQuery=${searchQuery}`,  {headers: authHeaders})
  }

  autentificar(user: string, password: string){
    return this.http.get(`${this.authUrl}/${user}/${password}`, {responseType: "text"})
  }

}
