import { OnInit, Input, AfterViewInit, Component, ViewChild } from '@angular/core';
import { Movie } from '../models/movie';
import { FilmsService, Film } from '../services/films.service';
import { Character } from '../services/characters.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, AfterViewInit {
  @Input() movie?: Movie;
  @Input() characters: any
  @Input() totalCharacters: any;
  @Input() totalHeights: any;
  @Input() crawlerFlag: any;

  film: Film;
  displayedColumns: string[] = ['name', 'gender', 'height'];
  dataSource: any;
  // totalCharacters: any;
  // @Input() selectedMovie: any;
  constructor(public filmsService: FilmsService) {
  }
  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit() {
    this.film = this.filmsService.selectedFilm;
  }
  

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.characters);
    this.dataSource.sort = this.sort;
  }

}
