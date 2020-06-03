import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IActor } from './actor';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, filter} from 'rxjs/operators';
import { IWrapper } from './wrapper';
import { map } from 'rxjs/operators';
import { ICast } from './cast';
import { IMovieSub } from './movieSub';
import { Iitem } from './item';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  private actors:Observable<IWrapper>;
  private baseURL='https://api.themoviedb.org/3/';
  private APIKEY="381e09ba86a78d210720788b471eeb8e"
  //private _url: string="/assets/data/employees.json";
  public keyword="tom";
  private url = "";
  private data;
  public results:IActor[];
  public actor:IActor;
  
  constructor(private http: HttpClient) {
    //this.loadFromServer();
   }
  

  getActors(keyword, pageNum):Observable<IWrapper>{
      
    this.url = "".concat(this.baseURL, 'search/person?api_key=',this.APIKEY,'&language=en-US&query=',keyword,'&page=',pageNum); 
    
    this.http.get(this.url).subscribe(data=>{
      this.data=data;
      console.log(this.data);
     
    });
    return  this.http.get<IWrapper>(this.url).pipe(
      retry(1), catchError(error => {
        return throwError(error.message || "Server Error");
      }));;
  }

  // private loadFromServer() {
  //   this.url = "".concat(this.baseURL, 'search/person?api_key=',this.APIKEY,'&language=en-US&query=',this.keyword); 
  //   this.actors = this.http.get<IWrapper>(this.url).pipe(
  //     retry(1), catchError(error => {
  //       return throwError(error.message || "Server Error");
  //     }));;
  // }

  getActor(idx):Observable<IActor>{
    this.url = "".concat(this.baseURL, 'person/',idx,'?api_key=',this.APIKEY,'&language=en-US'); 
  
    //  this.http.get(this.url).subscribe(data=>{
    //   this.data=data;
    //   console.log(this.data);
     
    // });

    return this.http.get<IActor>(this.url).pipe(
      retry(1), catchError(error => {
        return throwError(error.message || "Server Error");
      }));
  }

  getActorSub(idx, sub):Observable<IWrapper>{
    this.url="".concat(this.baseURL, 'person/',idx,'/',sub,'?api_key=',this.APIKEY,'&language=en-US'); 

 
    return this.http.get<IWrapper>(this.url).pipe(retry(1),
    catchError(error=>{return throwError(error.message||"Server Error getActorSub()")}));
  }

  getActorCredit(idx, sub):Observable<IMovieSub>{
    this.url="".concat(this.baseURL, 'person/',idx,'/',sub,'?api_key=',this.APIKEY,'&language=en-US'); 

    this.data= this.http.get<IWrapper>(this.url).pipe(
      map(events => events.cast.sort((a:Iitem, b:Iitem) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()))
    );
    return this.data;
    
    // let  sortById = function(data) {
    //   data.sort((a,b) => data.id - data.id);
    // };
    // return this.http.get<IWrapper>(this.url).pipe(
    //   map(tap(sortById))
    // );
    // return this.http.get<IWrapper>(this.url).pipe(
    //   map(events => events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    // );
    return null;
   
  }

  getActorbyName(name):Observable<IWrapper>{
    this.url = "".concat(this.baseURL, 'search/person?api_key=',this.APIKEY,'&language=en-US&query=',name); 
   
  // this.http.get(this.url).subscribe(data=>{
  //     this.data=data;
  //     this.results=this.data.results;
  //     console.log(this.url)
  //     this.actor=this.results.find(i=>i.name==name );
  //     console.log(this.results);
     
  //   });

     return this.http.get<IWrapper>(this.url).pipe(
       retry(1), catchError(error => {
         return throwError(error.message || "Server Error");
       }));

     
   }

  
 
}
