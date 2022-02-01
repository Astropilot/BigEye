import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { first, Observable } from 'rxjs';
import { Challenge, UserLeaderboard } from 'src/app/_models';
import { UserService } from 'src/app/_services';


@Component({
    templateUrl: './leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {
  public leaderboard$!: Observable<UserLeaderboard[]>;
  public lastResolvedChallenges!: Challenge[];
  public chartOption!: EChartsOption;

  constructor(
    private userService: UserService
  ) {
    this.leaderboard$ = this.userService.getLeaderboard();
  }

  ngOnInit(): void {
      this.leaderboard$.pipe(first()).subscribe((leaderboard) => {

        const series: any[] = [];
        const lastResolvedChallenges: Challenge[] = [];

        for (const user of leaderboard) {
          const data: any[] = [];
          let pointsCounter = 0;

          let challenges_resolved = user.challenges_resolved.sort((a, b) => {
            const aDate = new Date(a.resolved_at);
            const bDate = new Date(b.resolved_at);

            if (aDate > bDate) return 1;
            if (aDate < bDate) return -1;
            return 0;
          });

          lastResolvedChallenges.push(challenges_resolved[challenges_resolved.length - 1].challenge);

          for (const resolvedChallenge of challenges_resolved) {
            pointsCounter += resolvedChallenge.points;

            data.push([resolvedChallenge.resolved_at, pointsCounter]);
          }

          series.push({
            data: data,
            type: 'line',
            name: user.username
          });
        }

        this.lastResolvedChallenges = lastResolvedChallenges;

        this.chartOption = {
          legend: {
            orient: 'horizontal',
            bottom: 0,
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            type: 'time',
          },
          yAxis: {
            type: 'value',
          },
          series: series,
        }
      });
  }
}
