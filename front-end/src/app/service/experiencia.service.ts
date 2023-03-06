import { Experiencia } from './../model/experiencia';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  expURL = environment.URL +'explab/'

  constructor(private httpClient: HttpClient ) { }

  public lista(): Observable<Experiencia[]>{
    return this.httpClient.get<Experiencia[]>(this.expURL + 'lista')
  }

  public detail(id: number): Observable<Experiencia>{
    return this.httpClient.get<Experiencia>(this.expURL + `detail/${id}`)
  }

  public save(exp: Experiencia): Observable<any>{
    return this.httpClient.post<any>(this.expURL + `create`, exp)
  }

  public update(id: number, exp: Experiencia): Observable<any>{
    return this.httpClient.put<any>(this.expURL + `update/${id}`, exp)
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.expURL + `delete/${id}`)
  }
}
