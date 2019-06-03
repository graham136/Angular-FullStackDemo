//Angluar Imports
import { Injectable } from '@angular/core';
import { map, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Services
import { PhoneBookHttpService } from './phonebookhttp.service';

// Models
import { PhoneBook } from '../Models/phonebook.model';
import { ActionResult } from '../Models/action-result.model';

import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PhoneBookService {
  public phonebooks: PhoneBook[];
  public currentPhoneBook: PhoneBook;

  public accountRoute: String = 'api/phonebook/';
  public baseUrl = environment.baseApiUrl;

  constructor(public phoneBookHttpService: PhoneBookHttpService,
    public httpClient: HttpClient) {
    this.GetAllPhoneBooks();
  }
  /**
     *  Function to retrieve the phonebook values from the accounthttpservice and
     *  store them
     */
  GetAllPhoneBooks() {

    return this.phoneBookHttpService.PhoneBookList()
      .pipe(
        map(phonebooks => {
          if (phonebooks) {
            this.phonebooks = phonebooks;
          }
          return phonebooks;
        })
      );
  }

  /**
   * Function to retrieve add a phonebook
   * @param _phoneBook name of phonebook to be added
   */
  PhoneBookAddItem(_phoneBook: PhoneBook) {

    return this.phoneBookHttpService.PhoneBookAdd(_phoneBook)
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}


