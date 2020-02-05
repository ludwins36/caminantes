import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { DatabaseService } from "src/app/services/database.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-registry",
  templateUrl: "./registry.component.html",
  styleUrls: ["./registry.component.css"]
})
export class RegistryComponent implements OnInit {
  public registerForm;
  public loginForm;
  selectType: any;
  user: User = new User();
  organy: User = new User();
  isRegister: boolean = false;
  isLogin: boolean = false;
  public listOrganys: any = [];

  constructor(
    public formBuilder: FormBuilder,
    private authSvc: AuthService,
    public data: DatabaseService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.registerForm = formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      name: [
        "",
        Validators.compose([Validators.minLength(3), Validators.required])
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ],
      type: ["", Validators.compose([Validators.required])],
      organizationName: ["", Validators.compose([])],
      organization: []
    });

    this.loginForm = formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });
  }

  ngOnInit() {
    this.data.getOrganysActives().then<any>(data => {
      data.forEach(point => {
        let dat = {
          id: point.payload.doc.id,
          data: point.payload.doc.data()
        };
        this.listOrganys.push(dat);
      });
    });
  }

  async registerUser() {

    if (this.registerForm.valid) {
      this.isRegister = true;
      if (this.organy.type > 0) {
        if (!this.organy.organization) {
          alert("debe escoger una organizacion ");
          return;
        }

        this.organy.roles = "USER";
      } else {
        this.organy.orgName = this.organy.name;
        this.organy.organization = "NULL";
        this.organy.roles = "ORGANY";
      }

      (await this.data.check(this.organy.email)).subscribe(dat => {
        if (dat.length > 0) {
          this.isRegister = false;

          // alert('Ya existe una cuenta a su cuenta de correo.');
        } else {
          this.organy.statusActive = false;
          this.data
            .setNewUser(this.organy)
            .then(rest => {
              
              this.router.navigateByUrl("confirm");
              this.isRegister = false;
            })
            .catch(err => {
              console.log("error");
            });
        }
      });
    }
  }

  setId(event){
    this.listOrganys.forEach(org => {
      if(event.value === org.id){
        this.organy.orgName = org.data.name;
        console.log(org);
        
      }
    });
  }

  async login() {
    if (this.loginForm.valid) {
      this.isLogin = true;
      await this.authSvc
        .login(this.user)
        .then(authData => {
          this.isLogin = false;
          this.data
            .getUserMail(authData.user.email)
            .then(rest => {
              if (rest.length > 0) {
                rest.forEach(user => {
                  let u = {
                    id: user.payload.doc.id,
                    data: user.payload.doc.data()
                  };
                  this.cookieService.set("cookie-user", JSON.stringify(u));
                  this.cookieService.set("user-role", user.payload.doc.data().role);

                });
                this.isLogin = false;
                this.router.navigateByUrl("admin");
              } else {
                // eliminar user
              }
            })
            .catch(err => {
              this.isLogin = false;
            });
        })
        .catch(err => {
          this.isLogin = false;

          alert("Error: Usuario o Contraseña invalidos");
        });
    }
  }
}
