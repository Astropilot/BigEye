import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ChallengeCategory } from 'src/app/_models';


import { ChallengeService } from '../../_services';

@Component({
    templateUrl: './challenge-categories.component.html',
    styleUrls: ['./challenge-categories.component.scss']
})
export class ChallengeCategoriesComponent {
  public challengeCategories$: Observable<ChallengeCategory[]>;

  constructor(
    private challengeService: ChallengeService
  ) {
    this.challengeCategories$ = this.challengeService.getChallengeCategories();
  }
}
