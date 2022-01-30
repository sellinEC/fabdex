import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-advanced-details',
  templateUrl: './advanced-details.component.html',
  styleUrls: ['./advanced-details.component.css']
})
export class AdvancedDetailsComponent implements OnInit {
  card: any
  rulesCount: number = 0
  //card.identofier - sets route :id
  identifier: string = ''
  expand: boolean = false
  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    // this.identifier = this.route.snapshot.params['id'];
    //Subscribes on param-change and runs fetch details from service once identifier is set correctly
    this.route.params.subscribe(
      (params: Params) => {
        this.identifier = params['id']
        this.dataService.getDetails(this.identifier).subscribe((response: any) => {
          this.card = response
          console.log(this.card)

          this.countRules(this.card)
        })
      }


    )

  }
//sets rules-count
  countRules(card: any) {
    let totalRules = 0
    card.rulings.forEach((rule: any) => {
      totalRules +=1
      console.log(rule);
      console.log(totalRules);
    });
    this.rulesCount = totalRules
  }

  //expands rules-tab
  onExpand() {
    this.expand = !this.expand
  }
}

