import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}
  public getMovies(): Observable <[]> {
    return this.http.get<[]>('https://swapi.dev/api/films/');
  }

}
