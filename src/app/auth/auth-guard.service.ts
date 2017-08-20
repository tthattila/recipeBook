import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'app/auth/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authentication: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.authentication.isAuthenticated();
    }

}
