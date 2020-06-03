import { ICast } from './cast';
import { IMovieSub } from './movieSub';
import { Iitem } from './item';


export interface IWrapper{
    page:number,
    results:[],
    total_pages:number,
    total_results:number
    id:number,
    cast:[],
    backdrops:[],
    posters:[],
    keywords:[],
    crew:[]
}
       
