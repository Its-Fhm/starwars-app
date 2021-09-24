import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie';
import { DataService } from '../services/data.service'
import { FilmsService, Film } from '../services/films.service';
import { Character, CharactersService } from '../services/characters.service';
import { Subscription } from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  
  constructor(private dataService: DataService, public filmsService: FilmsService, private charactersService: CharactersService) { }
  movies: Movie[] = [];
  selected = '';
  films: Film[];
  selectedMovie?: Film;
  characterList: Observable<any> | undefined;
  people: any;
  subscription: Subscription;
  characters: Character[];
  totalCharacters: any;
  crawlerFlag = false;
  totalHeights: any

  ngOnInit(): void {
    this.subscription = this.filmsService.getAllFilms().subscribe(data => {
      this.films = data;
    });
  }

  selectMovie (film: Film) {
    console.log(film, this.selected);
    this.selectedMovie = film;
    this.filmsService.selectedFilm = film;
    setTimeout(() =>{ 
      this.crawlerFlag = true;
    }, 7000);
    this.charactersService.getMovieCharacters(film).subscribe(data => {
      this.totalCharacters = data.length;
      this.characters = data;
      this.totalHeights = this.sumHeight(data);
    })
  }

  selectOption (film: Film) {
    this.filmsService.selectedFilm = film;
  }

  sumHeight = (data: any) => {
    const heights = data.map((c: any) => parseInt(c.height, 10));
    const filteredHeights = heights.filter((height: any) => Number.isInteger(height));
    const totalHeight = filteredHeights.reduce((acc: any, value: any) => acc + value, 0)
    const { unitInches, unitFeet } = this.unitConversion(totalHeight);
    return  `${totalHeight}cm (${unitFeet.toFixed(2)}ft / ${unitInches.toFixed(2)}in)`;
  }

  unitConversion = (cm: number) => {
    const unitInches = cm / 2.54;
    const unitFeet = cm / 30.48;
    return { cm , unitInches, unitFeet}
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
