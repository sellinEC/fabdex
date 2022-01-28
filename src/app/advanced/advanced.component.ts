import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.css']
})
export class AdvancedComponent implements OnInit {
 cardlist: any[] = []
 limit!: number
 page!:number
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

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
    this.http.get(`https://api.fabdb.net/cards?per_page=100&page=${page}${keywordPayload}${setPayload}`)
    .subscribe((response: any)=> {
      response.data.forEach((card:any) => {
        this.cardlist.push(card)
      })

    })


  }

  monsterSetter(limit: number, page: number) {

  }

}
