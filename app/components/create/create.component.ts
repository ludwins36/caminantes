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
  user: any;
  config = { toolbar: ['bold', 'italic', { list: 'bullet' }, 'blockquote', { align: [] }, { font: [] }] };

  qEStyles = {
    height: '200px',
    backgroundColor: 'white'
}


constructor(
  public formBuilder: FormBuilder,
  private db: DatabaseService,
  private router: Router,
  private cookieService: CookieService
) {
  this.entradaForm = formBuilder.group({
    title: ['', [Validators.required]],
    category: ['', [Validators.required]],
    descp: ['', [Validators.required]],
    text: ['', Validators.required]
  });

  this.user = JSON.parse(this.cookieService.get("cookie-user"));
}

cambioArchivo(event) {
  this.file = event.target.files[0];
}

public() {

  if (this.entradaForm.valid) {
    this.createModel = this.entradaForm.value;
    console.log(this.createModel);
    
    this.overlay = true;
    if (this.file) {
      this.createModel.propietrio = this.user.id;
      if (this.user.data.organy == "NULL") {
        this.createModel.organy = this.user.id;

      } else {
        this.createModel.organy = this.user.data.organy;
      }
      this.db.setImg(this.file).then(url => {
        this.createModel.img = String(url);
        this.db.setNewPost(this.createModel /* Pasar el */).then(() => {
          location.reload();
          this.overlay = false;
          this.router.navigate(["/admin"]);
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
