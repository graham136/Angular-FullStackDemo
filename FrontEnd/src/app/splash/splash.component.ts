

//Angular Imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Animation Imports
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)', opacity: 1 })),
      transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: 0 }),
        animate('1s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})

/**
 * Splash Component
 *
 */
export class SplashComponent {

  /**
   * Splash Component Constructor
   * @param router - router is used to route to accountList component
   *
   */
  constructor(private router: Router) { }

  /**
   * toAccountList is used to navigate to accountList component,
   * when continue button is clicked.
   */
  toAccountList() {
    this.router.navigateByUrl('/phonebooks');
  }

}
