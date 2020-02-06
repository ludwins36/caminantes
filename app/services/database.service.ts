import { Injectable } from "@angular/core";
// import * as firebase from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";

import { User } from "../models/user";
import { Points } from "../models/points";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { resolve } from "url";
import { Entradas } from "../models/entradas";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  nameSector: any;
  constructor(
    public db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  setNewUser(user: User) {
    return this.db.collection("users").add({
      email: user.email,
      name: user.name,
      organy: user.organization,
      type: user.type,
      role: user.roles,
      statusActive: user.statusActive,
      temporal: user.password,
      orgName : user.orgName,
      dateCreation : new Date(),
      dateModification : new Date()
    });
  }

  async getOrganysActives() {
    return await new Promise<any>(resolve => {
      this.db
        .collection("users", ref =>
          ref.where("role", "==", "ORGANY").where("statusActive", "==", true)
        )
        .snapshotChanges()
        .subscribe(points => resolve(points));
    });
  }

  async getUsersOrgany() {
    return await new Promise<any>(resolve => {
      this.db
        .collection("users", ref => ref.where("role", "==", "ORGANY"))
        .snapshotChanges()
        .subscribe(points => resolve(points));
    });
  }

  async getUsersOrganyOfOrgany(organi) {
    return await new Promise<any>(resolve => {
      this.db
        .collection("users").doc(organi)
        .snapshotChanges()
        .subscribe(points => resolve(points));
    });
  }

 

  async getUsersUser() {
    return await new Promise<any>(resolve => {
      this.db
        .collection("users", ref => ref.where("role", "==", "USER"))
        .snapshotChanges()
        .subscribe(points => resolve(points));
    });
  }

  async getUsersRoleUser(id) {
    return await new Promise<any>(resolve => {
      this.db
        .collection("users", ref => ref.where("organy", "==", id))
        .snapshotChanges()
        .subscribe(points => resolve(points));
    });
  }

  async getUserRoleUser(id) {
    return await new Promise<any>(resolve => {
      this.db
        .collection("users")
        .doc(id)
        .snapshotChanges()
        .subscribe(user => resolve(user));
    });
  }

  async getUserMail(mail) {
    return await new Promise<any>(resolve => {
      this.db
        .collection("users", ref => ref.where("email", "==", mail))
        .snapshotChanges()
        .subscribe(varl => resolve(varl));
    });
  }


  setAlert(poin : Points){
   
    this.db.collection("alerts").add({
      departamento : poin.ubication.departamento,
      descrp : this.nameSector,
      propietario: poin.propietario,
      capacidad: poin.capacidad,
      isActive : poin.active,
      // organy : poin.orgName,
      dateCreation : new Date(),
      dateModification : new Date()
    });
  }

  setNewPoint(poin: Points) {
    let sectores = this.getSectores(poin.sectores.sector);
    if (sectores.length > 1) {
      poin.multisector = true;
    }
    console.log(poin.ubication.lat);
    console.log(poin.ubication.lnt);

    let grupos =  this.getGrupos(poin.grupo.grupos);

    this.setAlert(poin);

    return this.db.collection("points").add({
      ubication: {
        departamento: poin.ubication.departamento,
        municipio: poin.ubication.municipio,
        iterante: poin.ubication.iterante, 
        fechaInit: poin.ubication.fechaInit.valueOf(),
        fechaFin: poin.ubication.fechaFin.valueOf(),
        address: poin.ubication.address,
        lat: poin.ubication.lat,
        lnt: poin.ubication.lnt
      },
      contact : {
        name : poin.contact.name,
        telefono : poin.contact.telefono,
        email : poin.contact.email
      },
      title : poin.title,
      desc : poin.desc,
      oferta : poin.oferta,
      grupos : grupos,
      borrador : poin.borrador,
      sectores: sectores,
      // orgName: poin.orgName,
      organizacion: poin.organizacion,
      propietario: poin.propietario,
      capacidad: poin.capacidad,
      horarys: this.getHorarys(poin.horarys.dias),
      img: poin.img,
      multisector: poin.multisector,
      active: poin.active,
      dateCreation : Date.now(),
      dateModification :Date.now()
    });
  }

  setNewPost(post: Entradas) {
    return this.db.collection("posts").add({
      title: post.title,
      text: post.text,
      descrip: post.descp,
      category: post.category,
      img: post.img,
      propietario : post.propietrio,
      organizacion : post.organy,
      dateCreation : new Date(),
      dateModification : new Date()
    });
  }

  setImg(file) {
    // Generate a random ID
    const randomId = Math.random()
      .toString(36)
      .substring(2);
    const filepath = `images/${randomId}`;

    const fileRef = this.storage.ref(filepath);

    // Upload image
    return new Promise(resolve => {
      this.storage
        .upload(filepath, file)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => resolve(url));
          })
        )
        .subscribe();
    });
  }

  private getGrupos(grupos) {
    let data = [];
    for (let index = 0; index < grupos.length; index++) {
      if (grupos[index].grupo) {
        if(!this.nameSector){
            this.nameSector =  grupos[index].name;
        }
        let dato = {
          sector: grupos[index].name
        };
        data.push(dato);
      }
    }

    return data;
  }

  private getSectores(sectores) {
    let data = [];
    for (let index = 0; index < sectores.length; index++) {
      if (sectores[index].sector) {
        if(!this.nameSector){
            this.nameSector =  sectores[index].name;
        }
        let dato = {
          sector: sectores[index].name,
          desp: sectores[index].desp
        };
        data.push(dato);
      }
    }

    return data;
  }

  private getHorarys(horarys) {
    let data = [];
    for (let index = 0; index < horarys.length; index++) {
      let dato = {
        dia: horarys[index].name,
        horaInic: horarys[index].HoraInit,
        horaFin: horarys[index].HoraFin
      };
      data.push(dato);
    }

    return data;
  }

  async check(user: string) {
    return await this.db
      .collection("users", ref => ref.where("email", "==", user))
      .valueChanges();
  }

  async getAllPoins() {
    return await new Promise<any>(resolve => {
      this.db
        .collection("points")
        .snapshotChanges()
        .subscribe(points => resolve(points));
    });
  }

  async getPoinsOfOrgany(organy) {
    return await new Promise<any>(resolve => {
      this.db
        .collection("points", ref => ref.where("organy", "==", organy))
        .snapshotChanges()
        .subscribe(points => resolve(points));
    });
  }

  async getPoinsOfPropietario(propietario) {
    return await new Promise<any>(resolve => {
      this.db
        .collection("points", ref => ref.where("propietario", "==", propietario))
        .snapshotChanges()
        .subscribe(points => resolve(points));
    });
  }

  async getAllPostValues() {
    return await new Promise<any>(resolve => {
      this.db
        .collection("posts")
        .valueChanges()
        .subscribe(post => resolve(post));
    });
  }

  async getAllPoinsValues() {
    return await new Promise<any>(resolve => {
      this.db
        .collection("points")
        .valueChanges()
        .subscribe(points => resolve(points));
    });
  }

  async updateUser(user, data) {
    this.db
      .collection("users")
      .doc(user)
      .set(data);
  }

  async deleteUser(user) {
    this.db
      .collection("users")
      .doc(user)
      .delete();
  }

  async deletePoint(point) {
    this.db
      .collection("points")
      .doc(point)
      .delete();
  }
}
