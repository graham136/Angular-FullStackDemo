import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PhoneBookEditComponent } from './phone-book-edit..component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

class MatDialogRefStub {
  close(param: string) {}
}

describe('PhoneBookEditComponent', () => {
  let component: PhoneBookEditComponent;
  let fixture: ComponentFixture<PhoneBookEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
                MatDialogModule,
                HttpClientTestingModule
                ],
      declarations: [ PhoneBookEditComponent ],
      providers: [ { provide: MatDialogRef, useClass: MatDialogRefStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneBookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a label tag', async(() => {
    const fixture = TestBed.createComponent(PhoneBookEditComponent);
    const debugElement = fixture.debugElement.query(By.css('label'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render a form tag', async(() => {
    const fixture = TestBed.createComponent(PhoneBookEditComponent);
    const debugElement = fixture.debugElement.query(By.css('form'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render PhoneBookName in a label tag', async(() => {
    const fixture = TestBed.createComponent(PhoneBookEditComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('label').textContent).toContain('PhoneBookName');
  }));

  it('should be able to click cancel button', async(() => {
    spyOn(component, 'onCancel');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.onCancel).toHaveBeenCalled();
    });
  }));
});
