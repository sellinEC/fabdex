import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  set: string = ''

  //Get cards
  getCards(limit: number, page: number, keywords?:string, set?: string) {
    let keywordPayload: string= ''
    let setPayload: string=''
    if(keywords) {

     keywordPayload = '&keywords=' + keywords
    }
    if(set) {
      setPayload = '&set=' + set
    }
    console.log(`https://api.fabdb.net/cards?per_page=${limit}&page=${page}&keywords=${keywordPayload}`);
    return this.http.get(`https://api.fabdb.net/cards?per_page=${limit}&page=${page}${keywordPayload}${setPayload}`)
  }

  getDetails(identifier: string) {
    return this.http.get(`https://api.fabdb.net/cards/${identifier}`)
  }

  setSet(set: string) {
    this.set = set
  }

  cardsHasChanged() {

  }
}
