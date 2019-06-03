// Angular impports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Service Imports
import { PhoneBookService } from '../Services/phonebook.service';
import { EntryService } from '../Services/entry.service';

//Model Imports
import { PhoneBook } from '../Models/phonebook.model';
import { Entry } from '../Models/entry.model';

// Animation Imports
import { EnterLeaveAnimations } from '../Animations/enter-leave.animations';

//Angular Material
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

import { PhoneBookEditComponent } from '../phone-book-edit/phone-book-edit..component';
import { EntryEditComponent } from '../entry-edit/entry-edit.component';
import { ActionResult } from '../Models/action-result.model';
import { DisplayEntry } from '../Models/display-entry.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-phone-book-single',
  templateUrl: './phone-book-single.component.html',
  styleUrls: ['./phone-book-single.component.scss'],
  animations: [EnterLeaveAnimations]
})
export class PhoneBookSingleComponent implements OnInit {

  public currentPhoneBook: PhoneBook;
  public currentPhoneBookEntries: Entry[] = [];
  public currentPhoneBookName: String = '';
  public currentPhoneBookId: String = '';
  public entries: Entry[] = [];

  public dialogRef: MatDialogRef<EntryEditComponent>;

  constructor(public phoneBookService: PhoneBookService,
    public entryService: EntryService,
    public router: Router,
    public dialog: MatDialog) {

    this.entryService.GetAllEntries().subscribe(
      (result: Entry[]) => {
        this.entries = result;
        this.currentPhoneBookEntries = [];
        this.entries.forEach((entry, index) => {
          if (entry.PhoneBookId === this.currentPhoneBookId) {
            this.currentPhoneBookEntries.push(entry);
          }
        });
      });

  }

  ngOnInit() {

    if (this.phoneBookService.currentPhoneBook) {
      this.currentPhoneBook = this.phoneBookService.currentPhoneBook;
      this.currentPhoneBookName = this.currentPhoneBook.PhoneBookName;
      this.currentPhoneBookId = this.currentPhoneBook.PhoneBookId;
    }
    else {
      this.router.navigateByUrl('/phonebooks');
    }


  }

  backToPhoneBooks() {
    this.router.navigateByUrl('/phonebooks');
  }

  openEntryNewDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    this.dialogRef = this.dialog.open(EntryEditComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {

      this.currentPhoneBookEntries = [];
      this.entries.forEach((entry, index) => {
        if (entry.PhoneBookId === this.currentPhoneBookId) {
          this.currentPhoneBookEntries.push(entry);
        }
      });

      this.entryService.EntryAddItem(result).subscribe((actionResult: ActionResult) => {
        console.log(actionResult);
        this.entryService.GetAllEntries().subscribe(
          (result: Entry[]) => {
            this.entries = result;
            this.currentPhoneBookEntries = [];
            this.entries.forEach((entry, index) => {
              if (entry.PhoneBookId === this.currentPhoneBookId) {
                this.currentPhoneBookEntries.push(entry);
              }
            });
          });
      });

    });
  }

  onDeleteClick(index: number) {
    let tempDisplayEntry = this.currentPhoneBookEntries[index];

    this.entryService.EntryDeleteItem(tempDisplayEntry.EntryId).subscribe((actionResult: ActionResult) => {
      console.log(actionResult);
      this.entryService.GetAllEntries().subscribe(
        (result: Entry[]) => {
          this.entries = result;
          this.currentPhoneBookEntries = [];
          this.entries.forEach((entry, index) => {
            if (entry.PhoneBookId === this.currentPhoneBookId) {
              this.currentPhoneBookEntries.push(entry);
            }
          });
        });
    });
  }

}
