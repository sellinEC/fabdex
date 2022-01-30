import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


/**Centralized dataservice provied app
 * @example
 * gets data hej
 */
@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }
  //*emitters*
  cardsChanged = new Subject<any[]>()
  /**total cards
   * @example
   * totalCardsChanged.subscribe(
        (totalCards: number) => {
          this.totalCards = totalCards
        }
      )
   */
  totalCardsChanged = new Subject<number>()
  pageHasChanged = new Subject<number>()
  setHasChanged = new Subject<string>()
  monsterHasChanged = new Subject<any[]>()
  cardlist :any[] = []
  monsterList: any[] = []

  //Search/filter variabler
  set: string = ''
  keywords = ''
  //pagination variabler
  limit: number = 9
  page!: number
  //Pages för pagination
  // totalPages!: number


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


  //Next level - set up in service to be reachable throughout app when using different components


  fetchCards(limit: number, page: number, keywords?:string, set?: string) {
    let keywordPayload: string= ''
    let setPayload: string=''
    if(keywords) {

     keywordPayload = '&keywords=' + keywords //needs work for multiple inputs
    }
    if(set) {
      setPayload = '&set=' + set
    }
    this.http.get(`https://api.fabdb.net/cards?per_page=${limit}&page=${page}${keywordPayload}${setPayload}`)
    .subscribe((response: any)=> {
      this.cardlist = response.data
      this.cardsChanged.next(this.cardlist)
      //Sends total cards for pagination
      this.totalCardsChanged.next(response.meta.total)
      this.pageHasChanged.next(page)
    })


  }

  setMonster(monster: any[]) {
    this.monsterList = monster
    this.monsterHasChanged.next(monster)
  }

}
