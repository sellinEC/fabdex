import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() eventSender = new EventEmitter<string>()
  // @Output() newItemEvent = new EventEmitter<string>();
  constructor( private router: Router, private dataService: DataService) { }

  ngOnInit(): void {

  }

  // onNavFilter(set:string) {
  //   this.dataService.setSet(set)
  //   console.log(this.dataService.set);

  // }

  onReturn() {
   this.dataService.clearValues()
   this.router.navigate(['/cardlist'])
   this.dataService.getCards()
  }

}
