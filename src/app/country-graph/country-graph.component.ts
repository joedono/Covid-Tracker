import { Component, OnInit } from '@angular/core';

import { CovidDataService } from '../services/covid-data.service';

@Component({
  selector: 'app-country-graph',
  templateUrl: './country-graph.component.html',
  styleUrls: ['./country-graph.component.css']
})
export class CountryGraphComponent implements OnInit {

  constructor(
    private covidDataService: CovidDataService
  ) { }

  ngOnInit(): void {
  }

}
