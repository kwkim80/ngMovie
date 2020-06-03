import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router'

import { IMovieSub } from '../movieSub';
import { map } from 'rxjs/operators';
import { QueryService } from '../query.service';
import { Iitem } from '../item';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {
  public actorId;
  public actor:Iitem;
  private data;
  private actors:Iitem[];
  public errorMsg;
  public knownFor:Iitem[];
  public actorName;
  public searchedActor:Iitem;
  public hasData=false;
  public castes:Iitem[];
  public crews:Iitem[];

  constructor(private router:Router, private route:ActivatedRoute, private queryService:QueryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      let id=parseInt(params.get('id'));
      let name=params.get('id').split('-')[1];
      this.actorId=id;
      this.actorName=name;
      //console.log(this.actorId+"-"+this.actorName);

      this.queryService.getItem('person',this.actorId).subscribe(data=>{this.actor=data;this.actorName=this.actor.name;},
        error=>this.errorMsg=error);
  
    
      // this.actorService.getActorbyName(this.actorName).subscribe(data=>{this.actors=data.results;
      //   this.searchedActor=this.actors.find(r=>r.id===this.actorId);
      //   this.knownFor=this.searchedActor.known_for;},
      //   error=>this.errorMsg=error);

      // this.actorService.getActorSub(this.actorId,"combined_credits").subscribe(data=>{
      //     this.data=data;this.castes=this.data.cast  ;this.crews=this.data.crew;
      //     console.log(this.data);
      // }, error=>this.errorMsg=error)


      this.queryService.getItemSub('person',this.actorId,"combined_credits").subscribe(data=>{
        this.data=data;
        this.castes=this.data.cast.sort((a:Iitem, b:Iitem) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        this.crews=this.data.crew.sort((a:Iitem, b:Iitem) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        // this.knownFor=this.data.cast.sort((a:IMovieSub, b:IMovieSub) =>
        // b <.r a.popularity ? -1 : 1);
        console.log(this.castes);
    }, error=>this.errorMsg=error)

     

    });

    
  }

}
