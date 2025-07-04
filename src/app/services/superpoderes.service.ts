import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Superpoderes } from '../interfaces/superpoderes';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable({
  providedIn: 'root'
})
export class SuperpoderesService {
  private baseUrl = environment.apiUrl + '/superpoderes';
  constructor(private http: HttpClient) { }

  getSuperpoderes(): Promise<Superpoderes[]> {
    return firstValueFrom(this.http.get<Superpoderes[]>(this.baseUrl));
  }
}
