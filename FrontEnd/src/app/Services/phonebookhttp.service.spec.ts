import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PhoneBookHttpService } from './phonebookhttp.service';

describe('PhoneBookHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: PhoneBookHttpService = TestBed.get(PhoneBookHttpService);
    expect(service).toBeTruthy();
  });
});
