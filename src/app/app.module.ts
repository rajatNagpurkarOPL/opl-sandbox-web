import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './common-utils/auth/auth.guard';
import { TostrComponent } from './common-utils/Common-Component/tostr/tostr.component';
import { HttpService } from './common-utils/common-services/http.service';
import { MaterialModule } from './common-utils/common-services/merterial.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ProductsComponent } from './component/products/product-list/products.component';
import { SettingsComponent } from './component/settings/settings.component';
import { LoaderService } from './common-utils/common-services/LoaderService';
import { InterceptorService } from './common-utils/common-services/interceptor.service';
import { LoaderComponent } from './common-utils/common-component/loader/loader.component';
import { CookieService } from './common-utils/common-services/cookie.service';
import { ProductComponent } from './component/products/product/product/product.component';
import { SignupComponent } from './component/signup/signup.component';
import { EblrpopupComponent } from './component/settings/eblrpopup/eblrpopup.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductsComponent,
    SettingsComponent,
    TostrComponent,
    NavbarComponent,
    LoaderComponent,
    ProductComponent,
    SignupComponent,
    EblrpopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
              LoaderService,
              HttpService,
              AuthGuard,
              CookieService],
  bootstrap: [AppComponent],
  entryComponents: [EblrpopupComponent]
})
export class AppModule { }
