import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { JoueurService } from 'src/app/services/joueur.service';
import { CustomValidators } from 'src/app/validators/custom.validators';

@Component({
  templateUrl: './joueur-create.component.html',
  styleUrls: ['./joueur-create.component.scss']
})
export class JoueurCreateComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private joueurService: JoueurService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = fb.group({
      nom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      prenom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      email: [null, [Validators.required, Validators.email], [CustomValidators.existsEmail(joueurService)]],
      dateDeNaissance: [null, [Validators.required]],
      password: [null, [Validators.required]],
      genre: [null, [Validators.required]]
    });
  }

  save() {
    if(this.form.invalid) {
      return;
    }
    this.joueurService.add(this.form.value).subscribe({ 
      next: () => {
        // afficher un message
        this.messageService.add({ severity: 'success', detail: 'OK' });
        // rediriger vers la page de login
        this.router.navigate(['tournoi']);
      },
    })
  }
}
