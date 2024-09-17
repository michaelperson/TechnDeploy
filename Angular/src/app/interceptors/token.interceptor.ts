import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JoueurService } from '../services/joueur.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private joueurService: JoueurService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.joueurService.user$.value) {
      const clone 
        = request.clone({ 
          setHeaders: { Authorization: 'Bearer ' + this.joueurService.user$.value.token } 
        })
      return next.handle(clone);
    }
    
    return next.handle(request);
  }
}
