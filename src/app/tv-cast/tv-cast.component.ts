import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { MoviesService } from '../movies.service';
import { IMovieSub } from '../movieSub';
import { IMovie } from '../movie';
import { QueryService } from '../query.service';
import { Iitem } from '../item';

@Component({
  selector: 'app-tv-cast',
  templateUrl: './tv-cast.component.html',
  styleUrls: ['./tv-cast.component.css']
})
export class TvCastComponent implements OnInit {

  public tvId;
  public errorMsg;
  public castes:Iitem[];
  public crews:Iitem[];
  public tv:Iitem;

  constructor(private route:ActivatedRoute , private queryService:QueryService, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.tvId=parseInt(param.get('id'));
      this.queryService.getItemWithSub({ itemName: "tv", idx: this.tvId, subItem: ["credits"] }).subscribe(data=>{
          this.tv=data,
          this.castes=this.tv.credits.cast, 
          this.crews=this.tv.credits.crew},
        error=>this.errorMsg=error);
    
  })}

  onSelectByActor(person){
    //console.log(person.name.split(" ").join("-"));
    this.router.navigate(['/actors',person.id+"-"+(person.name.split(" ").join("-"))]);
  }

}
