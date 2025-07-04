import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Herois } from '../interfaces/herois';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroisService {

  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getHerois(): Promise<Herois[]> {
    return firstValueFrom(this.http.get<Herois[]>(this.baseUrl));
  }

}
