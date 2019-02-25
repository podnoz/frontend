import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { JsonService } from 'src/app/services/json-service';

export interface Ingredient {
  name: String;
  quantity: String;
}

export interface RecepieStep {
  content: String;
}

export interface Recepie {
  guid: number;
  title: String;
  subTitle: String;
  description: String;
  ingredients: Ingredient[];
  steps: RecepieStep[];
}

@Component({
  selector: 'app-recepie',
  templateUrl: './recepie.component.html',
  styleUrls: ['./recepie.component.scss']
})

export class RecepieComponent implements OnInit, OnDestroy {
  @Input() recepieID;
  subscribe;
  recepie;

  constructor(private jsonService: JsonService, private location: Location, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscribe = this.route.queryParams.subscribe(params => {
      this.recepieID = +params['recepieID'] || 0;
    });

    this.getRecepieDetails(this.recepieID);
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  getRecepieDetails(recepieID: number) {
    this.jsonService.getData()
    .subscribe((data: any): void => {
      this.recepie = data[recepieID - 1];
    });
  }

  goBack() {
    this.location.back();
  }
}
