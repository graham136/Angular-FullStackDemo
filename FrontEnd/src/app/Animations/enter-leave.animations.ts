
//Animation Imports
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

/*
Animation Class to animate a div as it is loaded.
It animates the div moving from up to down
It is used in AccountListComponent.
*/

export const EnterLeaveAnimations = trigger('EnterLeave', [
  state('flyIn', style({ transform: 'translateX(0)', opacity: 1 })),
  transition(':enter', [
    style({ transform: 'translateY(-20%)', opacity: 0 }),
    animate('1s 300ms ease-in')
  ]),
  transition(':leave', [
    animate('0.5s ease-out', style({ transform: 'translateX(100%)' }))
  ])
]);
