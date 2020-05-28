import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { ActorsComponent } from './actors/actors.component';
import { HomeComponent } from './home/home.component';
import { PageNotComponent } from './page-not/page-not.component';

import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ActorsService} from './actors.service';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieCastComponent } from './movie-cast/movie-cast.component';
import { MovieRecommendComponent } from './movie-recommend/movie-recommend.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MovieCastComponent,
    MovieRecommendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ActorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
