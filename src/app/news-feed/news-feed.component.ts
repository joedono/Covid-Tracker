import { Component, OnInit } from '@angular/core';

import { CovidDataService } from '../services/covid-data.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  constructor(
    private covidDataService: CovidDataService
  ) { }

  ngOnInit(): void {
  }

}
