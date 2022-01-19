import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  card: any
  identifier: string = ''
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
        })
      }

    )

  }

}