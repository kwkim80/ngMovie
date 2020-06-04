
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {IWrapper} from './wrapper'
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/Operators';
import { IMovie } from './movie';
import { Iitem } from './item';
import { IMovieSub } from './movieSub';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private baseURL='https://api.themoviedb.org/3/';
  private APIKEY="381e09ba86a78d210720788b471eeb8e"
  //private _url: string="/assets/data/employees.json";
  
  private url = "";
  private data;
  public results:Iitem[];
  public movie:Iitem;


  constructor(private http:HttpClient) { }

  getInfo(subUrl){
    this.url = "".concat(this.baseURL, subUrl,'?api_key=',this.APIKEY,'&language=en-US'); 
    return this.http.get<IWrapper>(this.url).pipe(
      retry(1), catchError(error=>{
        return throwError(error.message||"Server Error");
      }));
  }

  getData(subUrl,pageNum){
    this.url = "".concat(this.baseURL, subUrl,'?api_key=',this.APIKEY,'&language=en-US&page=',pageNum); 
    return this.http.get<IWrapper>(this.url).pipe(
      retry(1), catchError(error=>{
        return throwError(error.message||"Server Error");
      }));
  }

  
  getSearch(subCate, keyword, pageNum):Observable<IWrapper>{
    this.url = "".concat(this.baseURL, 'search/', subCate ,'?api_key=',this.APIKEY,'&language=en-US&query=',keyword,'&page=',pageNum); 
    return this.http.get<IWrapper>(this.url).pipe(
      retry(1), catchError(error=>{
        return throwError(error.message||"Server Error");
      }));
  }


  getItem(subUrl,idx):Observable<Iitem>{
    this.url="".concat(this.baseURL, subUrl,"/",idx,'?api_key=',this.APIKEY,'&language=en-US'); 
    return this.http.get<Iitem>(this.url).pipe(
     retry(1), catchError(error=>{
       return throwError(error.message||"Server Error");
     }));
  }

  getItemSub(subUrl,idx,subCate):Observable<IWrapper>{
    this.url="".concat(this.baseURL, subUrl,'/',idx,'/',subCate,'?api_key=',this.APIKEY,'&language=en-US'); 

    return this.http.get<IWrapper>(this.url).pipe(
      retry(1), catchError(error=>{
          return throwError(error.message||"Server Error")
      }));
  }

  getItemSubSort(subUrl,idx,subCate,sortFunc):Observable<IWrapper>{
    this.url="".concat(this.baseURL, subUrl,'/',idx,'/',subCate,'?api_key=',this.APIKEY,'&language=en-US'); 
    this.data= this.http.get<IWrapper>(this.url).pipe(
      map(event=>event.cast.sort(sortFunc))
      , catchError(error=>{
        return throwError(error.message||"Server Error") })
    );

    return this.data;
  }

  //getMovies(keyword, pageNum):Observable<IWrapper>{ return this.getSearch('movie', keyword, pageNum);}
  //getMovie(idx):Observable<Iitem>{return this.getItem('movie',idx);}
  //getCast(idx):Observable<IWrapper>{ return this.getItemSub("movie",idx,"credits");}
  //getMedia(idx):Observable<IWrapper>{return this.getItemSub("movie",idx,"images");}
  //getRecommend(idx):Observable<IWrapper>{return this.getItemSub("movie",idx,"recommendations");}
  //getMovieSub(idx, sub):Observable<IWrapper>{return this.getItemSub("movie",idx,sub)}
  //getActors(keyword, pageNum):Observable<IWrapper>{return this.getSearch('person',keyword,pageNum);}
  //getActor(idx):Observable<Iitem>{return this.getItem('peroson',idx);}
  //getActorSub(idx, sub):Observable<IWrapper>{return this.getItemSub('person',idx,sub);}
  //getActorbyName(name):Observable<IWrapper>{ return this.getSearch('person',name,"1");}

  // getActorCredit(idx, sub):Observable<IMovieSub>{
  //   this.url="".concat(this.baseURL, 'person/',idx,'/',sub,'?api_key=',this.APIKEY,'&language=en-US'); 
  //   this.data= this.http.get<IWrapper>(this.url).pipe(
  //     map(events => events.cast.sort((a:Iitem, b:Iitem) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()))
  //     , catchError(error=>{
  //       return throwError(error.message||"Server Error") })
  //   );
  //   return this.data;
    
    // let  sortById = function(data) {
    //   data.sort((a,b) => data.id - data.id);
    // };
    // return this.http.get<IWrapper>(this.url).pipe(
    //   map(tap(sortById))
    // );
    // return this.http.get<IWrapper>(this.url).pipe(
    //   map(events => events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    // );
   
   
  // }

}
