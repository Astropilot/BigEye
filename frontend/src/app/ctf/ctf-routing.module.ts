import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { ChallengeCategoriesComponent } from './challenge-categories/challenge-categories.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { CTFComponent } from './ctf.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const ctfRoutes: Routes = [
  { path: '', component: CTFComponent,
    children: [
        { path: 'leaderboard', component: LeaderboardComponent },
        { path: 'categories', component: ChallengeCategoriesComponent },
        { path: 'categories/:id/challenges', component: ChallengeListComponent },
        { path: 'challenges/:id', component: ChallengeComponent },
        { path: 'user/:username', component: UserProfileComponent },
        { path: 'admin', component: AdministrationComponent },
        { path: '', redirectTo: 'categories' }
    ]
  }
];

@NgModule({
    imports: [ RouterModule.forChild(ctfRoutes) ],
    exports: [ RouterModule ]
})
export class CTFRoutingModule { }
