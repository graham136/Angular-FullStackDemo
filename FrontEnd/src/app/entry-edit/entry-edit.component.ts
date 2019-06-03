//Angular import
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Angular Material
import { MatDialogRef } from '@angular/material';

//Services
import { PhoneBookService } from '../Services/phonebook.service';
import { EntryService } from '../Services/entry.service';

//Models
import { PhoneBook } from '../Models/phonebook.model';
import { Entry } from '../Models/entry.model';

@Component({
  selector: 'app-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.scss']
})
export class EntryEditComponent implements OnInit {

  public withdrawAmount: number = 0;

  public phoneBookName: String = '';
  public phoneBookId: String = '';
  public tempPhoneBook: PhoneBook;

  public entryName: String = '';
  public entryNumber: String = '';
  public tempEntry: Entry;

  myForm = new FormGroup({});

  /**
   *
   * @param dialogRef - the dialogRef that keeps state and tracks the evants22
   * @param phoneBookService - the service that keeps track of state of the phonebooks
   * @param entryService -the service that keeps track of the state of the entries
   * @param formBuilder -the module that does validation for the form.
   */
  constructor(
    public dialogRef: MatDialogRef<EntryEditComponent>,
    public phoneBookService: PhoneBookService,
    public entryService: EntryService,
    public formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      // Adding the "myNum" input to our FormGroup along with its min-max Validators.
      'EntryName': ['', [Validators.required]],
      'EntryNumber': ['', [Validators.required]]
    });

    if(this.phoneBookService.currentPhoneBook){
    this.phoneBookName = this.phoneBookService.currentPhoneBook.PhoneBookName;
    this.phoneBookId = this.phoneBookService.currentPhoneBook.PhoneBookId;
    }
  }

  ngOnInit() {

  }

  /** function to click ok in dialog  */
  onOk() {

    this.entryName = this.myForm.controls.EntryName.value;
    this.entryNumber = this.myForm.controls.EntryNumber.value;
    this.tempEntry = new Entry();
    this.tempEntry.EntryId = this.uuidv4();
    this.tempEntry.EntryName = this.entryName;
    this.tempEntry.EntryNumber = this.entryNumber;
    this.tempEntry.PhoneBookId = this.phoneBookId;

    this.dialogRef.close(this.tempEntry);

  }

  /** function to cancel dialog */
  onCancel() {
    this.dialogRef.close(false);
  }

  /**
   * Obselete Guid generator used for testing without api
   */
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
