import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  cardsChanged = new Subject<any[]>()
  totalCardsChanged = new Subject<number>()
  pageHasChanged = new Subject<number>()
  setHasChanged = new Subject<string>()
  cardlist :any[] = []

  //Search/filter variabler
  set: string = ''
  keywords = ''
  //pagination variabler
  limit: number = 9
  page!: number
  totalCards!: number


  //Get cards
  getCards() {
    this.fetchCards(this.limit, this.page, this.keywords, this.set)

  }

  getDetails(identifier: string) {
    return this.http.get(`https://api.fabdb.net/cards/${identifier}`)
  }

  //Value setters
  setSet(set: string) {
    this.set = set
  }

  setKeywords(keyword: string) {
    this.keywords = keyword
  }

  setPage(page: number) {
    this.page = page

  }



  clearValues() {
  this.set = ''
  this.keywords = ''

  this.limit = 9
  this.page =1
  this.setHasChanged.next(this.set)
  }


  //Next level


  fetchCards(limit: number, page: number, keywords?:string, set?: string) {
    let keywordPayload: string= ''
    let setPayload: string=''
    if(keywords) {

     keywordPayload = '&keywords=' + keywords
    }
    if(set) {
      setPayload = '&set=' + set
    }
    this.http.get(`https://api.fabdb.net/cards?per_page=${limit}&page=${page}${keywordPayload}${setPayload}`)
    .subscribe((response: any)=> {
      this.cardlist = response.data
      this.cardsChanged.next(this.cardlist)
      this.totalCards = response.meta.last_page
      // console.log('från fetchCards ' + response.meta.last_page);
      this.totalCardsChanged.next(this.totalCards)
      this.pageHasChanged.next(page)
    })
     //fördta map är rxjs för observable, andra är vanlig arraymethod. CHeckar om ingredients finns eller inte och lägger tom array där det inte finns för att undvika bugg i senare steg

  }


  cardsHasChanged() {

  }
}
