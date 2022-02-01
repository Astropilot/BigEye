import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { first, Observable, switchMap } from 'rxjs';
import { Challenge } from 'src/app/_models';
import { ChallengeService } from 'src/app/_services';


@Component({
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent {
  public challenge$!: Observable<Challenge>;
  public flag = new FormControl('');
  public wrongFlag = false;
  public successFlag = false;
  public updateParentUser!: Function;

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    this.challenge$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.challengeService.getChallenge(params.get('id')!))
    );
  }

  submitFlag() {
    const challengeId = this.route.snapshot.paramMap.get('id')!;
    const flag = this.flag.value;

    this.wrongFlag = false;
    this.successFlag = false;

    this.challengeService.resolveChallenge(challengeId, flag).pipe(first()).subscribe({
      next: (challengeResolve) => {
        this.successFlag = true;
        if (this.updateParentUser) {
          this.updateParentUser();
        }
      },
      error: (error) => {
        this.wrongFlag = true;
      }
    })
  }
}
