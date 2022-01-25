
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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



  cardlist!: any[]
  page = 1;
  totalCards!: number;

  //keywords - experiment med search framgent

  activeSub!: Subscription
  constructor(private dataService: DataService) {


   }

  ngOnInit(): void {
    //fetch cards to store
    this.dataService.getCards()
    // this.getCards();
    this.activeSub = this.dataService.cardsChanged.subscribe(
      (cards: any[]) => {
        this.cardlist = cards
        // this.totalCards = this.dataService.totalCards
      }
      )
      this.dataService.totalCardsChanged.subscribe(
        (total: number) => {
          this.totalCards = total * 9 //(*9 ger rätt total cards till pagination)
        }
      )
  }


//   onSubmit(keywordForm : NgForm) {
//     this.activeSub.unsubscribe()
//     this.keywords = keywordForm.value
//     this.activeSub = this.dataService.getCards(this.keywords).subscribe((response: any ) => {
//       this.cardlist = response.data
//       console.log(response.data)
//   })
// }


cardPagination() {

  this.dataService.setPage(this.page)
  this.dataService.getCards()
  }

}
