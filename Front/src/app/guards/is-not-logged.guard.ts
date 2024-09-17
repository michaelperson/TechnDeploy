import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { JoueurService } from '../services/joueur.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotLoggedGuard {

  constructor(
    private joueurService: JoueurService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.joueurService.user$.pipe(map(user => {
      if(user) {
        return false;
      }
      return true;
    }));
  }
  
}
