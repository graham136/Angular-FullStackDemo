import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneBookSingleComponent } from './phone-book-single.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular//material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('PhoneBookSingleComponent', () => {
  let component: PhoneBookSingleComponent;
  let fixture: ComponentFixture<PhoneBookSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                RouterTestingModule,
                MatDialogModule,
                BrowserAnimationsModule],
      declarations: [ PhoneBookSingleComponent,
                      NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneBookSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
