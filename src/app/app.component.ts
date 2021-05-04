import { Component, enableProdMode } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { LoaderService } from './common-utils/common-services/LoaderService';
import { Title } from '@angular/platform-browser';

enableProdMode();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Online PSB loans Sandbox';

  

  constructor(private router: Router, private loaderService: LoaderService, private titleService: Title,
              private activatedRoute: ActivatedRoute) {
    // For state change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show(); // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.loaderService.hide(); // Hide loading indicator
        // this.wowService.init();
      }

      if (event instanceof NavigationError) {
        this.loaderService.hide(); // Hide loading indicator on error
      }
    });

  }

}
