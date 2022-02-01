import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxEchartsModule } from 'ngx-echarts';

import { CTFRoutingModule } from './ctf-routing.module';

import { CTFComponent } from './ctf.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { ChallengeCategoriesComponent } from './challenge-categories/challenge-categories.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { AdministrationComponent } from './administration/administration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    declarations: [
      CTFComponent,
      LeaderboardComponent,
      ChallengeCategoriesComponent,
      ChallengeComponent,
      ChallengeListComponent,
      AdministrationComponent,
      UserProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CTFRoutingModule,

        // Third party libraries
        NgbModule,
        FontAwesomeModule,
        NgxEchartsModule,
    ],
    providers: [
    ],

})
export class CTFModule { }
