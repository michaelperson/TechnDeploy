import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TournoiService } from 'src/app/services/tournoi.service';
import { CustomValidators } from 'src/app/validators/custom.validators';

@Component({
  templateUrl: './tournoi-create.component.html',
  styleUrls: ['./tournoi-create.component.scss']
})
export class TournoiCreateComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tournoiService: TournoiService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.form = formBuilder.group({
      nom: [null, [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2) 
      ]],
      lieu: [null, [
        Validators.maxLength(255),
        Validators.minLength(2) 
      ]],
      dateDeDebut: [null, [
        Validators.required,
        // valider la date
      ]],
      ageRequis: [null, [
        Validators.required
      ]],
      minJoueurs: [null, [
        Validators.required,
        Validators.min(2),
        Validators.max(16)
      ]],
      maxJoueurs: [null, [
        Validators.min(2),
        Validators.max(16),
      ]],
      genre: [null, [
        Validators.required
      ]],
    });

    this.form.get('maxJoueurs')?.addValidators([
      CustomValidators.largerThan(this.form.get('minJoueurs'), 'Nombre de joueurs minimum')
    ]);
  }

  submit() {
    if(this.form.invalid) 
      return;
    this.tournoiService.add(this.form.value).subscribe({
      next: data => {
        this.messageService.add({ severity: 'success', detail: 'Enregistrement OK' });
        this.router.navigate(['tournoi']);
      },
      error: () => {
        this.messageService.add({ severity: 'error', detail: 'Une erreur est survenue' });
      }
    })
  }

}
