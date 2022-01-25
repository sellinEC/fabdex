import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {
  @ViewChild('form') keywordSearch!: NgForm
  keywords: any = ''  //kan tas i multiplar med lite arbete i dataservice
  set: any = ''
  page!: number;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }



  onSubmit(keyword: NgForm) {
  this.router.navigate(['/cardlist'])
  console.log(keyword.value.keyword + ' keyword')
  this.dataService.setPage(this.page)
  this.keywords = keyword.value.keyword
  this.dataService.setKeywords(keyword.value.keyword)
  this.dataService.getCards()
  // this.keywordSearch.reset()
}

onNavFilter(set:string) {
  //set för navigation
  this.set = set
  //set för funktion i store
  this.dataService.setSet(set)
  // console.log(this.dataService.set);
  this.dataService.getCards()
  console.log('first ' + this.dataService.set);
  this.dataService.cardsChanged

}

onClear() {
  this.keywordSearch.reset()
  this.keywords = ''
  this.dataService.setKeywords('')
  this.dataService.getCards()
}
}
