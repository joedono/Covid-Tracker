import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { CovidDataService } from '../services/covid-data.service';

import { Press } from '../models/press';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  public pressArticles: Press[];

  constructor(
    private covidDataService: CovidDataService
  ) { }

  ngOnInit(): void {
    this.covidDataService.getPress().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(res => {
      this.pressArticles = res;
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
