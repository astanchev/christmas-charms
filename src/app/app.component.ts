import { Component } from '@angular/core';
import { zoomInDownOnEnterAnimation } from 'angular-animations';
import { switchMap, tap } from 'rxjs/operators';
import { CharmsService } from './core/services/charms.service';
import { IpService } from './core/services/ip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [zoomInDownOnEnterAnimation()]
})
export class AppComponent {
  charm = '';
  animationState = false;
  ip: string;
  countCharms: number;

  get hasCharm(): boolean {
    return !!this.charm;
  }

  constructor(
    private charmService: CharmsService,
    private ipService: IpService
  ) {
    this.ipService
      .getCurrentIP()
      .pipe(
        switchMap(data => {
          this.ip = data;
          return this.ipService.hasCharm(data);
        }),
        tap(_ => {
          this.charmService
            .getCharmsCount()
            .subscribe(count => (this.countCharms = count));
        })
      )
      .subscribe(data => (this.charm = data));
  }

  getCharm(event: any): void {
    event.target.disabled = true;

    this.charmService
      .getCharm(this.countCharms, this.ip)
      .pipe(
        tap(_ =>
          this.charmService
            .getCharmsCount()
            .subscribe(count => (this.countCharms = count))
        )
      )
      .subscribe(data => {
        this.charm = data.text;
        this.animationState = true;
      });
  }
}
