import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recepies-list',
  templateUrl: './recepies-list.component.html',
  styleUrls: ['./recepies-list.component.scss']
})

export class RecepiesListComponent implements OnInit {

  public jsonData: any;

  constructor(private jsonService: JsonService, private _router: Router) { }

  public ngOnInit(): void {
    this.jsonService.getData()
      .subscribe((data: any): void => {
        this.jsonData = data;
      });
  }

  navigateRecepieComponent(id: number): void {
    this._router.navigate(['/recepieComponent'], { queryParams: { recepieID: id }});
  }

}
