import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './common-utils/auth/auth.guard';
import { LoaderComponent } from './common-utils/common-component/loader/loader.component';
import { CookieService } from './common-utils/common-services/cookie.service';
import { HttpService } from './common-utils/common-services/http.service';
import { InterceptorService } from './common-utils/common-services/interceptor.service';
import { LoaderService } from './common-utils/common-services/LoaderService';
import { MaterialModule } from './common-utils/common-services/merterial.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ProductsComponent } from './component/products/product-list/products.component';
import { AddParameterPopupComponent } from './component/products/product/add-parameter-popup/add-parameter-popup.component';
import { ImportParameterPopupComponent } from './component/products/product/import-parameter-popup/import-parameter-popup.component';
import { ProductComponent } from './component/products/product/product/product.component';
import { EblrpopupComponent } from './component/settings/eblrpopup/eblrpopup.component';
import { SettingsComponent } from './component/settings/settings.component';
import { SignupComponent } from './component/signup/signup.component';
import { ProductViewComponent } from './component/products/product/product-view/product-view.component';
import { ConfirmationPopupComponent } from './component/products/product/confirmation-popup/confirmation-popup.component';
import { SendBackModelComponent } from './common-utils/common-component/send-back-model/send-back-model.component';
import { SendBackModelService } from './common-utils/common-services/SendBackModelService';
import { TostrComponent } from './common-utils/common-component/tostr/tostr.component';
import { Globals } from 'src/app/common-utils/globals';
import { PrintErrorComponent } from './common-utils/common-component/print-error/print-error.component';


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
    ImportParameterPopupComponent,
    AddParameterPopupComponent,
    ProductViewComponent,
    ConfirmationPopupComponent,
    SendBackModelComponent,
    PrintErrorComponent,
  ],
  imports: [
    ReactiveFormsModule,
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
              CookieService,
              SendBackModelService,
              Globals],
  bootstrap: [AppComponent],
  entryComponents: [EblrpopupComponent, ImportParameterPopupComponent, AddParameterPopupComponent]
})
export class AppModule { }
