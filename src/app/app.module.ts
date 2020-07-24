import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';


import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ActorsService} from './actors.service';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CastComponent } from './cast/cast.component';
import { TvCastComponent } from './tv-cast/tv-cast.component';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CastComponent,
    TvCastComponent
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
