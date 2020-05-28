import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../movies.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IMovieSub } from '../movieSub';


@Component({
  selector: 'app-movie-recommend',
  templateUrl: './movie-recommend.component.html',
  styleUrls: ['./movie-recommend.component.css']
})
export class MovieRecommendComponent implements OnInit {
public movieId;
public errorMsg;
public recommend2:IMovieSub[];

public childID = "";
public id = "";
public isLoading = true;
public timer = null;


  constructor(private movieService:MoviesService,private route:ActivatedRoute ) {

    // console.warn( "Parent component initialized." );
    // console.log(this.route.params['id']);
    // console.log(this.route.firstChild.snapshot.params['id']);
  
   
   }

  ngOnInit(): void {
  //   console.log(this.route.firstChild.snapshot.params['id']);
  //  this.route.queryParams.subscribe(params => {
  //     this.movieId = params['id'];
  //     console.log(this.movieId);
  //     this.movieId= this.route.snapshot.paramMap.get('id');
  //     console.log(this.movieId);
  //   });
    // this.route.params.subscribe((param:ParamMap)=>{
    //   this.movieId=parseInt(param.get('id'));
    //   console.log(this.movieId+":"+param['id'])
    //   // this.movieService.getMovieSub(this.movieId,"recommendations").subscribe(data=>{this.recommend2=data.results; console.log(this.movieId+"f")},
    //   // error=>this.errorMsg=error);
     
    // });
    
  }

}
