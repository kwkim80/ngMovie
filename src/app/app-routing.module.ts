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
import { TvsComponent } from './tvs/tvs.component';
import { TvDetailComponent } from './tv-detail/tv-detail.component';
import { TvCastComponent } from './tv-cast/tv-cast.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { PolicyComponent } from './policy/policy.component';

const routes: Routes = [
  {path:"", redirectTo:'/home', pathMatch:'full'},
  {path:"home", component:HomeComponent},
  {path:"movies", component:MoviesComponent},
  {path:"movies/:id", component:MovieDetailComponent,
    children:[
      {path:'recommend', component:MovieRecommendComponent}
    ]
  },
  {path:"movies/:id/cast", component:MovieCastComponent},
  {path:"actors", component:ActorsComponent},
  {path:"actors/:id", component:ActorDetailComponent},
  {path:"tv", component:TvsComponent},
  {path:"tv/:id", component:TvDetailComponent},
  {path:"tv/:id/cast", component:TvCastComponent},
  {path:"search/:id", component:SearchResultComponent},
  {path:"policy", component:PolicyComponent},
  {path:"**", component:PageNotComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
  HomeComponent,
  MoviesComponent,
  ActorsComponent,
  ActorDetailComponent,
  MovieDetailComponent,
  MovieCastComponent,
  MovieRecommendComponent,
  TvsComponent,
  TvDetailComponent,
  TvCastComponent,
  SearchResultComponent,
  PolicyComponent,
  PageNotComponent
]
