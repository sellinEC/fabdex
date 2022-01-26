import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router, private dataService: DataService) { }

  ngOnInit(): void {

  }


  onReturn() {
   this.dataService.clearValues()
   this.router.navigate(['/cardlist'])
   this.dataService.getCards()
  }

}
