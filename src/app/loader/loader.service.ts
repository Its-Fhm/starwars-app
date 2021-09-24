import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoaderService {

  loadingCounter = 0;

  constructor() {
  }

  startLoading() {
    this.loadingCounter++;
  }

  finishLoading() {
    this.loadingCounter--;
  }

}
