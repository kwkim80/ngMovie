import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../movies.service';
import {IWrapper} from '../wrapper';
import {IMovie} from '../movie';
import {Router} from '@angular/router';
import { error } from 'protractor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public movies:IMovie[];
  private data;
  public errorMsg;
  public keyword;
  public pageNum="1";
  public totalPage=1;
 

  constructor(private movieService:MoviesService, private router:Router) { }

  ngOnInit(): void {

    this.movieService.getMovies(this.keyword?this.keyword:"Avengers",this.pageNum).subscribe(data=>{this.data=data;
     this.movies=this.data.results;
    this.totalPage=this.data.total_pages},
     error=>this.errorMsg=error);

    
  }

  onSubmit(form:NgForm){
    this.keyword=form.value.keyword
    console.log(this.keyword);

    this.movieService.getMovies(form.value.keyword,"1").subscribe(data=>{this.data=data;
      this.movies=this.data.results;},
      error=>this.errorMsg=error);
  }

  onPage(page){
    console.log(this.keyword+":"+page);
    this.movieService.getMovies(this.keyword?this.keyword:"Avengers",page).subscribe(data=>{this.data=data;
      this.movies=this.data.results;},
      error=>this.errorMsg=error);
  }

  onSelect(actor){
    //console.log(actor);
   // this.router.navigate([,actor.id]);
   this.router.navigate(['/movies',actor.id]);
  }

}
