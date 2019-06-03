//Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular Material Modules
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule } from '@angular//material';

//Angular Custom Services
import { EntryService } from './Services/entry.service';
import { PhoneBookService } from './Services/phonebook.service';

//Angular Custom Components
import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { PhoneBookComponent } from './phone-book-component/phone-book.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PhoneBookSingleComponent } from './phone-book-single/phone-book-single.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { PhoneBookEditComponent } from './phone-book-edit/phone-book-edit..component';
import { EntryEditComponent } from './entry-edit/entry-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    PhoneBookComponent,
    NavbarComponent,
    PhoneBookSingleComponent,
    EntryListComponent,
    PhoneBookEditComponent,
    EntryEditComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'splash', pathMatch: 'full' },
      { path: 'splash', component: SplashComponent },
      { path: 'phonebooks', component: PhoneBookComponent },
      { path: 'phonebook', component: PhoneBookSingleComponent },
      { path: 'entries', component: EntryListComponent },
      ])
  ],
  providers: [PhoneBookService, EntryService],
  bootstrap: [AppComponent],
  entryComponents: [PhoneBookEditComponent, EntryEditComponent]
})
export class AppModule { }
