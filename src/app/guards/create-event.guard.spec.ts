import { TestBed, async, inject } from '@angular/core/testing';

import { CreateEventGuard } from './create-event.guard';

describe('CreateEventGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateEventGuard]
    });
  });

  it('should ...', inject([CreateEventGuard], (guard: CreateEventGuard) => {
    expect(guard).toBeTruthy();
  }));
});
