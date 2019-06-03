
//Angular imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Models
import { PhoneBook } from '../Models/phonebook.model';
import { ActionResult } from '../Models/action-result.model';


@Injectable({
  providedIn: 'root'
})
export class PhoneBookHttpService {

  //Setup the api url to receive data from the node.js server

  private phoneBookRoute: String = 'api/phonebook/';
  public baseUrl = environment.baseApiUrl;
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Function to retrieve the phonebook values from the api endpoints.
   * The function is used by phonebookservice to retrieve the phonebook values and
   *  store them
   */
  PhoneBookList() {
    const endPoint = environment.baseApiUrl + this.phoneBookRoute + 'PhoneBookGetAllItems';
    return this.httpClient.get<PhoneBook[]>(endPoint, { observe: 'response' })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  /**
   * Function to add a phonebook
   * @param _phoneBook name of phonebook to be added
   */
  PhoneBookAdd(_phoneBook: PhoneBook) {
    const endPoint = environment.baseApiUrl + this.phoneBookRoute + 'PhoneBookAddItem';
    return this.httpClient.post<ActionResult>(endPoint, _phoneBook, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            return response.body;
          }
        })
      );
  }
}
