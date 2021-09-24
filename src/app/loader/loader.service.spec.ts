import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderService = TestBed.get(LoaderService);
    expect(service).toBeTruthy();
  });

  it('should increase loader counter when loading starts', () => {
    const service: LoaderService = TestBed.get(LoaderService);
    expect(service.loadingCounter).toBe(0);
    service.startLoading();
    expect(service.loadingCounter).toBe(1);
  });

  it('should decrease loader counter when loading ends', () => {
    const service: LoaderService = TestBed.get(LoaderService);
    expect(service.loadingCounter).toBe(0);
    service.startLoading();
    service.finishLoading();
    expect(service.loadingCounter).toBe(0);
  });
});
