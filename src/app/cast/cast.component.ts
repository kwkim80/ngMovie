import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Iitem } from '../item';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {

  @Input() itemId: number;
  @Input() castes: Iitem[];

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSelectByActor(actor){
    //console.log(actor);
    this.router.navigate(['/actors',actor.id+"-"+(actor.name.split(" ").join("-"))]);
    //this.router.navigate([actor.id+"-"+(actor.name.replace(" ","-"))], {relativeTo:this.route});
  }



  showCast(){
    this.router.navigate(['cast'],{relativeTo:this.route});
  }

}
