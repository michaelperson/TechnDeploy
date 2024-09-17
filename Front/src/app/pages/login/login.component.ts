import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { JoueurService } from 'src/app/services/joueur.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private joueurService: JoueurService,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  login() {
    if(this.form.invalid) {
      return
    }
    this.joueurService.login(this.form.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', detail: 'OK' });
        this.router.navigate(['tournoi'])
      }
    })
  }
}
