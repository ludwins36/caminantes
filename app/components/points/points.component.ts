import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "src/app/services/database.service";
import { CookieService } from "ngx-cookie-service";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-points",
  templateUrl: "./points.component.html",
  styleUrls: ["./points.component.css"]
})
export class PointsComponent implements OnInit {
  overlay: any = false;
  public listData: any = [];
  private listPoins: any = [];
  user: any;
  role: string;
  constructor(
    private db: DatabaseService,
    public service: PostService,
    private cookieService: CookieService
  ) {
    this.user = JSON.parse(this.cookieService.get("cookie-user"));
    this.role = this.cookieService.get("user-role");
  }

  ngOnInit() {
    this.getPoinstofRole();
    this.service.getDepartaments().subscribe(dat => {
      this.listData = dat;
    });
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
          console.log(this.listPoins);
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

  dateCreation(time) {
    // console.log(new Date(time.seconds));
    console.log(new Date(Date.now()));
    // console.log(new Date(time.nanoseconds));
    let da = time.seconds * time.nanoseconds;
    let d2 = time.seconds + Date.now();
    const monst = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Marzp",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];
    let date = new Date(time.seconds + time.nanoseconds);
    let label = monst[date.getMonth() + 1] + ' ' + String(date.getDay()) + ' de ' + date.getFullYear();
    return label;
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
