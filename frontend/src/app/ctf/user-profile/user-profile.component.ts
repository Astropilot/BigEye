import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EChartsOption } from 'echarts';
import { first, Observable, switchMap } from 'rxjs';
import { User } from 'src/app/_models';
import { UserService } from 'src/app/_services';


@Component({
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  public user$!: Observable<User>;
  public solvePercentChartOption!: EChartsOption;
  public categoryBreakdownChartOption!: EChartsOption;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userService.getUserByUsername(params.get('username')!))
    );

    this.user$.pipe(first()).subscribe((user) => {
      const categoryBreakdownDict: Map<string, number> = new Map();
      const data: any[] = [];

      for (const resolvedChallenge of user.challenges_resolved) {
        if (categoryBreakdownDict.has(resolvedChallenge.challenge.category.name)) {
          categoryBreakdownDict.set(resolvedChallenge.challenge.category.name, categoryBreakdownDict.get(resolvedChallenge.challenge.category.name)! + 1);
        } else {
          categoryBreakdownDict.set(resolvedChallenge.challenge.category.name, 1);
        }
      }

      for (const [category, count] of categoryBreakdownDict.entries()) {
        data.push({value: count, name: category});
      }

      this.categoryBreakdownChartOption = {
        title: {
          text: 'Category Breakdown',
          textStyle: {
            color: '#fff'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          bottom: 0,
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
      }
    });
  }
}
