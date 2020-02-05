import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { DatabaseService } from "src/app/services/database.service";
import { Sectores } from 'src/app/models/sectores';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements AfterViewInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  @ViewChild("drawer", { static: false }) snav: any;
  map: google.maps.Map;
  lat = 4.6311106;
  lng = -73.805329;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isHandsetInfo$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  coordinates = new google.maps.LatLng(this.lat, this.lng);
  listPoints: any = [];
  infoPoint: any = false;
  listSectores : Sectores = new Sectores();
  point: any;
  today: any;
  options = { autoHide: false, scrollbarMinSize: 100 };
  baseUri: any = "../../../assets/img/icons/";
  city: any;
  tipe: any;
  cityLabel: any = "UBICACIÓN";
  tipeLabel: any = "TIPO DE AYUDA";
  isMap : boolean = true;
  isBlog : boolean = false;

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 7
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: "Hello World!"
  });
  listData: Object;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private db: DatabaseService,
    private service : PostService
  ) {
    this.db.getAllPoinsValues().then(points => {
      points.forEach(point => {
        this.setMarkertMAp(point);
      });
    });

    this.matIconRegistry.addSvgIcon(
      "list",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../../assets/img/icons/blog.svg"
      )
    );
    const dias = [
      "",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo"
    ];

    this.service.getDepartaments().subscribe(dat => {
      this.listData = dat;
    });


    let date = new Date();
    this.today = dias[date.getUTCDay()];
    console.log(dias[date.getUTCDay()]);
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.map.addListener("click", () => {
      // this.infoPoint = false;
    });
    // this.marker.setMap(this.map);
  }

  setMarkertMAp(point) {
    console.log(point);  
    let image = {
      url: this.baseUri + "Ubicación Todos.png",
      size: new google.maps.Size(90, 100),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(50, 50)
    };

    let coor = new google.maps.LatLng(point.ubication.lat, point.ubication.lnt);

    let marker = new google.maps.Marker({
      map: this.map,
      draggable: false,
      icon: image,
      position: coor
    });

    marker.addListener("click", () => {
      this.snav.toggle();
      this.point = point;
      this.infoPoint = true;
    });
    marker.setMap(this.map);
  }

  showBlog(){
    if(this.isBlog){
      this.isBlog = false;
      jQuery('#map').show();
      // this.isMap = true;
    }else{
      this.isBlog = true;
      jQuery('#map').hide();

      // this.isMap = false;
    }

  }

  toggle() {
    this.snav.toggle();

    this.infoPoint = false;
  }

  setCity(city){
    this.cityLabel = city.target.textContent;
    this.city = city.target.textContent;
  }

  setTipe(tipe){
    this.tipeLabel = tipe.target.textContent;
    this.tipe = tipe.target.textContent;
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  getPointsCustoms(){

    console.log(this.city);
    console.log(this.tipe);

  }
}
