import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

//Animation Imports
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
export class AppComponent {
  title = 'PhoneBookDemo';
  constructor(private http: HttpClient, private router: Router) {
  }

  toAccountList() {
    this.router.navigateByUrl('/account-list');
  }
}
