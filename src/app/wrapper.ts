import { ICast } from './cast';
import { IMovieSub } from './movieSub';


export interface IWrapper{
    page:number,
    results:[],
    total_pages:number,
    total_results:number
    id:number,
    cast:IMovieSub[],
    backdrops:[],
    posters:[],
    keywords:[],
    crew:IMovieSub[]
}
       
