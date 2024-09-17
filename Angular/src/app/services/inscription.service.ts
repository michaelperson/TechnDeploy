import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(
    private httpClient: HttpClient
  ) { }

  add(value: any) {
    return this.httpClient.post(environment.apiUrl + '/inscription', value);
  }
}
