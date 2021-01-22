import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user.model';
import { UserService } from "../services/user.service";
import * as signalR from '@aspnet/signalr';
import { Chat } from "../model/chat.model";
import { ChatService } from "../services/chat.service";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html' 
})
export class ChatComponent implements OnInit {
    public userList: Array<User>;
    public chatList: Array<Chat>;
    private hubConnection: signalR.HubConnection;
    public chat: Chat = new Chat();
    public showChatHistory = false;
    public recipientUserId: number;
    public senderUserId: number;
    public senderUserName: string;

    public constructor(private userService: UserService, private router: Router, private chatService: ChatService) {
        this.senderUserId = Number(localStorage.getItem('currentUser'));
        this.senderUserName = localStorage.getItem('currentUserName');
        this.getAllUser();
        this.getAllChat();
    }

    ngOnInit(): void {
        var options = {
          transport: signalR.HttpTransportType.ServerSentEvents,
          logging: signalR.LogLevel.Trace  
        };
    
        this.hubConnection = new signalR.HubConnectionBuilder()  
        .configureLogging(signalR.LogLevel.Information)  
        .withUrl(this.userService.getSignalRUrl(),options)  
        .build();  
    
        this.hubConnection.serverTimeoutInMilliseconds = 9999999999999;
        this.hubConnection.start().then(function () {  
          console.log('SignalR Connected!');  
        }).catch(function (err) {  
          return console.error(err.toString());  
        });  
       
        this.hubConnection.on("BroadcastMessage", (operationType:string) => {  
          if(operationType == 'broadcastNewChat'){
            this.rerender();
          }
        }); 
    }

    rerender(): void {
        this.getAllChat();
    }

    public getAllUser() {
        this.userService.getAllUser().then(a=> {
            this.userList = a
        })
    }

    public getAllChat() {
        this.chatList = [];
        if(this.recipientUserId != undefined) {
            this.chatService.getAllChat(this.senderUserId, this.recipientUserId).then(a=> {
                this.chatList = a;
            })
        }
    }

    public SendChat() {
        this.chat.RecipientUserId = this.recipientUserId;
        this.chat.SenderUserId = this.senderUserId;
        this.chatService.create(this.chat).subscribe(a=> {
            this.chat.content = '';
        }, err => {
            alert(err);
        })
    }

    public updateRecipientUserId(recipientUserId: number) {
        this.recipientUserId = recipientUserId;
        this.showChatHistory = true;
        this.getAllChat();
    }

    public isSenderMessage(id: number): boolean {
        if(id == this.senderUserId)
            return true;
        return false;
    }

    public deleteChat(id: number) {
        if(confirm("Are you sure to delete "+name)) {
            this.chatService.deleteChat(id).subscribe(a=> {
                this.getAllChat();
            })
        }
    }

    public logout() {
        this.userService.logout(this.senderUserId).subscribe(a=> {
          this.router.navigate(['']);
        }, err => {
          alert('Logout not possible!');
        })
      }
 
}