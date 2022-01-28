
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit, OnDestroy {



  cardlist!: any[] //Kort-class?
  page!: number
  totalCards!: number;

  //keywords - experiment med search framgent

  cardSub!: Subscription
  totalSub!: Subscription
  pageSub!: Subscription
  constructor(private dataService: DataService) {


   }

  ngOnInit(): void {
    //fetch cards to store
    this.dataService.getCards()
    this.cardSub = this.dataService.cardsChanged.subscribe(
      (cards: any[]) => {
        this.cardlist = cards
      }
      )
    this.totalSub =  this.dataService.totalCardsChanged.subscribe(
        (totalCards: number) => {
          this.totalCards = totalCards
        }
      )
    this.pageSub =  this.dataService.pageHasChanged.subscribe(
      (page: number) => {
        this.page = page
        console.log(page);
      }
    )
  }
  ngOnDestroy(): void {
      this.cardSub.unsubscribe()
      this.totalSub.unsubscribe()
      this.pageSub.unsubscribe()
  }

//pagination set in dataservice to "remember" page after going back from details page
cardPagination(event: number) {

  this.dataService.setPage(event)
  this.dataService.getCards()
  }

}
