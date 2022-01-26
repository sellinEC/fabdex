import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {
  @ViewChild('form') keywordSearch!: NgForm
  keywords: any = ''  //needs work in dataservice to buld correct string for multiple keywords
  set: string = ''
  page!: number;
  setTitle: string = ''

  checkSet!: Subscription
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    //Updates set-status from dataservice
    this. checkSet = this.dataService.setHasChanged.subscribe(
      (set: string) => {
        this.setSetTitle(set)
        this.onNavFilter(set)
      }
    )
  }



  onSubmit(keyword: NgForm) {
  this.router.navigate(['/cardlist'])
  this.dataService.setPage(this.page)
  this.keywords = keyword.value.keyword
  this.dataService.setKeywords(keyword.value.keyword)
  this.dataService.getCards()

}

onNavFilter(set:string) {
  //set för navigation
  this.set = set
  //set för funktion i store
  this.dataService.setSet(set)
  // console.log(this.dataService.set);
  //Sätter titel vid valt set
  this.setSetTitle(set)
  this.dataService.getCards()
  this.dataService.cardsChanged

}

//Sätter titel vid valt set
setSetTitle(string:any) {
switch (string) {
  case '':
    this.setTitle = ''
      break;
    case 'WTR':
      this.setTitle = 'Welcome to Rathe'
        break;
        case 'ARC':
  this.setTitle = 'Arcane Rising'
    break;
    case 'CRU':
  this.setTitle = 'Crucible of War'
    break;
    case 'MON':
      this.setTitle = 'Monarch'
        break;
        case 'ELE':
          this.setTitle = 'Tales of Aria'
            break;
  default: this.setTitle = ''
    break;
}
}

onClear() {
  //Sets cleared values in dataservice
  this.keywordSearch.reset()
  this.keywords = ''
  this.dataService.setKeywords('')
  this.dataService.getCards()
}
}
