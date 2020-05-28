import { Component, OnInit } from '@angular/core';

import {MoviesService} from '../movies.service';
import { IMovie } from '../movie';
import {Router, ParamMap, ActivatedRoute} from '@angular/router';
import { ICast } from '../cast';
import { IMedia } from '../media';
import { error } from '@angular/compiler/src/util';
import { IRecommend } from '../recommend';
import { IMovieSub } from '../movieSub';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  public movieId;
  public movie:IMovie;
  public errorMsg;
  public castes:IMovieSub[];
  public data;
  public backdrops:IMovieSub[];
  public posters:IMovieSub[];
  public recommend:IMovieSub[];
  public keywords:IMovieSub[];

  constructor(private router:Router, private route:ActivatedRoute, private movieService:MoviesService, ) { }

  ngOnInit(): void {


    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.movieId=parseInt(param.get('id'));
    console.log(this.movieId);
      this.movieService.getMovie(this.movieId).subscribe(data=>this.movie=data,
        error=>this.errorMsg=error);
      this.movieService.getCast(this.movieId).subscribe(data=>{this.castes=data.cast},
        error=>this.errorMsg=error);
      this.movieService.getMedia(this.movieId).subscribe(data=>{this.backdrops=data.backdrops,this.posters=data.posters},
        error=>this.errorMsg=error);
      this.movieService.getMovieSub(this.movieId,"recommendations").subscribe(data=>{this.recommend=data.results;},
        error=>this.errorMsg=error);
        this.movieService.getMovieSub(this.movieId,"keywords").subscribe(data=>this.keywords=data.keywords,
          error=>this.errorMsg=error);
    });

    
  }

  onSelectByActor(actor){
    //console.log(actor);

    this.router.navigate([actor.id+"-"+(actor.name.replace(" ","-"))], {relativeTo:this.route});
  }

  onSelectByRecom(recom){
    this.router.navigate([recom.id], {relativeTo:this.route});
  }

  showCast(){
    this.router.navigate(['cast'],{relativeTo:this.route});
  }

  showRecommend(){
    this.router.navigate(['recommend'],{relativeTo:this.route});
  }




}
