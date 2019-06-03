import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneBookComponent } from './phone-book.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';


describe('PhoneBookComponentComponent', () => {
  let component: PhoneBookComponent;
  let fixture: ComponentFixture<PhoneBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                RouterTestingModule,
                MatDialogModule,
                BrowserAnimationsModule],
      declarations: [ PhoneBookComponent,
                      NavbarComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a h2 tag', async(() => {
    const fixture = TestBed.createComponent(PhoneBookComponent);
    const debugElement = fixture.debugElement.query(By.css('h2'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render a table tag', async(() => {
    const fixture = TestBed.createComponent(PhoneBookComponent);
    const debugElement = fixture.debugElement.query(By.css('table'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render "Name" in a th tag', async(() => {
    const fixture = TestBed.createComponent(PhoneBookComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('th').textContent).toContain('Name');
  }));
});
