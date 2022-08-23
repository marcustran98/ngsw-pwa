import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  private readonly TIMEOUT = 1000;

  constructor(private swUpdate: SwUpdate) {

  }

  ngOnInit(): void {
    console.log("%c mode", "color:blue;font-size:20px", environment.production);
    this.checkForUpdates();
  }

  checkForUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map(evt => ({
          type: 'UPDATE_AVAILABLE',
          current: evt.currentVersion,
          available: evt.latestVersion,
        }))).subscribe((res) => {
          console.log(">>>> res", res);
          if (confirm("New version available. Load New Version?")) {
            window.location.reload();
          }
        });
    }
  }
}
