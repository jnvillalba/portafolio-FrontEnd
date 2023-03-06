import { Proyecto } from './../model/proyecto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  URL = environment.URL + 'proyecto/';

  constructor(private httpClient: HttpClient ) { }

  public lista(): Observable<Proyecto[]>{
    return this.httpClient.get<Proyecto[]>(this.URL + 'lista')
  }

  public detail(id: number): Observable<Proyecto>{
    return this.httpClient.get<Proyecto>(this.URL + `detail/${id}`)
  }

  public save(proy: Proyecto): Observable<any>{
    return this.httpClient.post<any>(this.URL + `create`, proy)
  }

  public update(id: number, proy: Proyecto): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, proy)
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`)
  }

}
