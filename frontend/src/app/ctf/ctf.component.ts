import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { User } from '../_models';
import { AuthenticationService, UserService } from '../_services';
import { AdministrationComponent } from './administration/administration.component';
import { ChallengeComponent } from './challenge/challenge.component';


declare var particlesJS: any;

@Component({
    templateUrl: './ctf.component.html',
    styleUrls: ['./ctf.component.scss']
})
export class CTFComponent implements OnInit {
  public isMenuCollapsed = true;
  public currentUser$!: Observable<User | null>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.updateUserObservable();
  }

  updateUserObservable = () => {
    const localUser = this.authenticationService.currentUserValue;
    if (localUser === null) {
      this.currentUser$ = of(null);
      return;
    }

    this.currentUser$ = this.userService.getUser(localUser.id);
  }

  setUpdateUser(componentRef: any) {
    if ((componentRef instanceof ChallengeComponent) || (componentRef instanceof AdministrationComponent)) {
      (componentRef).updateParentUser = this.updateUserObservable;
    }
  }

  ngOnInit() {
    particlesJS.load('particles-js', '../assets/particlesjs.json', null);
  }

  logOff() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
