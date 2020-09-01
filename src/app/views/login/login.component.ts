import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser, IUserResponse } from '../../interfaces/user'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin?: IUser;
  constructor(private _userSrv: UserService, private _snackBar: MatSnackBar, private _router: Router) {
    this.userLogin = { username: '', password: '' }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  login() {
    if (!this.userLogin?.username && !this.userLogin?.password) {
      this.openSnackBar('form invalid', 'OK')
    } else {
      this._userSrv.getUserLogin(this.userLogin.username, this.userLogin.password).subscribe((data: IUserResponse) => {
        if (data) {
          localStorage.setItem('tokenAuth', JSON.stringify(data))
          this._router.navigate(['home'])
        } else {
          this.openSnackBar('login failed', 'OK')
        }
      })
    }
  }

  getHttp(){
    this._userSrv.httpGet().subscribe(data => console.log(data))
  }
  getRxAjax(){
    this._userSrv.httpRxJsAjax().subscribe(data => console.log(data))
  }

  ngOnInit(): void {
  }

}
