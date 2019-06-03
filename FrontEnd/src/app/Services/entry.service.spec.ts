import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EntryService } from '../Services/entry.service';

describe('EntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: EntryService = TestBed.get(EntryService);
    expect(service).toBeTruthy();
  });
});
