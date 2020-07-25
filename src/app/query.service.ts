
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {IWrapper} from './wrapper'
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/Operators';
import { Iitem } from './item';



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


   //1 getTreding
  // getInfo(itemName):Observable<IWrapper>{
  //   this.url = "".concat(this.baseURL, itemName,'?api_key=',this.APIKEY,'&language=en-US'); 
  //   return this.http.get<IWrapper>(this.url).pipe(
  //     retry(1), catchError(error=>{
  //       return throwError(error.message||"Server Error");
  //     }));
  // }
// 3(tv/popular, movie/popular, movie/top_rated, trending/all/day) +page
  getData(itemName,pageNum):Observable<IWrapper>{
    this.url = "".concat(this.baseURL, itemName,'?api_key=',this.APIKEY,'&language=en-US&page=',pageNum); 
    return this.http.get<IWrapper>(this.url).pipe(
      retry(1), catchError(error=>{
        return throwError(error.message||"Server Error");
      }));
  }

  // 3(tv,movie,person)+page
  getSearch(itemName, keyword, pageNum):Observable<IWrapper>{
    this.url = "".concat(this.baseURL, 'search/', itemName ,'?api_key=',this.APIKEY,'&language=en-US&query=',keyword,'&page=',pageNum); 
    return this.http.get<IWrapper>(this.url).pipe(
      retry(1), catchError(error=>{
        return throwError(error.message||"Server Error");
      }));
  }

  getItemWithSub({ itemName, idx, subItem}):Observable<Iitem>{
    this.url="".concat(this.baseURL, itemName,"/",idx,'?api_key=',this.APIKEY,'&language=en-US','&append_to_response=',subItem.join(',')); 
    console.log(this.url);
    return this.http.get<Iitem>(this.url).pipe(
     retry(1), catchError(error=>{
       return throwError(error.message||"Server Error");
     }));
  }


  

}
