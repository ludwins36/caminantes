import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "src/app/services/database.service";
import { AuthService } from "src/app/services/auth.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-admin-users",
  templateUrl: "./admin-users.component.html",
  styleUrls: ["./admin-users.component.css"]
})
export class AdminUsersComponent implements OnInit {
  public listUsers: any = [];
  user: any;
  role: string;
  constructor(
    private db: DatabaseService,
    private auth: AuthService,
    private cookieService: CookieService
  ) {
    this.user = JSON.parse(this.cookieService.get("cookie-user"));
    this.role = this.cookieService.get("user-role");
  }

  validUser(user) {
    let userData = {
      email: user.data.email,
      password: user.data.temporal
    };

    this.auth.emailSignUp(userData).then(res => {
      // this.auth.SendVerificationMail();
      user.data.statusActive = true;
      this.db.updateUser(user.id, user.data);
    });
  }

  delete(user) {
    this.db.deleteUser(user);
    this.listUsers = [];
    this.ngOnInit();
  }

  async getUsers() {
    switch (this.role) {
      case "ADMIN":
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

  async ngOnInit() {
    this.getUsers();
  }
}
