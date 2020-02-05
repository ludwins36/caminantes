import { Component, OnInit } from "@angular/core";
import { Entradas } from "src/app/models/entradas";
import { FormBuilder, Validators } from "@angular/forms";
import { DatabaseService } from "src/app/services/database.service";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  public entradaForm;
  createModel: Entradas = new Entradas();
  file: File;
  overlay: boolean = false;
  user : any;

  constructor(
    public formBuilder: FormBuilder,
    private db: DatabaseService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.entradaForm = formBuilder.group({
      title: ["", Validators.compose([Validators.required])],
      category: ["", Validators.compose([Validators.required])],
      resumen: ["", Validators.compose([Validators.required])],
    });

    this.user = JSON.parse(this.cookieService.get("cookie-user"));
  }

  cambioArchivo(event) {
    this.file = event.target.files[0];
  }

  public() {
    if (this.entradaForm.valid) {
      this.overlay = true;
      if (this.file) {
        this.createModel.propietrio = this.user.id;
        if(this.user.data.organy == "NULL"){
          this.createModel.organy = this.user.id; 

        }else{
          this.createModel.organy = this.user.data.organy;
        }
        this.db.setImg(this.file).then(url => {
          this.createModel.img = String(url);
          this.db.setNewPost(this.createModel).then(() => {
            location.reload();
            this.overlay = false;
            this.router.navigateByUrl("/admin");
          });
        });
      } else {
        this.overlay = false;
        alert("Debe colocar una imagen");
        return;
      }
    }
  }

  ngOnInit() {
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
   

    
  }
}
