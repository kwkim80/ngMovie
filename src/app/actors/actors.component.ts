import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Router,ActivatedRoute, ParamMap} from '@angular/router';
import {NgForm} from '@angular/forms';
import { QueryService } from '../query.service';
import { Iitem } from '../item';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})

export class ActorsComponent implements OnInit {

  public actors:Iitem[];
  private data;
  public errorMsg;
  private actorIdName;
  public keyword;

  // private baseURL='https://api.themoviedb.org/3/';
  // private APIKEY="381e09ba86a78d210720788b471eeb8e"
  // //private _url: string="/assets/data/employees.json";
  // public keyword="tom";
  // private url = "".concat(this.baseURL, 'search/person?api_key=',this.APIKEY,'&language=en-US&query=',this.keyword); 
  constructor(private queryService:QueryService, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    // this.http.get(this.url).subscribe(data=>{
    //   this.data=data;
    //   console.log(this.data);
    //   this.actors=this.data.results;

    // });
    
    this.queryService.getSearch("person",this.keyword?this.keyword:"a","1").subscribe(data=>{this.data=data,
      this.actors=this.data.results},
      error=>this.errorMsg=error);
    // this.actorService.getActors().subscribe(data=>this.actors=data);

    
  }

  onSelect(actor){
    //console.log(actor);
   // this.router.navigate([,actor.id]);
   this.actorIdName=actor.id+"-"+(actor.name.split(" ").join("-"));
   this.router.navigate(['/actors',this.actorIdName]);
  }

  onSelectByMovie(movie){
    
    this.router.navigate(['/movies',movie.id ])
  }



  onSubmit(form:NgForm){
    this.keyword=form.value.keyword
    //console.log(this.keyword);

    this.queryService.getSearch('person',form.value.keyword,"1").subscribe(data=>{this.data=data;
      this.actors=this.data.results;},
      error=>this.errorMsg=error);
  }

  onPage(page){
    //console.log(this.keyword+":"+page);
    this.queryService.getSearch('person',this.keyword?this.keyword:"a", page).subscribe(data=>{this.data=data;
      this.actors=this.data.results;},
      error=>this.errorMsg=error);
  }

}


