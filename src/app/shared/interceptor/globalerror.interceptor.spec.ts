import { TestBed } from '@angular/core/testing';

import { GlobalerrorInterceptor } from './globalerror.interceptor';

describe('GlobalerrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GlobalerrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GlobalerrorInterceptor = TestBed.inject(GlobalerrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
