import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { EmailConfirmTokenResolver } from '../_services';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

const publicRoutes: Routes = [
    { path: '', component: PublicComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'confirm/:token', component: ConfirmEmailComponent, resolve: {info: EmailConfirmTokenResolver}},
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent },
            { path: '', redirectTo: '' },
            { path: '**', component: NotFoundComponent }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(publicRoutes) ],
    exports: [ RouterModule ]
})
export class PublicRoutingModule { }
