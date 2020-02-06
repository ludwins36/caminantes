import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDialogModule } from "@angular/material/dialog";
import {
  MatRadioModule,
  MAT_RADIO_DEFAULT_OPTIONS
} from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material";
import { FooterComponent } from "./components/footer/footer.component";
import { RegistryComponent } from "./components/registry/registry.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { ConfirmedComponent } from "./components/confirmed/confirmed.component";
import { FooterAdminComponent } from "./components/footer-admin/footer-admin.component";
import { AdminComponent } from "./components/admin/admin.component";

import { CookieService } from "ngx-cookie-service";
import { AdminNavComponent } from "./components/admin-nav/admin-nav.component";
import { EstadisticasComponent } from "./components/estadisticas/estadisticas.component";
import { PostComponent } from "./components/post/post.component";
import { AlertsComponent } from "./components/alerts/alerts.component";
import { PointsComponent } from "./components/points/points.component";
import { PointRegisterComponent } from "./components/point-register/point-register.component";
import { CreateComponent } from "./components/create/create.component";
import { AdminNavbarComponent } from "./components/admin-navbar/admin-navbar.component";
import { MainAdminNavComponent } from "./components/main-admin-nav/main-admin-nav.component";
import { AdminProfileComponent } from "./components/admin-profile/admin-profile.component";
import { HttpClientModule } from "@angular/common/http";
import { MainHomeNavComponent } from "./main-home-nav/main-home-nav.component";

import { MaterialModule } from "./modules/material/material.module";
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { FilterComponent } from './components/filter/filter.component';

import { SimplebarAngularModule } from 'simplebar-angular';

import { EntradasComponent } from './components/entradas/entradas.component';
import { BlogComponent } from './components/blog/blog.component';
import { AvatarModule } from 'ngx-avatar';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminPointsComponent } from './components/admin-points/admin-points.component';
import { NotifiComponent } from './components/notifi/notifi.component';
import { FilterHomeComponent } from './components/filter-home/filter-home.component';
// import { NgxEditorModule } from 'ngx-editor';
import {QuillModule} from 'ngx-quill';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    RegistryComponent,
    ConfirmedComponent,
    FooterAdminComponent,
    AdminComponent,
    AdminNavComponent,
    EstadisticasComponent,
    PostComponent,
    AlertsComponent,
    PointsComponent,
    PointRegisterComponent,
    CreateComponent,
    AdminNavbarComponent,
    MainAdminNavComponent,
    AdminProfileComponent,
    MainHomeNavComponent,
    SpinnerOverlayComponent,
    FilterComponent,
    EntradasComponent,
    BlogComponent,
    AdminUsersComponent,
    AdminPointsComponent,
    NotifiComponent,
    FilterHomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    ReactiveFormsModule,
    AvatarModule,
    MatSidenavModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    SimplebarAngularModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    AngularFirestoreModule,
    HttpClientModule,
    MatExpansionModule,
    AngularFireStorageModule,
    // NgxEditorModule,
    QuillModule.forRoot({}),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule
  ],
  providers: [
    {
      provide: StorageBucket,
      useValue: "gs://app-test-887b9.appspot.com"
    },
    // {
    //   provide: MAT_RADIO_DEFAULT_OPTIONS,
    //   useValue: { color: 'blue' }
    // },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
