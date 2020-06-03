import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { MoviesService } from '../movies.service';
import { IMovieSub } from '../movieSub';
import { IMovie } from '../movie';
import { QueryService } from '../query.service';
import { Iitem } from '../item';

@Component({
  selector: 'app-movie-cast',
  templateUrl: './movie-cast.component.html',
  styleUrls: ['./movie-cast.component.css']
})
export class MovieCastComponent implements OnInit {

  public movieId;
  public errorMsg;
  public castes:Iitem[];
  public crews:Iitem[];
  public movie:Iitem;

  constructor(private route:ActivatedRoute , private queryService:QueryService, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.movieId=parseInt(param.get('id'));
      this.queryService.getItemSub("movie",this.movieId,"credits").subscribe(data=>{this.castes=data.cast, this.crews=data.crew},
        error=>this.errorMsg=error);
      // this.movieService.getCast(this.movieId).subscribe(data=>{this.castes=data.cast, this.crews=data.crew},
      //   error=>this.errorMsg=error);
      this.queryService.getItem('movie',this.movieId).subscribe(data=>this.movie=data,
          error=>this.errorMsg=error);
  })}

  onSelectByActor(person){
    //console.log(person.name.split(" ").join("-"));
    this.router.navigate(['/actors',person.id+"-"+(person.name.split(" ").join("-"))]);
  }

}
