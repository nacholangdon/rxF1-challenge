import { Component } from '@angular/core';

import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NavigationComponent],
})
export class AppComponent {
  title = 'rxF1-challenge';
}
