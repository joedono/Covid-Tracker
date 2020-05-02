import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import * as moment from 'moment';

import { CovidDataService } from '../services/covid-data.service';
import { StateDaily } from '../models/state-daily';
import { DataPoint } from '../models/grid/data-point';
import { Series } from '../models/grid/series';

@Component({
  selector: 'app-state-graph',
  templateUrl: './state-graph.component.html',
  styleUrls: ['./state-graph.component.css']
})
export class StateGraphComponent implements OnInit, OnDestroy {
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
    const requestCT = this.covidDataService.getStateDaily('CT').pipe(
      takeUntil(this.ngUnsubscribe),
      map(res => res.sort(function(x, y) { return x.date - y.date; }))
    );
    const requestMA = this.covidDataService.getStateDaily('MA').pipe(
      takeUntil(this.ngUnsubscribe),
      map(res => res.sort(function(x, y) { return x.date - y.date; }))
    );
    const requestNY = this.covidDataService.getStateDaily('NY').pipe(
      takeUntil(this.ngUnsubscribe),
      map(res => res.sort(function(x, y) { return x.date - y.date; }))
    );
    const requestRI = this.covidDataService.getStateDaily('RI').pipe(
      takeUntil(this.ngUnsubscribe),
      map(res => res.sort(function(x, y) { return x.date - y.date; }))
    );

    const combinedRequests = forkJoin([requestCT, requestMA, requestNY, requestRI]);

    combinedRequests.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(res => {
      this.mapDataToGrid(res[0], res[1], res[2], res[3]);
    });
  }

  private mapDataToGrid(dataCT: StateDaily[], dataMA: StateDaily[], dataNY: StateDaily[], dataRI: StateDaily[]): void {
    let mainData: DataPoint[] = new Array();
    let caseData: DataPoint[] = new Array();

    mainData.push({ name: "Hospital CT", series: this.mapHospitalData(dataCT) });
    mainData.push({ name: "Hospital MA", series: this.mapHospitalData(dataMA) });
    mainData.push({ name: "Hospital NY", series: this.mapHospitalData(dataNY) });
    mainData.push({ name: "Hospital RI", series: this.mapHospitalData(dataRI) });

    mainData.push({ name: "Recovered CT", series: this.mapRecoveredData(dataCT) });
    mainData.push({ name: "Recovered MA", series: this.mapRecoveredData(dataMA) });
    mainData.push({ name: "Recovered NY", series: this.mapRecoveredData(dataNY) });
    mainData.push({ name: "Recovered RI", series: this.mapRecoveredData(dataRI) });

    mainData.push({ name: "Death CT", series: this.mapDeathData(dataCT) });
    mainData.push({ name: "Death MA", series: this.mapDeathData(dataMA) });
    mainData.push({ name: "Death NY", series: this.mapDeathData(dataNY) });
    mainData.push({ name: "Death RI", series: this.mapDeathData(dataRI) });

    caseData.push({ name: "Positive CT", series: this.mapPositiveData(dataCT)});
    caseData.push({ name: "Positive MA", series: this.mapPositiveData(dataMA)});
    caseData.push({ name: "Positive NY", series: this.mapPositiveData(dataNY)});
    caseData.push({ name: "Positive RI", series: this.mapPositiveData(dataRI)});

    caseData.push({ name: "Negative CT", series: this.mapNegativeData(dataCT)});
    caseData.push({ name: "Negative MA", series: this.mapNegativeData(dataMA)});
    caseData.push({ name: "Negative NY", series: this.mapNegativeData(dataNY)});
    caseData.push({ name: "Negative RI", series: this.mapNegativeData(dataRI)});

    this.caseData = caseData;
    this.mainData = mainData;
  }

  private mapHospitalData(dataState: StateDaily[]): Series[] {
    let series: Series[] = new Array();

    for (let data of dataState) {
      if (data.date < 20200313) {
        continue;
      }

      let date = moment(data.date.toString()).format("MM-DD-YYYY");
      series.push({ name: date, value: data.hospitalized ?? 0 });
    }

    return series;
  }

  private mapRecoveredData(dataState: StateDaily[]): Series[] {
    let series: Series[] = new Array();

    for (let data of dataState) {
      if (data.date < 20200313) {
        continue;
      }

      let date = moment(data.date.toString()).format("MM-DD-YYYY");
      series.push({ name: date, value: data.recovered ?? 0 });
    }

    return series;
  }

  private mapDeathData(dataState: StateDaily[]): Series[] {
    let series: Series[] = new Array();

    for (let data of dataState) {
      if (data.date < 20200313) {
        continue;
      }

      let date = moment(data.date.toString()).format("MM-DD-YYYY");
      series.push({ name: date, value: data.death ?? 0 });
    }

    return series;
  }

  private mapPositiveData(dataState: StateDaily[]): Series[] {
    let series: Series[] = new Array();

    for (let data of dataState) {
      if (data.date < 20200313) {
        continue;
      }

      let date = moment(data.date.toString()).format("MM-DD-YYYY");
      series.push({ name: date, value: data.positive ?? 0 });
    }

    return series;
  }

  private mapNegativeData(dataState: StateDaily[]): Series[] {
    let series: Series[] = new Array();

    for (let data of dataState) {
      if (data.date < 20200313) {
        continue;
      }

      let date = moment(data.date.toString()).format("MM-DD-YYYY");
      series.push({ name: date, value: data.negative ?? 0 });
    }

    return series;
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
