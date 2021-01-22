import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from "../services/envService.service";
 
@Injectable()
export class ChatService {
 
  constructor(private http: HttpClient, private env: EnvService) {
  }

  getSignalRUrl() {
    return this.env.apiUrl + 'notify'
  }

  create (formData : any) {
    return this.http.post<any>(this.env.apiUrl + 'api/Chat/Add' , formData).pipe();
  }

  deleteChat (id : number) {
    return this.http.delete<any>(this.env.apiUrl + 'api/Chat/Delete?id=' + id).pipe();
  }

  getAllChat(senderUserId: number, recipientUserId: number): Promise<any> {
    return this.http.get(this.env.apiUrl + 'api/Chat/GetAll?senderUserId=' + senderUserId + '&recipientUserId=' + recipientUserId).toPromise();
  }
}
