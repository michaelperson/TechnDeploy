import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TournoiIndex } from '../models/tournoi-index.model';

@Injectable({
  providedIn: 'root'
})
export class TournoiService {

  constructor(
    // HttpClientModule
    private httpClient: HttpClient,
  ) { }

  getAll(): Observable<TournoiIndex[]> {
    // get tournaments from api
    return this.httpClient.get<TournoiIndex[]>(environment.apiUrl + '/tournoi');
  }

  add(tournoi: any) {
    // token
    return this.httpClient.post<any>(environment.apiUrl + '/tournoi', tournoi);
  }

  start(tournoi: any) {
    return this.httpClient.patch<any>(environment.apiUrl + '/tournoi/' + tournoi.id + '/start', null);
  }
}
