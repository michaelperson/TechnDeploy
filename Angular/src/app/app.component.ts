
import { Component, ViewEncapsulation } from '@angular/core';
import { JoueurService } from './services/joueur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  connectedUser: any;

  constructor(
    private joueurService: JoueurService
  ) { 
    console.log(joueurService.user$)
    joueurService.user$.subscribe(user => this.connectedUser = user);
  }

  logout() {
    this.joueurService.logout();
  }

}
