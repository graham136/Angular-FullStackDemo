// Angular Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Angular Material Imports
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';

//Model Imports
import { Entry } from '../Models/entry.model';
import { PhoneBook } from '../Models/phonebook.model';
import { DisplayEntry } from '../Models/display-entry.model';
import { ActionResult } from '../Models/action-result.model';

//Service Imports
import { PhoneBookService } from '../Services/phonebook.service';
import { EntryService } from '../Services/entry.service';

//Animation Imports
import { EnterLeaveAnimations } from '../../../src/app/Animations/enter-leave.animations';

//Custom Components
import { EntryEditComponent } from '../entry-edit/entry-edit.component';


@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
  animations: [EnterLeaveAnimations]
})
export class EntryListComponent implements OnInit {

  public phoneBookList: PhoneBook[] = [];
  public currentPhoneBook: PhoneBook;
  public currentPhoneBookEntries: Entry[] = [];
  public currentPhoneBookName: String = '';
  public currentPhoneBookId: String = '';
  public entries: Entry[] = [];
  public displayEntryList: DisplayEntry[] = [];
  public tempDisplayEntry: DisplayEntry;

  public dialogRef: MatDialogRef<EntryEditComponent>;


  constructor(public phoneBookService: PhoneBookService,
    public entryService: EntryService,
    public router: Router,
    public dialog: MatDialog) {

    this.phoneBookService.GetAllPhoneBooks().subscribe(
      (result: PhoneBook[]) => {
        this.phoneBookList = result;
        this.entryService.GetAllEntries().subscribe(
          (result: Entry[]) => {
            this.entries = result;
            console.log(this.entries);
            this.currentPhoneBookEntries = [];
            this.entries.forEach((entry, index) => {
              this.tempDisplayEntry = new DisplayEntry();
              this.tempDisplayEntry.EntryId = entry.EntryId;
              this.tempDisplayEntry.EntryName = entry.EntryName;
              this.tempDisplayEntry.EntryNumber = entry.EntryNumber;
              this.tempDisplayEntry.PhoneBookId = entry.PhoneBookId;
              this.tempDisplayEntry.PhoneBookName =
                this.phoneBookList[this.phoneBookList.findIndex(i => i.PhoneBookId === entry.PhoneBookId)].PhoneBookName;
              this.displayEntryList.push(this.tempDisplayEntry);
            });
          });
      });
  }

  ngOnInit() {
  }

  backToPhoneBooks() {
    this.router.navigateByUrl('/phonebooks');
  }

}
