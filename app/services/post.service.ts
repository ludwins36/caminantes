import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Components } from '../models/components';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  key : string = "AIzaSyBJLScQ4xCio9uSk9e0m95t7gbkq6FeIkY";
 

  constructor( private http: HttpClient) { }

  getDepartaments(){
    return this.http.get("/assets/data/colombia.json");
  }

  getDiasSemana(){
    return this.http.get("/assets/data/semana.json");
  }

  getSectores(){
    return this.http.get("/assets/data/sectores.json");
  }


  async getCoordinatesAddress(address : string){
    let filename =
			"https://maps.googleapis.com/maps/api/geocode/json?key=" +
			this.key +
			"&address=" +
			encodeURI(address) +
      "&sensor=false";
      

    return await this.http.get<any>(filename);
  }
}
