import { AsyncPipe, NgIf } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { SeasonsResponse } from 'src/app/models/seasons-response';

import { F1Service } from 'src/app/services/f1.service';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [ RouterLinkWithHref, RouterLinkActive, AsyncPipe, NgIf, MatSidenavModule, MatToolbarModule, MatIconModule, RouterOutlet, MatListModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

  private readonly _f1Service = inject(F1Service);
  private readonly breakpointObserver = inject(BreakpointObserver);

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public getData$: Observable<SeasonsResponse> = this._f1Service.getSeasons();

}
