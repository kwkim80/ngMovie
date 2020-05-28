import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public posts;
  public pageNum=1;
  

  constructor(private http:HttpClient) { }

    ngOnInit(): void {
      this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(posts=>{
        this.posts=posts;
      }) }

        onPage(pageNum){
          this.pageNum=pageNum;
        this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(posts=>{
          this.posts=posts;
          //console.log(this.posts);});
      })}


 
}   
