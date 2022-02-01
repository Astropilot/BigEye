import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../_models';
import { AuthenticationService } from '../_services';


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.isAdmin().pipe(take(1));
    }

    isAdmin(): Observable<boolean> {
        return this.authenticationService.currentUser.pipe(map((user: User | null) => {
            if (!user) {
                return false;
            }

            return user.role === 'ADMIN';
        }));
    }
}
