import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MoviesService} from '../movies.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IMovieSub } from '../movieSub';
import { QueryService } from '../query.service';
import { Iitem } from '../item';



@Component({
  selector: 'app-movie-recommend',
  templateUrl: './movie-recommend.component.html',
  styleUrls: ['./movie-recommend.component.css']
})
export class MovieRecommendComponent implements OnInit {
  
public movieId;
public errorMsg;
public recommend2:IMovieSub[];


@Input() mId: number;
@Input() recommend: Iitem[];
    @Input() stock: number;
    @Input() productId: number;
    @Output() stockValueChange = new EventEmitter();



    updatedstockvalue: number;

    stockValueChanged() {

        this.stockValueChange.emit({ id: this.productId, updatdstockvalue: this.updatedstockvalue });
        this.updatedstockvalue = null;

    }


  constructor(private queryService:QueryService,private route:ActivatedRoute ) {

    // console.warn( "Parent component initialized." );
    // console.log(this.route.params['id']);
    // console.log(this.route.firstChild.snapshot.params['id']);
  
   
   }

  ngOnInit(): void {
    
    
  }

}
