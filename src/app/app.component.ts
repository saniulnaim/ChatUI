import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../model/user.model";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatUI';
  public user: User = new User();

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
      console.log('User has created')
    }, err => {
      alert(JSON.stringify(err))
    })
  }

  public login() {
    this.userService.login(this.user.email).subscribe(a=> {
       this.router.navigate(['chat']);
    }, err => {
      alert('This email not exist!');
    })
  }


}
