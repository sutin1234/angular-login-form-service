import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserResponse } from '../interfaces/user';

import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserLogin(username: string, password: string) {
    return this.http.post<IUserResponse>('http://localhost:3000/users/login', { username, password })
  }
  getLogout() {
    localStorage.setItem('tokenAuth', '')
  }
  getUserData(): any {
    return  localStorage.getItem('tokenAuth')
  }

  httpGet(){
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
  httpRxJsAjax(){
    const users = ajax({
      url: 'https://httpbin.org/delay/2',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'rxjs-custom-header': 'Rxjs'
      },
      body: {
        rxjs: 'Hello World!'
      }
    }).pipe(
      map((response: any) => console.log('response: ', response)),
      catchError((error: any) => {
        console.log('error: ', error);
        return of(error);
      })
    );
    return users;
  }

}
