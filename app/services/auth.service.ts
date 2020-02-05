import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public isLoggerd: any = false;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => (this.isLoggerd = user));
  }

  async login(user: User) {
    return await this.afAuth.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
  }
  
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(data => {
      console.log(data);
      
    })
  }

  emailSignUp(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }
}
