import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userData: any;
  constructor(private _userSrv: UserService, private _router: Router) { 
    this.userData =  {}
  }

  ngOnInit(): void {
    this.userData = JSON.parse(this._userSrv.getUserData())
  }
  
  logout(){
    this._userSrv.getLogout()
    this._router.navigate(['login'])
  }

}
