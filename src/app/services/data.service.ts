import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  //Get cards
  getCards(limit: number, page: number, keywords?:string) {
    let payload: string= ''
    if(keywords) {

     payload = keywords
    }
    return this.http.get(`https://api.fabdb.net/cards?per_page=${limit}&page=${page}&keywords=${payload}`)
  }

  getDetails(identifier: string) {
    return this.http.get(`https://api.fabdb.net/cards/${identifier}`)
  }

  cardsHasChanged() {

  }
}
