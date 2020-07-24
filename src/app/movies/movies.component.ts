import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../movies.service';
import {IWrapper} from '../wrapper';
import {IMovie} from '../movie';
import {Router} from '@angular/router';
import { error } from 'protractor';
import { NgForm } from '@angular/forms';
import { QueryService } from '../query.service';
import { Iitem } from '../item';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public movies:Iitem[];
  private data;
  public errorMsg;
  public keyword;
  public pageNum=1;
  public totalPage=1;
  public numbers:number[];
  public pageSet=0;

  constructor(private router:Router, private queryService:QueryService) { }

  ngOnInit(): void {

    // this.movieService.getMovies(this.keyword?this.keyword:"Avengers",this.pageNum).subscribe(data=>{this.data=data;
    //  this.movies=this.data.results;
    // this.totalPage=this.data.total_pages},
    //  error=>this.errorMsg=error);
 
      // this.queryService.getSearch('movie',this.keyword?this.keyword:"Avengers", this.pageNum).subscribe(data=>{this.data=data;
      //    this.movies=this.data.results;
      //    this.totalPage=this.data.total_pages;
      //    console.log(this.totalPage);
      //    this.numbers = Array((this.totalPage-(this.pageSet*10)>=10)?10:this.totalPage-(this.pageSet*10)).fill(0).map((x,i)=>(this.pageSet*10)+i);},
      //    error=>this.errorMsg=error);
      this.queryService.getData('movie/popular', this.pageNum).subscribe(data=>{this.data=data;
        this.movies=this.data.results;
        this.totalPage=this.data.total_pages;
        this.numbers = Array((this.totalPage-(this.pageSet*10)>=10)?10:this.totalPage-(this.pageSet*10)).fill(0).map((x,i)=>(this.pageSet*10)+i);},
        error=>this.errorMsg=error);
    
  }

  onSubmit(form:NgForm){
    
    console.log(this.keyword);

    this.queryService.getSearch('movie',form.value.keyword,"1").subscribe(data=>{this.data=data;
      this.movies=this.data.results;
      this.totalPage=this.data.total_pages;
      this.pageSet=0;
      this.pageNum=1;
      this.numbers = Array((this.totalPage-(this.pageSet*10)>=10)?10:this.totalPage-(this.pageSet*10)).fill(0).map((x,i)=>(this.pageSet*10)+i);},
      error=>this.errorMsg=error);
  }

  onPage(page){
    console.log(this.keyword+":"+page);
    this.queryService.getData('movie/popular',page).subscribe(data=>{this.data=data;
      this.movies=this.data.results;
      this.totalPage=this.data.total_pages;
      this.pageSet=Math.floor((page-1)/10);
      this.pageNum=page;
      this.numbers = Array((this.totalPage-(this.pageSet*10)>=10)?10:this.totalPage-(this.pageSet*10)).fill(0).map((x,i)=>(this.pageSet*10)+i);},
      error=>this.errorMsg=error);
  }

  onSelect(actor){
    //console.log(actor);
   // this.router.navigate([,actor.id]);
   this.router.navigate(['/movies',actor.id]);
  }

}
