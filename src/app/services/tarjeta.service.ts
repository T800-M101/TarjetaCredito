import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarjeta } from '../components/tarjeta-credito/tarjetas.model';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  
  private myAppUrl:string = 'https://localhost:44345/';
  private myApiUrl:string = 'api/tarjeta/';

  constructor(private http:HttpClient) { }

  getListTarjetas(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteTarjeta(id:number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveTarjeta(tarjeta:Tarjeta):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl,tarjeta);
  }

  updateTarjeta(id:number, tarjeta:Tarjeta):Observable<any>{
    return this.http.put(this.myAppUrl+this.myApiUrl+id, tarjeta);

  }
}
