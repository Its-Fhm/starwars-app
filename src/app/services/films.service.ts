import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';
import {ListResponse} from '../models/movie';
import {Character} from '../services/characters.service';
import {LoaderService} from '../loader/loader.service';



export interface Film {
  id: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  charactersData: Character[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  BASE_URL = 'https://swapi.dev/api'
  filmsList: Film[];
  selectedFilm: Film;
  filmLength = `${this.BASE_URL}/films/`.length;
  constructor(private http: HttpClient,
              private loaderService: LoaderService) {
  }

  getAllFilms(): Observable<Film[]> {
    if (this.filmsList) {
      return of(this.filmsList);
    } else {
      this.loaderService.startLoading();
      return this.http.get<ListResponse<Film>>(`${this.BASE_URL}/films`)
        .pipe(map((films => films.results.map(film => {
              film.id = this.findFilmId(film.url);
              return film;
            })
          )),
          tap(films => this.filmsList = films),
          finalize(() => this.loaderService.finishLoading()));
    }
  }

  private findFilmId(filmUrl: string): number {
    return parseInt(filmUrl.substring(this.filmLength, filmUrl.length - 1), 10);
  }
}
