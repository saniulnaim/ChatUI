import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from "../services/envService.service";
import { User } from 'src/model/user.model';
 
@Injectable()
export class UserService {
 
  constructor(private http: HttpClient, private env: EnvService) {
  }

  getSignalRUrl() {
    return this.env.apiUrl + 'notify'
  }

  create (formData : any) {
    return this.http.post<any>(this.env.apiUrl + 'api/User/Add' , formData).pipe();
  }

  login(email: string) {
    return this.http.post<any>(this.env.apiUrl + 'api/User/Login?email=' + email , null).pipe();
  }

  logout(id: number) {
    return this.http.post<any>(this.env.apiUrl + 'api/User/Logout?id=' + id , null).pipe();
  }

  getAllUser(): Promise<any> {
    return this.http.get(this.env.apiUrl + 'api/User/GetAll').toPromise();
  }
}
