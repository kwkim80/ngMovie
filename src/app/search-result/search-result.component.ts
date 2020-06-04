import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Iitem } from '../item';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {


  public tvs:Iitem[];
  public movies:Iitem[];
  public people:Iitem[];
  private data;
  public errorMsg;
  public keyword;
  tvResultCnt;
  movieResultCnt;
  peopleResultCnt;
  pageM=1;
  pageT=1;
  pageP=1;
  tvTotalPage=1;
  movieTotalPage=1;
  peopleTotalPage=1;
 

  constructor(private router:Router, private route:ActivatedRoute,private queryService:QueryService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.keyword=param.get('id');
      console.log(this.keyword);
    this.queryService.getSearch('tv',this.keyword,1).subscribe(data=>{this.data=data;
        this.tvResultCnt=this.data.total_results;
        this.tvTotalPage=this.data.total_pages;
        this.tvs=this.data.results;},
        error=>this.errorMsg=error);
    this.queryService.getSearch('movie',this.keyword,1).subscribe(data=>{this.data=data;
      this.movieResultCnt=this.data.total_results;
      this.movieTotalPage=this.data.total_pages;
          this.movies=this.data.results;},
          error=>this.errorMsg=error);
    this.queryService.getSearch('person',this.keyword,1).subscribe(data=>{this.data=data;
      this.peopleResultCnt=this.data.total_results;
      this.peopleTotalPage=this.data.total_pages;
            this.people=this.data.results;},
            error=>this.errorMsg=error);
      });
    
  }


  

  onPageM(pageM){
    if(pageM>=1 && pageM <=this.movieTotalPage){
      this.pageM=pageM;
      this.queryService.getSearch('movie',this.keyword,pageM).subscribe(data=>{this.data=data;
       this.movieResultCnt=this.data.total_results;
       this.movies=this.data.results;},
       error=>this.errorMsg=error);
    }
  
  }

  onPageT(pageT){
    if(pageT>=1 && pageT <=this.tvTotalPage){
      this.pageT=pageT;
      this.queryService.getSearch('tv',this.keyword,pageT).subscribe(data=>{this.data=data;
        this.tvResultCnt=this.data.total_results;
        this.tvs=this.data.results;},
        error=>this.errorMsg=error);
    }
   
  }

  onPageP(pageP){
    if(pageP>=1 && pageP <=this.peopleTotalPage){
      this.pageP=pageP;
      this.queryService.getSearch('person',this.keyword,pageP).subscribe(data=>{this.data=data;
        this.peopleResultCnt=this.data.total_results;
              this.people=this.data.results;},
              error=>this.errorMsg=error);
    }
   
   
  }

}
