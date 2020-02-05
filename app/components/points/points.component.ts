import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "src/app/services/database.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-points",
  templateUrl: "./points.component.html",
  styleUrls: ["./points.component.css"]
})
export class PointsComponent implements OnInit {
  overlay: any = false;

  private listPoins: any = [];
  user: any;
  role: string;
  constructor(
    private db: DatabaseService,
    private cookieService: CookieService
  ) {
    this.user = JSON.parse(this.cookieService.get("cookie-user"));
    this.role = this.cookieService.get("user-role");
  }

  ngOnInit() {
    this.getPoinstofRole();
  }

  getPoinstofRole() {
    switch (this.role) {
      case "ADMIN":
        this.overlay = true;

        this.db.getAllPoins().then<any>(points => {
          // this.listPoins = points;
          points.forEach(point => {
            let data = {
              id: point.payload.doc.id,
              data: point.payload.doc.data()
            };
            this.listPoins.push(data);
          });
        });
        this.overlay = false;
      break;

      case "ORGANY":
        this.db.getPoinsOfOrgany(this.user.id).then<any>(points => {
          // this.listPoins = points;
          points.forEach(point => {
            let data = {
              id: point.payload.doc.id,
              data: point.payload.doc.data()
            };
            this.listPoins.push(data);
          });
        });
        this.overlay = false;

        break;
        case "USER":
          this.db.getPoinsOfPropietario(this.user.id).then<any>(points => {
            // this.listPoins = points;
            points.forEach(point => {
              let data = {
                id: point.payload.doc.id,
                data: point.payload.doc.data()
              };
              this.listPoins.push(data);
            });
          });
          this.overlay = false;
  
          break;

        
    }
  }

  delete(point) {
    this.overlay = true;
    this.db
      .deletePoint(point.id)
      .then(() => {
        this.overlay = false;
        this.listPoins = [];
        this.ngOnInit();
      })
      .catch(err => {
        console.log(err);
        this.overlay = false;
      });
  }
}
