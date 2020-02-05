import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "src/app/services/database.service";
import { AuthService } from "src/app/services/auth.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-admin-points",
  templateUrl: "./admin-points.component.html",
  styleUrls: ["./admin-points.component.css"]
})
export class AdminPointsComponent implements OnInit {
  listOrganys: any = [];
  listUsers: any = [];
  overlay: any = false;
  user: any;
  role: any;
  constructor(
    private db: DatabaseService,
    private cookieService: CookieService,
    private auth: AuthService
  ) {
    this.user = JSON.parse(this.cookieService.get("cookie-user"));
    this.role = this.cookieService.get("user-role");
  }

  async ngOnInit() {
    this.getOrganizaciones();
  }

  async getOrganizaciones() {
    switch (this.role) {
      case "ADMIN":
        this.overlay = true;

        this.db
          .getUsersOrgany()
          .then<any>(points => {
            points.forEach(point => {
              let data = {
                id: point.payload.doc.id,
                data: point.payload.doc.data()
              };
              this.listOrganys.push(data);
              this.overlay = false;
            });
          })
          .catch(() => (this.overlay = false));

        await this.db.getUsersUser().then<any>(users => {
          users.forEach(user => {
            let u = {
              id: user.payload.doc.id,
              data: user.payload.doc.data()
            };
            this.listUsers.push(u);
          });
        });
        break;
      case "ORGANY":
        this.overlay = true;
        this.db
          .getUsersOrganyOfOrgany(this.user.id)
          .then(point => {
            let data = {
              id: point.payload.id,
              data: point.payload.data()
            };
            this.listOrganys.push(data);

            this.overlay = false;
          })
          .catch(() => (this.overlay = false));

        await this.db.getUsersRoleUser(this.user.id).then(users => {
          users.forEach(user => {
            let u = {
              id: user.payload.doc.id,
              data: user.payload.doc.data()
            };
            this.listUsers.push(u);
          });
        });
        break;
      case "USER":
        this.overlay = true;

        this.db
          .getUsersOrganyOfOrgany(this.user.data.organy)
          .then(point => {
            let data = {
              id: point.payload.id,
              data: point.payload.data()
            };
            this.listOrganys.push(data);

            this.overlay = false;
          })
          .catch(() => (this.overlay = false));

        await this.db.getUserRoleUser(this.user.id).then(user => {
          let u = {
            id: user.payload.doc.id,
            data: user.payload.doc.data()
          };
          this.listUsers.push(u);
        });

        break;
    }
  }

  validUser(user) {
    let userData = {
      email: user.data.email,
      password: user.data.temporal
    };

    this.auth.emailSignUp(userData).then(res => {
      // this.auth.SendVerificationMail();
      user.data.statusActive = true;
      console.log(user.data);
      this.db.updateUser(user.id, user.data);
    });
  }

  deleteOrgany(id) {
    console.log(id);

    let opcion = confirm(
      "atencion: si borra esta organización. se borraran todos los usuarios asociados a ella."
    );
    if (opcion) {
      console.log(this.listUsers);
      this.listUsers.forEach(user => {
        if (user.data.name == id.data.name) {
          this.db.deleteUser(user.id).then(res => console.log(res));
        }
      });

      this.db.deleteUser(id.id).then(res => {
        // guardar evento
        this.listOrganys = [];
        this.listUsers = [];

        this.ngOnInit();
      });
    }
  }

  delete(id) {
    console.log(id);
  }
}
