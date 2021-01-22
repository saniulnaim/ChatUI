import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EnvService } from 'src/services/envService.service';
import { UserService } from 'src/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from "./chat.component";
import { RouterModule } from '@angular/router';
import { UserComponent } from "./user.component";
import { ChatService } from "../services/chat.service";

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([  
      {path:'chat',component:ChatComponent},
      {path: '',component:UserComponent},  
    ])  
  ],
  providers: [
    EnvService,
    UserService,
    HttpClientModule,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
