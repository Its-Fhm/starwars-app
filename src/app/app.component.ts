import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service'
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {LoaderService} from './loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private dataService: DataService, private httpClient: HttpClient, public loaderService: LoaderService) { }
  title = 'starwars-app';
  people: any;
  films: any;
  userDetails: any;
  people$: Observable<any> | undefined;

  ngOnInit(): void {
    console.log('hello world');    
  }

}
