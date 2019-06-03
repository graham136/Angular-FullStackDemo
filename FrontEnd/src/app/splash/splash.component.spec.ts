import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashComponent } from './splash.component';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('SplashComponent', () => {
  let component: SplashComponent;
  let fixture: ComponentFixture<SplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule,
                RouterTestingModule,
                BrowserAnimationsModule],
      declarations: [ SplashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a mat-card tag', async(() => {
    const fixture = TestBed.createComponent(SplashComponent);
    const debugElement = fixture.debugElement.query(By.css('mat-card'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render a h1 tag', async(() => {
    const fixture = TestBed.createComponent(SplashComponent);
    const debugElement = fixture.debugElement.query(By.css('h1'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render "ABSA" in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(SplashComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ABSA');
  }));

  it('should render a img tag', async(() => {
    const fixture = TestBed.createComponent(SplashComponent);
    const debugElement = fixture.debugElement.query(By.css('img'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render a button tag', async(() => {
    const fixture = TestBed.createComponent(SplashComponent);
    const debugElement = fixture.debugElement.query(By.css('button'));
    expect(debugElement).toBeTruthy();
  }));

  it('should be able to click continue button', async(() => {
    spyOn(component, 'toAccountList');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.toAccountList).toHaveBeenCalled();
    });
  }));

});
