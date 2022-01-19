
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { PaginatePipe } from 'ngx-pagination';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  @ViewChild('form') keywordSearch!: NgForm
  cardlist: any[] = []
  page = 1;
  totalCards!: number;

  //keywords - experiment med search framgent
  keywords: any = ''  //kan tas i multiplar
  activeSub!: Subscription
  constructor(private dataService: DataService) {


   }

  ngOnInit(): void {
    this.getCards();
  }


//   onSubmit(keywordForm : NgForm) {
//     this.activeSub.unsubscribe()
//     this.keywords = keywordForm.value
//     this.activeSub = this.dataService.getCards(this.keywords).subscribe((response: any ) => {
//       this.cardlist = response.data
//       console.log(response.data)
//   })
// }
getCards() {
  this.dataService.getCards(9, this.page, this.keywords).subscribe((response: any ) => {
    this.cardlist = response.data
    this.totalCards = (response.meta.last_page * 9) //api-variabel

  })
}

onSubmit(keyword: NgForm) {
  console.log(keyword)
  this.page = 1
  this.keywords = keyword.value.keyword
  this.getCards()
  this.keywordSearch.reset()
}

}
