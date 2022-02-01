import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PublicRoutingModule } from './public-routing.module';

import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailConfirmTokenResolver } from '../_services';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [
        PublicComponent,
        LoginComponent,
        RegisterComponent,
        ConfirmEmailComponent,
        NotFoundComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PublicRoutingModule,

        // Third party libraries
        NgbCollapseModule,
        FontAwesomeModule,
    ],
    providers: [
      EmailConfirmTokenResolver
    ],

})
export class PublicModule { }
