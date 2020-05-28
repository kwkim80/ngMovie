import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {IWrapper} from './wrapper'
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/Operators';
import { IMovie } from './movie';




@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseURL='https://api.themoviedb.org/3/';
  private APIKEY="381e09ba86a78d210720788b471eeb8e"
  //private _url: string="/assets/data/employees.json";
  
  private url = "";
  private data;
  public results:IMovie[];
  public movie:IMovie;


  constructor(private http:HttpClient) { }

  getMovies(keyword, pageNum):Observable<IWrapper>{

    //  this.http.get(this.url).subscribe(data=>{
    //   this.data=data;
     
    //   this.results=this.data.results;
    //   console.log(this.data);
    // });
    this.url = "".concat(this.baseURL, 'search/movie?api_key=',this.APIKEY,'&language=en-US&query=',keyword,'&page=',pageNum); 
      return this.http.get<IWrapper>(this.url).pipe(
        retry(1), catchError(error=>{
          return throwError(error.message||"Server Error");
        }));
      
  }

  getMovie(idx):Observable<IMovie>{
    this.url="".concat(this.baseURL, 'movie/',idx,'?api_key=',this.APIKEY,'&language=en-US'); 
     return this.http.get<IMovie>(this.url).pipe(
      retry(1), catchError(error=>{
        return throwError(error.message||"Server Error");
      }));
  }

  getCast(idx):Observable<IWrapper>{

    this.url="".concat(this.baseURL, 'movie/',idx,'/credits?api_key=',this.APIKEY,'&language=en-US'); 

  
    return this.http.get<IWrapper>(this.url).pipe(
      retry(1), catchError(error=>{
          return throwError(error.message||"Server Error")
      }));
  }

  getMedia(idx):Observable<IWrapper>{

    this.url="".concat(this.baseURL, 'movie/',idx,'/images?api_key=',this.APIKEY,'&language=en-US'); 
    
    // this.http.get(this.url).subscribe(data=>{
    //   this.data=data;
    //   console.log(this.data);
    // });
    return this.http.get<IWrapper>(this.url).pipe(
      retry(1),
      catchError(error=>{return throwError(error.message||"Server Error getMedia")})
    );
  }

  // getRecommend(idx):Observable<IWrapper>{
  //   this.url="".concat(this.baseURL, 'movie/',idx,'/recommendations?api_key=',this.APIKEY,'&language=en-US'); 
  //   return this.http.get<IWrapper>(this.url).pipe(retry(1),
  //   catchError(error=>{return throwError(error.message||"Server Error getRecommend")}));
  // }

  getMovieSub(idx, sub):Observable<IWrapper>{
    this.url="".concat(this.baseURL, 'movie/',idx,'/',sub,'?api_key=',this.APIKEY,'&language=en-US'); 

    // this.http.get(this.url).subscribe(data=>{
    //   this.data=data;
    //   console.log(this.data.results);
    // });

    return this.http.get<IWrapper>(this.url).pipe(retry(1),
    catchError(error=>{return throwError(error.message||"Server Error getMovieSub()")}));
  }
}
