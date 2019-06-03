import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntryListComponent } from './entry-list.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular//material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';


describe('EntryListComponent', () => {
  let component: EntryListComponent;
  let fixture: ComponentFixture<EntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                RouterTestingModule,
                MatDialogModule,
                BrowserAnimationsModule],
      declarations: [ EntryListComponent,
                      NavbarComponent ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a h2 tag', async(() => {
    const fixture = TestBed.createComponent(EntryListComponent);
    const debugElement = fixture.debugElement.query(By.css('h2'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render a table tag', async(() => {
    const fixture = TestBed.createComponent(EntryListComponent);
    const debugElement = fixture.debugElement.query(By.css('table'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render "Name" in a th tag', async(() => {
    const fixture = TestBed.createComponent(EntryListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('th').textContent).toContain('Name');
  }));
});
