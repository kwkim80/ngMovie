import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { Router } from '@angular/router';
import { IMovie } from '../movie';
import { NgForm } from '@angular/forms';
import { Iitem } from '../item';

@Component({
  selector: 'app-tvs',
  templateUrl: './tvs.component.html',
  styleUrls: ['./tvs.component.css']
})
export class TvsComponent implements OnInit {

  public tvs:Iitem[];
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
      // this.queryService.getarch('tv',this.keyword?this.keyword:"Avengers", this.pageNum).subscribe(data=>{this.data=data;
      //    this.tvs=this.data.results;
      //   this.totalPage=this.data.total_pages},
      //    error=>this.errorMsg=error);
      this.queryService.getData('tv/popular',this.pageNum).subscribe(data=>{this.data=data;
        this.tvs=this.data.results;
        
       this.totalPage=this.data.total_pages;
       this.numbers = Array((this.totalPage-(this.pageSet*10)>=10)?10:this.totalPage-(this.pageSet*10)).fill(0).map((x,i)=>i);},
        error=>this.errorMsg=error);
    
  }

  onSubmit(form:NgForm){
    this.keyword=form.value.keyword
    console.log(this.keyword);

    this.queryService.getSearch('tv',form.value.keyword,"1").subscribe(data=>{this.data=data;
      this.tvs=this.data.results;
      this.totalPage=this.data.total_pages;
      this.pageSet=0;
      this.pageNum=1;
      this.numbers = Array((this.totalPage-(this.pageSet*10)>=10)?10:this.totalPage-(this.pageSet*10)).fill(0).map((x,i)=>(this.pageSet*10)+i);},
      error=>this.errorMsg=error);
  }

  onPage(page){
    console.log(this.keyword+":"+page);
    // this.queryService.getSearch('tv',this.keyword?this.keyword:"Avengers",page).subscribe(data=>{this.data=data;
    //   this.tvs=this.data.results;},
    //   error=>this.errorMsg=error);
    this.queryService.getData('tv/popular',page).subscribe(data=>{this.data=data;
      this.tvs=this.data.results;
      this.totalPage=this.data.total_pages;
      this.pageSet=Math.floor((page-1)/10);
      this.pageNum=page;
      this.numbers = Array((this.totalPage-(this.pageSet*10)>=10)?10:this.totalPage-(this.pageSet*10)).fill(0).map((x,i)=>(this.pageSet*10)+i);},
      error=>this.errorMsg=error);
  }

  onPageSearch(keyword,page){
    console.log("search:"+this.keyword+":"+page);
    this.keyword=keyword;
    this.queryService.getSearch('tv',keyword,page).subscribe(data=>{this.data=data;
    this.tvs=this.data.results;
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
