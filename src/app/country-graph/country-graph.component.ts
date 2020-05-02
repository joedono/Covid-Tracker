import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import * as moment from 'moment';

import { CovidDataService } from '../services/covid-data.service';
import { UnitedStatesDaily } from '../models/us-daily';
import { DataPoint } from '../models/grid/data-point';
import { Series } from '../models/grid/series';

@Component({
  selector: 'app-country-graph',
  templateUrl: './country-graph.component.html',
  styleUrls: ['./country-graph.component.css']
})
export class CountryGraphComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  public mainData: DataPoint[];
  public caseData: DataPoint[];

  // options
  public view: any[] = [700, 300];
  public legend: boolean = false;
  public showLabels: boolean = true;
  public animations: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = 'Time';
  public yAxisLabel: string = 'People';
  public timeline: boolean = true;

  constructor(
    private covidDataService: CovidDataService
  ) { }

  public ngOnInit(): void {
    this.covidDataService.getUSDaily().pipe(
      takeUntil(this.ngUnsubscribe),
      map(res => res.sort(function(x, y) { return x.date - y.date; }))
    ).subscribe(res => {
      this.mapDataToGrid(res);
    });
  }

  private mapDataToGrid(data: UnitedStatesDaily[]): void {
    let mainData: DataPoint[] = new Array();
    let caseData: DataPoint[] = new Array();

    let positiveSeries: Series[] = new Array();
    let negativeSeries: Series[] = new Array();
    let hospitalSeries: Series[] = new Array();
    let inIcuCurrentlySeries: Series[] = new Array();
    let inIcuCumulativeSeries: Series[] = new Array();
    let onVentilatorCurrentlySeries: Series[] = new Array();
    let onVentilatorCumulativeSeries: Series[] = new Array();
    let recoveredSeries: Series[] = new Array();
    let deathSeries: Series[] = new Array();

    for (let usData of data) {
      if (!usData.death || usData.death < 5) {
        continue;
      }

      let date = moment(usData.date.toString()).format("MM-DD-YYYY");

      positiveSeries.push({ name: date, value: usData.positive ?? 0 });
      negativeSeries.push({ name: date, value: usData.negative ?? 0 });
      hospitalSeries.push({ name: date, value: usData.hospitalized ?? 0 });
      inIcuCurrentlySeries.push({ name: date, value: usData.inIcuCurrently ?? 0 });
      inIcuCumulativeSeries.push({ name: date, value: usData.inIcuCumulative ?? 0 });
      onVentilatorCurrentlySeries.push({ name: date, value: usData.onVentilatorCurrently ?? 0 });
      onVentilatorCumulativeSeries.push({ name: date, value: usData.onVentilatorCumulative ?? 0 });
      recoveredSeries.push({ name: date, value: usData.recovered ?? 0 });
      deathSeries.push({ name: date, value: usData.death ?? 0 });
    }

    caseData.push({ name: "Positive", series: positiveSeries });
    caseData.push({ name: "Negative", series: negativeSeries });
    mainData.push({ name: "Hospital", series: hospitalSeries });
    mainData.push({ name: "Cur ICU", series: inIcuCurrentlySeries });
    mainData.push({ name: "Cum ICU", series: inIcuCumulativeSeries });
    mainData.push({ name: "Cur Vent", series: onVentilatorCurrentlySeries });
    mainData.push({ name: "Cum Vent", series: onVentilatorCumulativeSeries });
    mainData.push({ name: "Recovered", series: recoveredSeries });
    mainData.push({ name: "Deaths", series: deathSeries });

    this.caseData = caseData;
    this.mainData = mainData;
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
