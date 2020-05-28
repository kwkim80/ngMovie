import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { ActorsComponent } from './actors/actors.component';
import { HomeComponent } from './home/home.component';
import { PageNotComponent } from './page-not/page-not.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieCastComponent } from './movie-cast/movie-cast.component';
import { MovieRecommendComponent } from './movie-recommend/movie-recommend.component';

const routes: Routes = [
  {path:"", redirectTo:'/movies', pathMatch:'full'},
  {path:"home", component:HomeComponent},
  {path:"movies", component:MoviesComponent},
  {path:"movies/:id", component:MovieDetailComponent,
    children:[
      {path:'cast', component:MovieCastComponent},
      {path:'recommend', component:MovieRecommendComponent}
    ]
  },
  {path:"actors", component:ActorsComponent},
  {path:"actors/:id", component:ActorDetailComponent},
  {path:"**", component:PageNotComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[HomeComponent,
  MoviesComponent,
  ActorsComponent,
  ActorDetailComponent,
  MovieDetailComponent,
  MovieCastComponent,
  MovieRecommendComponent,
  PageNotComponent
]
