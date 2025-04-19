import { Component, ContentChild, Input, OnInit, TemplateRef } from "@angular/core";
import { tap } from "rxjs";
import { LoadingService } from "../services/loading.service";
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from "@angular/router";

@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.css"],
  standalone: false
})
export class LoadingSpinnerComponent implements OnInit {
  @Input()
  detectRouteTransitions = false;

  @ContentChild("loading")
  customLoadingIndicator: TemplateRef<any> | null = null;

  loading: boolean = true;

  constructor(
    private loadingService: LoadingService,
    private router: Router) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe(x => {
      this.loading = x;
    })

    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }
}
