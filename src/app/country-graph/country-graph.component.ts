import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CovidDataService } from '../services/covid-data.service';
import { UnitedStatesDaily } from '../models/us-daily';

@Component({
  selector: 'app-country-graph',
  templateUrl: './country-graph.component.html',
  styleUrls: ['./country-graph.component.css']
})
export class CountryGraphComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  public data: UnitedStatesDaily[];
  public view: any[] = [700, 300];

  // options
  public legend: boolean = true;
  public showLabels: boolean = true;
  public animations: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = 'Year';
  public yAxisLabel: string = 'Population';
  public timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    private covidDataService: CovidDataService
  ) { }

  public ngOnInit(): void {
    this.covidDataService.getUSDaily().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(res => {
      this.data = res;
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
