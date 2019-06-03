import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a nav tag', async(() => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const debugElement = fixture.debugElement.query(By.css('nav'));
    expect(debugElement).toBeTruthy();
  }));

  it('should render a ul tag', async(() => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const debugElement = fixture.debugElement.query(By.css('ul'));
    expect(debugElement).toBeTruthy();
  }));

});
