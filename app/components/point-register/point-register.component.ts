import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter
} from "@angular/core";
import { Points } from "src/app/models/points";
import { FormBuilder, Validators } from "@angular/forms";
import { PostService } from "src/app/services/post.service";
import { DatabaseService } from "src/app/services/database.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-point-register",
  templateUrl: "./point-register.component.html",
  styleUrls: ["./point-register.component.css"]
})
export class PointRegisterComponent implements AfterViewInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  @ViewChild("address", { static: false }) address: ElementRef;
  @Output() change: EventEmitter<File> = new EventEmitter<File>();
  map: google.maps.Map;
  auto: google.maps.places.Autocomplete;
  lat = 4.6311106;
  lng = -73.805329;
  time: any;
  src: any;
  file: any;
  capacidad: any;
  overlay: any = false;
  user: any;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
  };

  marker: any;

  points: Points = new Points();
  public listData: any = [];
  public listDays: any = [];
  public listCitys;
  public ubicationForm;
  URLPublica: any;
  constructor(
    public formBuilder: FormBuilder,
    public service: PostService,
    private db: DatabaseService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.ubicationForm = formBuilder.group({
      depart: ["", Validators.compose([Validators.required])],
      city: ["", Validators.compose([Validators.required])],
      title: ["", Validators.compose([Validators.required])],
      desc: ["", Validators.compose([Validators.required])],
      address: ["", Validators.compose([Validators.required])],
      iterante: ["", Validators.compose([Validators.required])],
      fechaInit: ["", Validators.compose([Validators.required])],
      fechaFin: ["", Validators.compose([Validators.required])],
      sector: [false, Validators.compose([Validators.pattern("true")])],
      grupo: [false, Validators.compose([Validators.pattern("true")])],
      capacidad: ["", Validators.compose([Validators.required])],
      oferta: ["", Validators.compose([Validators.required])],
      horaInic: ["", Validators.compose([Validators.required])],
      name: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required])],
      telefono : ["", Validators.compose([Validators.required])],
      horaFin: ["", Validators.compose([Validators.required])]
    });

    this.user = JSON.parse(this.cookieService.get("cookie-user"));
    console.log(this.user);
  }

  ngAfterViewInit() {
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    this.mapInitializer();
    this.service.getDepartaments().subscribe(dat => {
      this.listData = dat;
    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    let directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      suppressMarkers: true
    });

   
   
    this.map.addListener('click', data => {
      console.log(data.latLng.lat());
      this.setMarkertMAp(data.latLng);
      this.points.ubication.lat = data.latLng.lat();
      this.points.ubication.lnt = data.latLng.lng();
    })

    
    

    this.auto = new google.maps.places.Autocomplete(this.address.nativeElement);
    this.auto.addListener("place_changed", event => {
      this.points.ubication.address = this.address.nativeElement.value;
      this.setAddress();
    });
  }

  

  setMarkertMAp(coor) {
    if (this.marker != undefined) {
      this.marker.setMap(null);
    }

    this.marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      position: coor,
      title: "Su posición"
    });

    this.marker.addListener('dragend', event => {
      // this.points.ubication.latLnt = event.latLng;
      this.points.ubication.lat = event.latLng.lat();
      this.points.ubication.lnt = event.latLng.lng();
    })

    this.map.setCenter(coor);
    this.marker.setMap(this.map);
  }

  async setAddress() {
    window.clearTimeout(this.time);
    this.time = window.setTimeout(async () => {
      (
        await this.service.getCoordinatesAddress(this.points.ubication.address)
      ).subscribe(coor => {
        if (coor.results.length == 0) {
          return;
        }

        // this.points.ubication.lat = a.lat;
        // this.points.ubication.lnt = a.lng;
        // let coorMarkert = new google.maps.LatLng(
        //   parseFloat(a.lat),
        //   parseFloat(a.lng)
        // );

        // this.setMarkertMAp(coorMarkert);
      });
    }, 3000);
  }

  cambioArchivo(event) {
    this.file = event.target.files[0];
    this.projectImage(this.file);
  }

  projectImage(file: File) {
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.src = e.target.result;
      this.change.emit(file);
    };
    reader.readAsDataURL(file);
  }

  async registerPoint(status) {
    this.overlay = true;
    console.log(this.points);

    if (this.ubicationForm.valid) {
      if (this.file) {
        this.db.setImg(this.file).then(url => {
          this.points.img = String(url);
          this.points.propietario = this.user.id;
          this.points.borrador = status;
          this.points.orgName = this.user.data.orgName;
          if (this.user.data.organy == "NULL") {
            this.points.organizacion = this.user.id;
          } else {
            this.points.organizacion = this.user.data.organy;
          }

          this.db.setNewPoint(this.points).then(() => {
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

      // this.points.ubication = this.ubication;
      // this.poi
    } else {
      this.overlay = false;
    }
  }

  onChange(value) {
    this.listCitys = [];
    this.listData.forEach(dat => {
      if (dat.departamento == value) {
        this.listCitys = dat.ciudades;
      }
    });
  }
}
