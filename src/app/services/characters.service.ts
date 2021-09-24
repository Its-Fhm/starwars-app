import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';
import {ListResponse} from '../models/movie';
import {Film} from '../services/films.service';
import {LoaderService} from '../loader/loader.service';

export interface Character {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  filmsData: Film[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  selectedCharacter: Character;
  BASE_URL = 'https://swapi.dev/api'
  characterLength = `${this.BASE_URL}/people/`.length;
  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getMovieCharacters(film: Film) {
    return forkJoin(film.characters.map(characterUrl => {
      this.loaderService.startLoading();
      return this.http.get<Character>(characterUrl)
        .pipe(map(character => {
          character.id = this.findCharacterId(character.url);
          return character;
        }), finalize(() => this.loaderService.finishLoading()))
    }));
  }

  private findCharacterId(characterUrl: string): number {
    return parseInt(characterUrl.substring(this.characterLength, characterUrl.length - 1), 10);
  }
}
