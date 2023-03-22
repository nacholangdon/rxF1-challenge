import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [ RouterLinkWithHref, MatToolbarModule, MatIconModule, RouterOutlet, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

}
