import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Globals } from 'src/app/common-utils/globals';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './common-utils/auth/auth.guard';
import { LoaderComponent } from './common-utils/common-component/loader/loader.component';
import { PrintErrorComponent } from './common-utils/common-component/print-error/print-error.component';
import { TostrComponent } from './common-utils/common-component/tostr/tostr.component';
import { CookieService } from './common-utils/common-services/cookie.service';
import { HttpService } from './common-utils/common-services/http.service';
import { InterceptorService } from './common-utils/common-services/interceptor.service';
import { LoaderService } from './common-utils/common-services/LoaderService';
import { MaterialModule } from './common-utils/common-services/merterial.module';
import { SendBackModelService } from './common-utils/common-services/SendBackModelService';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { SettingsComponent } from './component/settings/settings.component';
import { SignupComponent } from './component/signup/signup.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ButtonComponent } from './component/controls/button/button.component';
import { CheckboxComponent } from './component/controls/checkbox/checkbox.component';
import { DateComponent } from './component/controls/date/date.component';
import { DynamicFieldDirective } from './component/controls/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './component/controls/dynamic-form/dynamic-form.component';
import { InputComponent } from './component/controls/input/input.component';
import { RadiobuttonComponent } from './component/controls/radiobutton/radiobutton.component';
import { SelectComponent } from './component/controls/select/select.component';
import { DocumentationComponent } from './component/documentation/documentation.component';
import { DrawerMenuDirective } from './directives/drawer-menu.directive';
import { DrawerMenuComponent } from './component/common/drawer-menu/drawer-menu.component';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { CreditRatingComponent } from './component/apis/credit-rating/credit-rating.component';
import { CustomErrorStateMatcherComponent } from './component/custom-error-state-matcher/custom-error-state-matcher.component';
import { ActivityLogsComponent } from './component/activity-logs/activity-logs.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ApiAccessKeyComponent } from './component/api-access-key/api-access-key.component';
import { ApiCreditComponent } from './component/api-credit/api-credit.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { TreeGridTableComponent } from './component/controls/tree-grid-table/tree-grid-table.component';
import { TreeGridTableDirective } from './directives/tree-grid-table.directive';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    Ng5SliderModule,
    NgApexchartsModule,
    HighchartsChartModule,
    ClipboardModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SettingsComponent,
    TostrComponent,
    NavbarComponent,
    LoaderComponent,
    SignupComponent,
    PrintErrorComponent,
    ResetPasswordComponent,
    ButtonComponent,
    CheckboxComponent,
    DateComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    InputComponent,
    RadiobuttonComponent,
    SelectComponent,
    DocumentationComponent,
    DrawerMenuDirective,
    DrawerMenuComponent,
    CreditRatingComponent,
    CustomErrorStateMatcherComponent,
    ActivityLogsComponent,
    ProfileComponent,
    ApiAccessKeyComponent,
    ApiCreditComponent,
    TreeGridTableComponent,
    TreeGridTableDirective,
  ] ,
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
              LoaderService,
              HttpService,
              AuthGuard,
              CookieService,
              SendBackModelService,
              Globals],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
