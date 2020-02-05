import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-admin-nav",
  templateUrl: "./main-admin-nav.component.html",
  styleUrls: ["./main-admin-nav.component.css"]
})
export class MainAdminNavComponent {
  name: any = "ESTADISTICAS";
  content: Number = 1;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cookieService: CookieService,
    private router: Router
  ) {}

  setTitle(name, page) {
    this.name = name;
    this.content = page;
  }

  logaut() {
    this.cookieService.delete("cookie-user");
    this.router.navigateByUrl("");
  }
}
