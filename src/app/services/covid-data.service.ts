import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as moment from 'moment';

import { Press } from '../models/press';
import { StateCurrent } from '../models/state-current';
import { StateDaily } from '../models/state-daily';
import { StateInfo } from '../models/state-info';
import { TrackerUrl } from '../models/tracker-url';
import { UnitedStatesCurrent } from '../models/us-current';
import { UnitedStatesDaily } from '../models/us-daily';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  private readonly BASE_URL = "https://covidtracking.com/api/v1";

  constructor(
    protected http: HttpClient
  ) { }

  public getStateDate(state: string, date: Date): Observable<StateCurrent[]> {
    let strDate = 'current.json';

    if (state) {
      state += '/';
    }

    if (date) {
      strDate = moment(date).format('YYYYMMDD') + '.json';
    }

    const url = this.BASE_URL + '/states/' + state + strDate;
    return this.http.get<StateCurrent[]>(url);
  }

  public getStateDaily(state: string): Observable<StateDaily[]> {
    if (state) {
      state += '/';
    }

    const url = this.BASE_URL + '/states/' + state + 'daily.json';
    return this.http.get<StateDaily[]>(url);
  }

  public getStateInformation(state: string): Observable<StateInfo[]> {
    if (state) {
      state += '/';
    }

    const url = this.BASE_URL + '/states/' + state + 'info.json';
    return this.http.get<StateInfo[]>(url);
  }

  public getUSDate(date: Date): Observable<UnitedStatesCurrent[]> {
    let strDate = 'current.json';

    if (date) {
      strDate = moment(date).format('YYYYMMDD') + '.json';
    }

    const url = this.BASE_URL + '/us/' + strDate;
    return this.http.get<UnitedStatesCurrent[]>(url);
  }

  public getUSDaily(): Observable<UnitedStatesDaily[]> {
    const url = this.BASE_URL + '/us/daily.json';
    return this.http.get<UnitedStatesDaily[]>(url);
  }

  public getTrackerURLs(): Observable<TrackerUrl[]> {
    const url = this.BASE_URL + '/urls.json';
    return this.http.get<TrackerUrl[]>(url);
  }

  public getPress(): Observable<Press[]> {
    const url = this.BASE_URL + '/press.json';
    return this.http.get<Press[]>(url);
  }

}
