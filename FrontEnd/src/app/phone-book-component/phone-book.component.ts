
// Angular Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

//Angular Material Imports
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';

//Custom Component Imports
import { NavbarComponent } from '../navbar/navbar.component';

// Animation Imports
import { EnterLeaveAnimations } from '../Animations/enter-leave.animations';

//Model Imports
import { PhoneBook } from '../Models/phonebook.model';

//Service Imports
import { PhoneBookService } from '../Services/phonebook.service';

//Custom Imports
import { PhoneBookEditComponent } from '../phone-book-edit/phone-book-edit..component';


@Component({
  selector: 'app-phone-book-component',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.scss'],
  animations: [EnterLeaveAnimations],
})
export class PhoneBookComponent implements OnInit {

  public phonebooks: PhoneBook[];
  public dialogRef: MatDialogRef<PhoneBookEditComponent>;

  /**
   *
   * @param phoneBookService - Service to keep states for phonebooks
   * @param router - Router module to change pages
   * @param dialog - dialog that opens the new phonebook dialog
   * @param httpClient - Http client that does api calls toward the api
   */
  constructor(public phoneBookService: PhoneBookService,
    public router: Router,
    public dialog: MatDialog,
    public httpClient: HttpClient) {


      this.phoneBookService.GetAllPhoneBooks().subscribe(
      (result: PhoneBook[]) => {
        this.phonebooks = result;
      });

  }

  ngOnInit() {
  }

  // Function to view the current selected phonebook entries
  onViewClick(index: number) {
    this.phoneBookService.currentPhoneBook = this.phonebooks[index];
    console.log(this.phoneBookService.currentPhoneBook);
    this.router.navigateByUrl('/phonebook');
  }

  // Function to open an new phonebook dialog
  openPhoneBookNewDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    this.dialogRef = this.dialog.open(PhoneBookEditComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe((result: PhoneBook) => {
      this.phonebooks.push(result);
      this.phoneBookService.PhoneBookAddItem(result).subscribe(actionResult => {
        console.log(actionResult);
      });
    });
  }

}
