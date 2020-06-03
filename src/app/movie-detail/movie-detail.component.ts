import { Component, OnInit } from '@angular/core';
import {Router, ParamMap, ActivatedRoute} from '@angular/router';
import * as $ from 'jquery' 
import { QueryService } from '../query.service';
import { Iitem } from '../item';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  public movieId;
  public movie:Iitem;
  public errorMsg;
  public castes:Iitem[];
  public data;
  public backdrops:Iitem[];
  public posters:Iitem[];
  public recommend:Iitem[];
  public keywords:Iitem[];
  public videos:Iitem[];
  public trailer:Iitem;

  constructor(private router:Router, private route:ActivatedRoute,  private queryService:QueryService ) { }

  ngOnInit(): void {
    // $(".popup").click(function () {
      //     var $this = $(this);
      //     var $iframe = $("<iframe>").attr("src", $this.data("link")).css({"width": 400, "height": 300});
      //     var $title = $("<h1>").text($this.data("title"));
      //     $("#video-view").html($title).append($iframe);
      //     $iframe.wrap("<div class='class-video'>");
 

    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.movieId=parseInt(param.get('id'));
   // console.log(this.movieId);
      this.queryService.getItem('movie',this.movieId).subscribe(data=>this.movie=data,
        error=>this.errorMsg=error);

        //casting people
      this.queryService.getItemSub('movie',this.movieId,'credits').subscribe(data=>{this.castes=data.cast},
        error=>this.errorMsg=error);
      this.queryService.getItemSub('movie',this.movieId,"videos").subscribe(data=>{this.videos=data.results;
        this.videos.map(r=>r.poster_path="https://i.ytimg.com/vi/"+r.key+"/hqdefault.jpg");
        this.trailer=this.videos.find(r=>r.type=="Trailer");});
      this.queryService.getItemSub('movie',this.movieId,'images').subscribe(data=>{this.backdrops=data.backdrops,this.posters=data.posters},
        error=>this.errorMsg=error);
      this.queryService.getItemSub('movie',this.movieId,"recommendations").subscribe(data=>{this.recommend=data.results;},
        error=>this.errorMsg=error);
        this.queryService.getItemSub('movie',this.movieId,"keywords").subscribe(data=>this.keywords=data.keywords,
          error=>this.errorMsg=error);
    });

    
  }

  onSelectByActor(actor){
    //console.log(actor);
    this.router.navigate(['/actors',actor.id+"-"+(actor.name.split(" ").join("-"))]);
    //this.router.navigate([actor.id+"-"+(actor.name.replace(" ","-"))], {relativeTo:this.route});
  }

  onSelectByRecom(recom){
    this.router.navigate([recom.id], {relativeTo:this.route});
  }

  showCast(){
    this.router.navigate(['cast'],{relativeTo:this.route});
  }

  showRecommend(){
    this.router.navigate(['recommend'],{relativeTo:this.route});
  }


  onPopupTrailer(event){

      this.trailer=this.videos.find(r=>r.type=="Trailer");
      var videoLink="https://www.youtube.com/embed/"+this.trailer.key;
  
      console.log(videoLink);

      var target = event.target || event.srcElement || event.currentTarget;
       //console.log(target);
       var $this = $(target);
      //  var $iframe = $("<iframe>").attr("src", $this.data("link")).css({"width": 500, "height": 300});
     
      //console.log(widthPx);
      var $iframe = $("<iframe>").attr("src", videoLink).attr("id","modalFrame").css({"width": "100%", "height": 300});
      var $title = $("<h1>").text($this.data("title"));
       $("#video-view").html($title).append($iframe);
       $iframe.wrap("<div class='class-video'>");

  }

  onPopupVideo(video){
    //this.trailer=this.videos.find(r=>r.type=="Trailer");
      var videoLink="https://www.youtube.com/embed/"+video.key;
  
      console.log(videoLink);

      var target = event.target || event.srcElement || event.currentTarget;
       //console.log(target);
       var $this = $(target);
      //  var $iframe = $("<iframe>").attr("src", $this.data("link")).css({"width": 500, "height": 300});
     
      //console.log(widthPx);
      var $iframe = $("<iframe>").attr("src", videoLink).attr("id","modalFrame").css({"width": "100%", "height": 300});
      $("#popupTrailerModalLabel").text(video.type);
      var $title = $("<h1>").text($this.data("title"));
       $("#video-view").html($title).append($iframe);
       $iframe.wrap("<div class='class-video'>");
  }
  closeModal(event){
 
     var iframe=$("#modalFrame");
     iframe.attr("src","");

  }

}
