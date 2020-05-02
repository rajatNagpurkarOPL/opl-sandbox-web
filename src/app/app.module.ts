import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProductsComponent } from './component/products/products.component';
import { SettingsComponent } from './component/settings/settings.component';
import { TostrComponent } from './common-utils/Common-Component/tostr/tostr.component';
import { MaterialModule } from './common-utils/common-services/merterial.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './common-utils/common-services/http.service';
import { LoaderService } from './common-utils/common-services/LoaderService';
import { AuthGuard } from './common-utils/auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductsComponent,
    SettingsComponent,
    TostrComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService, LoaderService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
