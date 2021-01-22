import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../model/user.model";
import { UserService } from "../services/user.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html' 
})
export class UserComponent {
  public user: User = new User();
  private hubConnection: signalR.HubConnection;

  public constructor(private userService: UserService, private router: Router) {
  }

  public addUser() {
    if(this.user.email == null || this.user.email == '' 
      || this.user.firstName == null || this.user.firstName == ''  
      || this.user.lastName == null || this.user.lastName == '') {
      alert('Please select input field');
      return;
    }

    this.userService.create(this.user).subscribe(a=> {
      this.user = new User();
      localStorage.setItem('currentUser', a.id);
      localStorage.setItem('currentUserName', a.firstName + ' ' + a.lastName);
      this.router.navigate(['chat']);
    }, err => {
      alert(JSON.stringify(err))
    })
  }

  public login() {
    this.userService.login(this.user.loginEmail).subscribe(a=> {
      localStorage.setItem('currentUser', a.id);
      localStorage.setItem('currentUserName', a.firstName + ' ' + a.lastName);
      this.router.navigate(['chat']);
    }, err => {
      alert('This email not exist!');
    })
  }
}
