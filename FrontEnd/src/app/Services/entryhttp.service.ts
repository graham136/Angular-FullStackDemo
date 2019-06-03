
//Angular imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Models
import { Entry } from '../Models/entry.model';
import { ActionResult } from '../Models/action-result.model';

@Injectable({
  providedIn: 'root'
})
export class EntryHttpService {

  //Setup the api url to receive data from the node.js server

  private entryRoute: String = 'api/entry/';
  public baseUrl = environment.baseApiUrl;
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Function to retrieve the entry values from the api endpoints.
   * The function is used by entryservice to retrieve the entry values and
   *  store them
   */
  EntryList() {
    const endPoint = environment.baseApiUrl + this.entryRoute + 'EntryGetAllItems';
    return this.httpClient.get<Entry[]>(endPoint, { observe: 'response' })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  /**
   * Function to add an entry to the api
   * @param _entry The entry to be added
   */
  EntryAdd(_entry: Entry) {
    const endPoint = environment.baseApiUrl + this.entryRoute + 'EntryAddItem';
    return this.httpClient.post<ActionResult>(endPoint, _entry, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            return response.body;
          }
        })
      );
  }

  /**
   * Function to delete an entry from the api
   * @param _entryId - The entryid to be deleted
   */
  EntryDelete(_entryId: String) {
    const endPoint = environment.baseApiUrl + this.entryRoute + 'EntryDeleteItem?EntryId=' + _entryId;
    return this.httpClient.delete<ActionResult>(endPoint, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            return response.body;
          }
        })
      );
  }

}

/* Used for testing without the api.
  let tempEntries = [
{ 'EntryId': 'abc!@#$1234', 'PhoneBookId': 'abc!@#$1234', 'EntryName': 'MobileHome', 'EntryNumber': '0211231214' },
{ 'EntryId': 'abc!@#$1235', 'PhoneBookId': 'abc!@#$1234', 'EntryName': 'MobileWork', 'EntryNumber': '0211231215' },
{ 'EntryId': 'abc!@#$1236', 'PhoneBookId': 'abc!@#$1234', 'EntryName': 'MobileCell', 'EntryNumber': '0211231216' },
{ 'EntryId': 'abc!@#$1237', 'PhoneBookId': 'def!@#$5678', 'EntryName': 'TelkomHome', 'EntryNumber': '0211231224' },
{ 'EntryId': 'abc!@#$1238', 'PhoneBookId': 'def!@#$5678', 'EntryName': 'TelkomWork', 'EntryNumber': '0211231225' },
{ 'EntryId': 'abc!@#$1239', 'PhoneBookId': 'def!@#$5678', 'EntryName': 'TelkomCell', 'EntryNumber': '0211231226' },
{ 'EntryId': 'abc!@#$1231', 'PhoneBookId': 'feg!@#$1234', 'EntryName': 'WorkHome', 'EntryNumber': '0211231234' },
{ 'EntryId': 'abc!@#$1232', 'PhoneBookId': 'feg!@#$1234', 'EntryName': 'WorkWork', 'EntryNumber': '0211231235' },
{ 'EntryId': 'abc!@#$1233', 'PhoneBookId': 'feg!@#$1234', 'EntryName': 'WorkCell', 'EntryNumber': '0211231236' }
];

/*
public EntryId: String = '';
public PhoneBookId: String = '';
public EntryName: String = '';
public EntryNumber: String = '';

let tempPhonebooks = [
{ "PhoneBookId": "abc!@#$1234", "PhoneBookName": "Mobile" },
{ "PhoneBookId": "def!@#$5678", "PhoneBookName": "Telkom" },
{ "PhoneBookId": "feg!@#$1234", "PhoneBookName": "Work" }
   ];
*/



