import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { UserService } from ".";
import { User } from "../_models";

@Injectable()
export class EmailConfirmTokenResolver implements Resolve<any> {
  constructor(private router: Router, private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.checkToken(route.params['token']);
    }

    checkToken(token: string): Observable<User | null> {
      return this.userService.confirmUserEmail(token).pipe(catchError(err => of(null)));
    }
}
