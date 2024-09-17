import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
 

  user$: BehaviorSubject<{ token: string, id: number, role: string }|null> 
    = new BehaviorSubject<{ token: string, id: number, role: string }|null>(null);

  constructor(
    private httpClient: HttpClient
  ) { 
    const token = localStorage.getItem('TOKEN');
    if(token) {
      const decoded: any = jwtDecode(token);
      this.user$.next({ ...decoded, token })
    }
  }

  add(value: any) {
    return this.httpClient.post<any>(environment.apiUrl + '/joueur', value);
  }

  exists(email: string) : Observable<boolean> {
    return this.httpClient.head(environment.apiUrl + '/joueur/' + email)
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      )
  }

  login(value: any) {
    return this.httpClient.post<{ token: string }>(
      environment.apiUrl + '/login', value
    ).pipe(tap(({ token }) => {
      localStorage.setItem('TOKEN', token);
      const decoded: any = jwtDecode(token);
      this.user$.next({ ...decoded, token });
    }));
  }

  logout() {
    this.user$.next(null);
    localStorage.clear();
  }
}
