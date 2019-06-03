/*
 Components
  Mat-Dialog      - Angular Material Dialog
  input           - input of type number to input number value
  button          - Sass interpretation of bootstrap warning and success buttons.

  Style Classes
  scssBtn         - Sass button
  green           - Interpretation of success bootstrap button
  orange          - Interpretation of warning bootstrap button

  Functions
  onOk            - Function to withdraw money and exit to account list component.
  onCancel        - Function to cancel and exit dialog to account list component.


  This component is loaded by clicking an enable withdraw button in account list.

*/

//Angular import
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Angular Material
import { MatDialogRef } from '@angular/material';

//Services
import { PhoneBookService } from '../Services/phonebook.service';

//Models
import { PhoneBook } from '../Models/phonebook.model';


@Component({
  selector: 'app-phone-book-edit',
  templateUrl: './phone-book-edit.component.html',
  styleUrls: ['./phone-book-edit.component.scss']
})
export class PhoneBookEditComponent implements OnInit {

  public withdrawAmount: number = 0;

  public bookName: String = '';
  public tempPhoneBook: PhoneBook;

  myForm = new FormGroup({});

  /**
   *
   * @param dialogRef - The dialogref that keeps state for the new phonebook
   * @param phoneBookService The service that keeps state for the phonebooks
   * @param formBuilder - The formBuilder that does validation for the phonebook
   */
  constructor(
    public dialogRef: MatDialogRef<PhoneBookEditComponent>,
    public phoneBookService: PhoneBookService,
    public formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      // Adding the "myNum" input to our FormGroup along with its min-max Validators.
      'BookName': ['', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  /** function to click ok in dialog  */
  onOk() {

    this.bookName = this.myForm.controls.BookName.value;
    this.tempPhoneBook = new PhoneBook();
    this.tempPhoneBook.PhoneBookId = this.uuidv4();
    this.tempPhoneBook.PhoneBookName = this.bookName;

    this.dialogRef.close(this.tempPhoneBook);

  }

  /** function to cancel dialog */
  onCancel() {
    this.dialogRef.close(false);
  }

  // Obselete function creates a Guid
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
