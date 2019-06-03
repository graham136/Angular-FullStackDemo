//Angluar Imports
import { Injectable } from '@angular/core';
import { map, flatMap } from 'rxjs/operators';

// Services
import { EntryHttpService } from './entryhttp.service';

// Models
import { Entry } from '../Models/entry.model';


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  public entries: Entry[];
  public currentEntry: Entry;

  constructor(public entryHttpService: EntryHttpService) {
  }
  /**
     *  Function to retrieve the entry values from the entryttpservice and
     *  store them
     */
  GetAllEntries() {
    return this.entryHttpService.EntryList()
      .pipe(
        map(entries => {
          if (entries) {
            this.entries = entries;
          }
          return entries;
        })
      );
  }

  // Function to add an entry value
  EntryAddItem(_entry: Entry) {

    return this.entryHttpService.EntryAdd(_entry)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  // Function to delete an entry item
  EntryDeleteItem(_entryId: String) {

    return this.entryHttpService.EntryDelete(_entryId)
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}




