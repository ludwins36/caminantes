import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  private cookieUser: string;
  user : any;
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit() {
    if (this.cookieService.check("cookie-user")) {
      this.user = JSON.parse(this.cookieService.get("cookie-user"));
      let role = this.cookieService.get("user-role");
      console.log(this.user);
      console.log(role);
    } else {
      this.router.navigateByUrl("registro");
    }
  }
}
