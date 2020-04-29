import { Component, OnInit } from '@angular/core';

import { CovidDataService } from '../services/covid-data.service';

@Component({
  selector: 'app-state-graph',
  templateUrl: './state-graph.component.html',
  styleUrls: ['./state-graph.component.css']
})
export class StateGraphComponent implements OnInit {

  constructor(
    private covidDataService: CovidDataService
  ) { }

  ngOnInit(): void {
  }

}
