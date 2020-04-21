import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  private BASE_URL = "https://covidtracking.com/api/";

  constructor() { }
}
