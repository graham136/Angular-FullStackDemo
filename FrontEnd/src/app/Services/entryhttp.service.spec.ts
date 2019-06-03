import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EntryHttpService } from './entryhttp.service';

describe('EntryHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: EntryHttpService = TestBed.get(EntryHttpService);
    expect(service).toBeTruthy();
  });
});
