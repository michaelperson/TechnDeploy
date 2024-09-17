import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { Message, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TournoiComponent } from './pages/tournoi/tournoi.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TournoiCreateComponent } from './pages/tournoi-create/tournoi-create.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { JoueurCreateComponent } from './pages/joueur-create/joueur-create.component';
import { LoginComponent } from './pages/login/login.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

// class MyTestClass {
//   add(m :Message) {
//     console.log(42)
//   }
// }

@NgModule({
  declarations: [
    AppComponent,
    TournoiComponent,
    TournoiCreateComponent,
    FormErrorComponent,
    JoueurCreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, // nécessaire pour injecter HttpClient
    FormsModule, // nécessaire pour le binding 2 way [(ngModel)]
    ReactiveFormsModule, // nécessaire pour les formGroupes [FormGroup]
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ToastModule,
    MessageModule,
    TableModule,
    DropdownModule,
  ],
  providers: [
    MessageService, // { provide: MessageService, useClass: MessageService }
    // { provide: MessageService, useClass: MyTestClass }
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

