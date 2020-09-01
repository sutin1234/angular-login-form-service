import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class RouterGuardService implements CanActivate {

  constructor(private _userSrv: UserService, private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('tokenAuth');
    if (!token || !token == undefined) {
      this._router.navigate(['login']);
      return false;
    }
    return true
  }
}
