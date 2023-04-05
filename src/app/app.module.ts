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
import { PanStatusCheckComponent } from './component/apis/pan-status-check/pan-status-check.component';
import { BankAccountVerificationComponent } from './component/apis/bank-account-verification/bank-account-verification.component';
import { UdhyamRegDetailComponent } from './component/apis/udhyam-reg-detail/udhyam-reg-detail.component';
import { CustomErrorStateMatcherComponent } from './component/custom-error-state-matcher/custom-error-state-matcher.component';
import { ActivityLogsComponent } from './component/activity-logs/activity-logs.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ApiAccessKeyComponent } from './component/api-access-key/api-access-key.component';
import { ApiCreditComponent } from './component/api-credit/api-credit.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { TreeGridTableComponent } from './component/controls/tree-grid-table/tree-grid-table.component';
import { TreeGridTableDirective } from './directives/tree-grid-table.directive';
import { DocumentationDataComponent } from './component/documentation-data/documentation-data.component';
import { DocumentationDataDirective } from './directives/documentation-data.directive';
import { CAIndividualDetailComponent } from './component/apis/ca-individual-detail/ca-individual-detail.component';
import { CAFirmDetailComponent } from './component/apis/ca-firm-detail/ca-firm-detail.component';
import { SetNotificationAlertComponent } from './component/set-notification-alert/set-notification-alert.component';
import { SetNotificationAlertServiceService } from './common-utils/common-services/set-notification-alert-service.service';
import { ViewApiCreditLogsComponent } from './component/view-api-credit-logs/view-api-credit-logs.component';
import { ViewApiCreditLogsService } from './common-utils/common-services/view-api-credit-logs.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TryoutResponseDirective } from './directives/tryout-response.directive';
import { TryoutResponseComponent } from './component/tryout-response/tryout-response.component';
import { NsdlPanInquiryComponent } from './component/apis/nsdl-pan-inquiry/nsdl-pan-inquiry.component';
import { EsignAndEstampingComponent } from './component/apis/esign-and-estamping/esign-and-estamping.component';
import { IntroductionComponent } from './component/introduction/introduction.component';
import { CertificateComponent } from './component/certificate/certificate.component';
import { CertificateActivationAlertComponent } from './component/certificate-activation-alert/certificate-activation-alert.component';
import { DatePipe } from '@angular/common';
import { IpvrComponent } from './component/ipvr/ipvr.component';
import { IpvrViewComponent } from './component/ipvr-view/ipvr-view.component';
import { ViewDetailedLogsComponent } from './component/view-detailed-logs/view-detailed-logs.component';
import { ApiAccessKeyAlertComponent } from './component/api-access-key-alert/api-access-key-alert.component';
import { GstGenerateOtpComponent } from './component/apis/gst-generate-otp/gst-generate-otp.component';
import { GstVerifyOtpComponent } from './component/apis/gst-verify-otp/gst-verify-otp.component';
import { GstTaxPayersApiComponent } from './component/apis/gst-tax-payers-api/gst-tax-payers-api.component';
import { GstTaxPayersGstr3SummaryComponent } from './component/apis/gst-tax-payers/gst-tax-payers-gstr3-summary/gst-tax-payers-gstr3-summary.component';
import { GstTaxPayersGstr1SummaryComponent } from './component/apis/gst-tax-payers/gst-tax-payers-gstr1-summary/gst-tax-payers-gstr1-summary.component';
import { GstTaxPayersGstr2aB2bComponent } from './component/apis/gst-tax-payers/gst-tax-payers-gstr2a-b2b/gst-tax-payers-gstr2a-b2b.component';
import { GstTaxPayersGstr2aCdnComponent } from './component/apis/gst-tax-payers/gst-tax-payers-gstr2a-cdn/gst-tax-payers-gstr2a-cdn.component';
import { GstTaxPayersGstr1CdnurComponent } from './component/apis/gst-tax-payers/gst-tax-payers-gstr1-cdnur/gst-tax-payers-gstr1-cdnur.component';
import { GstTaxPayersGstr2SummaryComponent } from './component/apis/gst-tax-payers/gst-tax-payers-gstr2-summary/gst-tax-payers-gstr2-summary.component';
import { GstTaxPayersGstr2CdnurComponent } from './component/apis/gst-tax-payers/gst-tax-payers-gstr2-cdnur/gst-tax-payers-gstr2-cdnur.component';
import { GstTaxPayersGstr1HsnSummaryComponent } from './component/apis/gst-tax-payers/gst-tax-payers-gstr1-hsn-summary/gst-tax-payers-gstr1-hsn-summary.component';
import { GstTaxPayersGstr2HsnSummaryComponent } from './component/apis/gst-tax-payers/gst-tax-payers-gstr2-hsn-summary/gst-tax-payers-gstr2-hsn-summary.component';
import { SecurityComponent } from './component/security/security.component';
import { CreditComponent } from './component/credit/credit.component';
import { SecurityInfoComponent } from './component/security-info/security-info.component';
import { NameMatchComponent } from './component/name-match/name-match.component';
import { UdhyamRegDetailUsingOtpComponent } from './component/apis/udhyam-reg-detail-using-otp/udhyam-reg-detail-using-otp/udhyam-reg-detail-using-otp.component';
import { VerifyUdhyamRegDetailUsingOtpComponent } from './component/apis/verify-udhyam-reg-detail-using-otp/verify-udhyam-reg-detail-using-otp.component';
import { SingleGstScoreComponent } from './component/single-gst-score/single-gst-score.component';
import { MultipleGstScoreComponent } from './component/multiple-gst-score/multiple-gst-score.component';
import { GstTaxPayersGstr1B2baComponent } from './component/apis/gst-tax-payers/gst-tax-payers-gstr1-b2ba/gst-tax-payers-gstr1-b2ba.component';
import { GetFarmerDataFidComponent } from './component/kcc/get-farmer-data-fid/get-farmer-data-fid.component';
import { GetFarmerDataHashOfAadharComponent } from './component/kcc/get-farmer-data-hash-of-aadhar/get-farmer-data-hash-of-aadhar.component';
import { CheckBhoomiStatusComponent } from './component/kcc/check-bhoomi-status/check-bhoomi-status.component';
import { GstTaxPayersGstr1B2bComponent } from './component/apis/gst-tax-payers/gst-tax-payers-gstr1-b2b/gst-tax-payers-gstr1-b2b.component';
import { MantlelabAgriLatLngApiComponent } from './component/kcc/mantlelab-agri-lat-lng-api/mantlelab-agri-lat-lng-api.component';
import { SkymateNewRequestComponent } from './component/kcc/skymate-new-request/skymate-new-request.component';
import { SkymateReportApiComponent } from './component/kcc/skymate-report-api/skymate-report-api.component';
import { GeoCoordinatesFhcApiComponent } from './component/kcc/geo-coordinates-fhc-api/geo-coordinates-fhc-api.component';
import { GeoCoordinatesSurveyApiComponent } from './component/kcc/geo-coordinates-survey-api/geo-coordinates-survey-api.component';
import { NameMatchKarzaComponent } from './component/name-match-karza/name-match-karza.component';

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
    ClipboardModule,
    NgbModule
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
    PanStatusCheckComponent,
    BankAccountVerificationComponent,
    UdhyamRegDetailComponent,
    CAIndividualDetailComponent,
    CAFirmDetailComponent,
    CustomErrorStateMatcherComponent,
    ActivityLogsComponent,
    ProfileComponent,
    ApiAccessKeyComponent,
    ApiCreditComponent,
    TreeGridTableComponent,
    TreeGridTableDirective,
    DocumentationDataComponent,
    DocumentationDataDirective,
    SetNotificationAlertComponent,
    ViewApiCreditLogsComponent,
    TryoutResponseDirective,
    TryoutResponseComponent,
    NsdlPanInquiryComponent,
    EsignAndEstampingComponent,
    IntroductionComponent,
    CertificateComponent,
    CertificateActivationAlertComponent,
    IpvrComponent,
    IpvrViewComponent,
    ViewDetailedLogsComponent,
    ApiAccessKeyAlertComponent,
    GstGenerateOtpComponent,
    GstVerifyOtpComponent,
    GstTaxPayersApiComponent,
    GstTaxPayersGstr3SummaryComponent,
    GstTaxPayersGstr1SummaryComponent,
    GstTaxPayersGstr2aB2bComponent,
    GstTaxPayersGstr2aCdnComponent,
    GstTaxPayersGstr1CdnurComponent,
    GstTaxPayersGstr2SummaryComponent,
    GstTaxPayersGstr2CdnurComponent,
    GstTaxPayersGstr1HsnSummaryComponent,
    GstTaxPayersGstr2HsnSummaryComponent,
    SecurityComponent,
    CreditComponent,
    SecurityInfoComponent,
    NameMatchComponent,
    UdhyamRegDetailUsingOtpComponent,
    VerifyUdhyamRegDetailUsingOtpComponent,
    SingleGstScoreComponent,
    MultipleGstScoreComponent,
    GstTaxPayersGstr1B2baComponent,
    GetFarmerDataFidComponent,
    GetFarmerDataHashOfAadharComponent,
    CheckBhoomiStatusComponent,
    GstTaxPayersGstr1B2bComponent,
    MantlelabAgriLatLngApiComponent,
    SkymateNewRequestComponent,
    SkymateReportApiComponent,
    GeoCoordinatesFhcApiComponent,
    GeoCoordinatesSurveyApiComponent,
    NameMatchKarzaComponent
  ] ,
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
              LoaderService,
              HttpService,
              AuthGuard,
              CookieService,
              SendBackModelService,
              Globals,
              DatePipe,
              SetNotificationAlertServiceService,
              ViewApiCreditLogsService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
