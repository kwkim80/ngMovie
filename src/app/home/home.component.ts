import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from '../home.service';
import { IMovie } from '../movie';
import { QueryService } from '../query.service';
import { Iitem } from '../item';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { NGXLogger } from 'ngx-logger';
// import { Title } from '@angular/platform-browser';



// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  public posts;
  public pageNum=1;
  public data;
  public tvs:Iitem[];
  public movies:Iitem[];
  public errorMsg;
  public tops:Iitem[];

  // constructor(private http:HttpClient, private logger: NGXLogger) { }
  constructor(private http:HttpClient, private queyService:QueryService) { }

    ngOnInit(): void {
      
      this.queyService.getData('movie/popular',this.pageNum).subscribe(data=>{this.movies=data.results,
      console.log(this.movies)},
        error=>this.errorMsg=error);
        this.queyService.getData('tv/popular',this.pageNum).subscribe(data=>{this.tvs=data.results,
          console.log(this.tvs)},
          error=>this.errorMsg=error);
          this.queyService.getData('movie/top_rated',this.pageNum).subscribe(data=>{this.tops=data.results,
            console.log(this.tops)},
            error=>this.errorMsg=error);
     
      
    }

        onPage(pageNum){
          this.pageNum=pageNum;
        this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(posts=>{
          this.posts=posts;
          //console.log(this.posts);});
      })}


 
}   
