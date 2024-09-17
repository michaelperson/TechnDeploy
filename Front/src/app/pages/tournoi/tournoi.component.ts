import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { TournoiIndex } from 'src/app/models/tournoi-index.model';
import { InscriptionService } from 'src/app/services/inscription.service';
import { JoueurService } from 'src/app/services/joueur.service';
import { TournoiService } from 'src/app/services/tournoi.service';

@Component({
  templateUrl: './tournoi.component.html',
  styleUrls: ['./tournoi.component.scss']
})
export class TournoiComponent implements OnInit, OnDestroy {

  tournois: TournoiIndex[] = [];
  connectedUser: any;
  //subscription!: Subscription
  destroyed$: Subject<boolean> = new Subject();

  constructor(
    private tournoiService: TournoiService, 
    private joueurService:JoueurService,
    private inscriptionService:InscriptionService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    // méthode qui est appelée à l'initialisation du composant
    this.loadTournaments();
    this.joueurService.user$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(user => this.connectedUser = user)
    //this.subscription = this.joueurService.user$.subscribe(user => this.connectedUser = user)
  }

  loadTournaments() {
    this.tournoiService.getAll().subscribe({
      next: data => {
        this.tournois = data;
      }, // en cas de success
      error: () => {}, // en cas d'erreur
      complete: () => {} // lorsque l'observable arrête d'emettre
    })
  }

  canRegister(tournoi: any) {
    if(!this.connectedUser)
      return false;
    if(tournoi.joueurs.some((j: any) => j.id === this.connectedUser.id)) {
      return false;
    }
    // ...

    return true;
  }

  register(tournoi: any) {
    this.inscriptionService.add({ tournoiId: tournoi.id, joueurId: this.connectedUser.id }).subscribe(() => {
      this.messageService.add({ severity: 'success', detail: 'Inscription OK' });
      this.loadTournaments();
    });
  }

  canStart(tournoi: any) {
    if(this.connectedUser?.role !== 'ADMIN') {
      return false;
    }
    if(tournoi.nbJoueurs < tournoi.minJoueurs) {
      return false;
    }
    if(new Date(tournoi.date) < new Date()) {
      return false;
    }
    if(tournoi.status !== 'Planifié') {
      return false;
    }
    return true;
  }

  start(tournoi: any) {
    this.tournoiService.start(tournoi).subscribe(() => {
      this.messageService.add({ severity: 'success', detail: 'Le tournoi a démarré' });
      this.loadTournaments();
    });
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

/*
OnInit => à l'initialisation
AfterViewInit => une fois que le dom est chargé
OnChanges => à chaque fois d'un Input est modifié
OnDestroy => à la destruction du composant
 */
