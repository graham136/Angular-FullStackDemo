import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PhoneBookService } from './phonebook.service';

describe('PhoneBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: PhoneBookService = TestBed.get(PhoneBookService);
    expect(service).toBeTruthy();
  });
});
