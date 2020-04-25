import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Country } from '../models/country';
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

  public getStateDate(state: string, date Date): Observable<StateCurrent[]> {
    let strDate = 'current.json';

    if (state) {
      state += '/';
    }

    if (date) {
      strDate = date.toString('yyyymmdd') + '.json';
    }

    const url = BASE_URL + '/states/' + state + strDate;
    return this.http.get<StateCurrent[]>(url);
  }

  public getStateDaily(state: string): Observable<StateDaily[]> {
    if (state) {
      state += '/';
    }

    const url = BASE_URL + '/states/' + state + 'daily.json';
    return this.http.get<StateDaily[]>(url);
  }

  public getStateInformation(state: string): Observable<StateInfo[]> {
    if (state) {
      state += '/';
    }

    const url = BASE_URL + '/states/' + state + 'info.json';
    return this.http.get<StateInfo[]>(url);
  }

  public getUSDate(date: Date): Observable<UnitedStatesCurrent[]> {
    clet strDate = 'current.json';

    if (date) {
      strDate = date.toString('yyyymmdd') + '.json';
    }

    const url = BASE_URL + '/us/' + strDate;
    return this.http.get<UnitedStatesCurrent[]>(url);
  }

  public getUSDaily(): Observable<UnitedStatesDaily[]> {
    const url = BASE_URL + '/us/current.json';
    return this.http.get<UnitedStatesDaily[]>(url);
  }

}
    Counties- /api/v1/counties.json | CSV
    Tracker URLs - /api/v1/urls.json
    State Website Screenshots - /api/v1/states/screenshots.json
    In the press - /api/v1/press.json
