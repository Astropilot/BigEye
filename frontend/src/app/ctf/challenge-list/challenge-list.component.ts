import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Challenge } from 'src/app/_models';
import { ChallengeService } from 'src/app/_services';


@Component({
    templateUrl: './challenge-list.component.html'
})
export class ChallengeListComponent implements OnInit {
  public challenges$!: Observable<Challenge[]>;

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    this.challenges$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.challengeService.getChallenges(params.get('id')!))
    );
  }
}
