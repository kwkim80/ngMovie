import { IWrapper } from './wrapper';

export interface Iitem{
    "cast_id":number,
    "character": string,
    "credit_id": string,
    "gender": number,
    "id": number,
    "name": string,
    "order": number,
    "profile_path": string,
    "aspect_ratio":number,
    "file_path":string,
    "height":number,
    "iso_639_1":string,
    "vote_average":number,
    "vote_count":number,
    "width":number,
    "title":string,
    "department":string,
    "job":string,
   "known_for_department":string,
   "release_date":string,
   "type":string,
   "key":string,
    "backdrop_path": string,
      "popularity": number,
     "video": boolean,
      "original_language": string,
      "original_title": string,
      "genre_ids": [],
      "adult": boolean,
      "overview": string,
      "poster_path": string,
      "genres":[],
      "budget":number,
      "revenue": number,
      "runtime": number,
      "tagline":string,
      "homepage":string,
      "status": string,
      "first_air_date":string,
      "media_type":string,
      "episode_run_time":string,
      "networks":[],
      "logo_path":string,
      "credits":IWrapper,
      "images":IWrapper,
      "videos":IWrapper,
      "recommendations":IWrapper,
      "keywords":IWrapper,
      "results":[],
      birthday:string,
      deathday:string,
      known_for:[],
      biography:string,
      place_of_birth:string,
      imdb_id:string,
      also_known_as:[]
}