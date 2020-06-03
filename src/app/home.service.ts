import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IWrapper} from './wrapper'
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/Operators';
import {IMovie} from './movie';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseURL='https://api.themoviedb.org/3/';
  private APIKEY="381e09ba86a78d210720788b471eeb8e"
  //private _url: string="/assets/data/employees.json";
  
  private url = "";
  private data;
  public results:IMovie[];
  public movie:IMovie;

  constructor(private http:HttpClient) { }

  getData(category,pageNum){
    this.url = "".concat(this.baseURL, category,'?api_key=',this.APIKEY,'&language=en-US&page=',pageNum); 
    return this.http.get<IWrapper>(this.url).pipe(
      retry(1), catchError(error=>{
        return throwError(error.message||"Server Error");
      }));
  }
}
