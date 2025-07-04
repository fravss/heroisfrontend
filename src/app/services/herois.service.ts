import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Herois } from '../interfaces/herois';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroisService {

  private baseUrl = environment.apiUrl + '/heroi';
  constructor(private http: HttpClient) { }

  getHerois(): Promise<Herois[]> {
    return firstValueFrom(this.http.get<Herois[]>(this.baseUrl));
  }

  deleteHeroi(id: number): Promise<void> {
      return firstValueFrom(this.http.delete<any>(`${this.baseUrl}/${id}`));
  }

  salvarHeroi(heroi: Herois): Promise<Herois> {
       return firstValueFrom(this.http.post<Herois>(`${this.baseUrl}`, heroi));
  }
  


}
