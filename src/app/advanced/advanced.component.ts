import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.css']
})
export class AdvancedComponent implements OnInit {
 cardlist: any[] = []
 limit!: number
 page :number = 0
 totalPagesforMonsterGet!: number
  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    this.cardlist = this.dataService.monsterList
    this.monsterSetter(100,1)
    this.dataService.monsterHasChanged.subscribe((array: any[]) => {
      this.cardlist = array
    })
  }

  fetchCards(limit: number, page: number, keywords?:string, set?: string) {
    let keywordPayload: string= ''
    let setPayload: string=''
    if(keywords) {

     keywordPayload = '&keywords=' + keywords //needs work for multiple inputs
    }
    if(set) {
      setPayload = '&set=' + set
    }
    //loops the call "monster" number of times to get all cards pushed into cardlist
    for (let page = this.page; page < this.totalPagesforMonsterGet; page++) {
      this.http.get(`https://api.fabdb.net/cards?per_page=100&page=${page}${keywordPayload}${setPayload}`)
    .subscribe((response: any)=> {
      response.data.forEach((card:any) => {
        console.log('HEJ FRÅN CARDS');
        this.cardlist.push(card)

      })
      // console.log(this.cardlist);
    })

    }

    this.dataService.setMonster(this.cardlist)

  }

  //Standard api-call to set last page to know how many times fetchcards should run to get all cards from api
  monsterSetter(limit: number, page: number) {
    this.http.get(`https://api.fabdb.net/cards?per_page=100&page=${page}`).subscribe((response: any) => {
      // console.log(response.meta.last_page);
    this.totalPagesforMonsterGet = response.meta.last_page
    console.log(this.totalPagesforMonsterGet);
    })
  }

  onMonsterCalls() {
    this.fetchCards(100, 1)
  }
}
