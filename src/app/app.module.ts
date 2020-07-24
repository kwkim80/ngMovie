import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';


import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ActorsService} from './actors.service';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CastComponent } from './cast/cast.component';





@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
    
  ],
  providers: [ActorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
