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
import { SendBackModelComponent } from './common-utils/common-component/send-back-model/send-back-model.component';
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
import { ProductsComponent } from './component/products/product-list/products/products.component';
import { AccountPriorityPopupComponent } from './component/products/product/account-priority-popup/account-priority-popup.component';
import { AddParameterPopupComponent } from './component/products/product/add-parameter-popup/add-parameter-popup.component';
import { ConfirmationPopupComponent } from './component/products/product/confirmation-popup/confirmation-popup.component';
import { DeleteProductPopupComponent } from './component/products/product/delete-product-popup/delete-product-popup.component';
import { ImportParameterPopupComponent } from './component/products/product/import-parameter-popup/import-parameter-popup.component';
import { ProductViewComponent } from './component/products/product/product-view/product-view.component';
import { ProductComponent } from './component/products/product/product/product.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { EblrpopupComponent } from './component/settings/eblrpopup/eblrpopup.component';
import { SettingsComponent } from './component/settings/settings.component';
import { SignupComponent } from './component/signup/signup.component';
import { LspBridgeMatrixComponent } from './component/lsp-bridge-matrix/lsp-bridge-matrix.component';
import { ProductListComponent } from './component/products/product-list/product-list.component';
import { NewProductConfigurationComponent } from './component/new-product-configuration/new-product-configuration.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ButtonComponent } from './component/controls/button/button.component';
import { CheckboxComponent } from './component/controls/checkbox/checkbox.component';
import { DateComponent } from './component/controls/date/date.component';
import { DynamicFieldDirective } from './component/controls/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './component/controls/dynamic-form/dynamic-form.component';
import { InputComponent } from './component/controls/input/input.component';
import { RadiobuttonComponent } from './component/controls/radiobutton/radiobutton.component';
import { SelectComponent } from './component/controls/select/select.component';
import { ProductCreateComponent } from './component/product-create/product-create.component';
import { GeographicalAreasPopupComponent } from './popup/geographical-areas-popup/geographical-areas-popup.component';
import { ProductNewComponent } from './component/products/product/product-new/product-new.component';
import { DocumentationComponent } from './component/documentation/documentation.component';
import { CreateLoanApplicationRequestComponent } from './component/documentation/gstsahayapis/loan-application/create-loan-application-request/create-loan-application-request.component';
import { ConsentHandleRequestComponent } from './component/documentation/gstsahayapis/consent/consent-handle-request/consent-handle-request.component';
import { ConsentStatusRequestComponent } from './component/documentation/gstsahayapis/consent/consent-status-request/consent-status-request.component';
import { GenerateOfferRequestComponent } from './component/documentation/gstsahayapis/offers/generate-offer-request/generate-offer-request.component';
import { SetOfferRequestComponent } from './component/documentation/gstsahayapis/offers/set-offer-request/set-offer-request.component';
import { TriggerLoanAcceptanceRequestComponent } from './component/documentation/gstsahayapis/loan-acceptance/trigger-loan-acceptance-request/trigger-loan-acceptance-request.component';
import { VerifyLoanAcceptanceRequestComponent } from './component/documentation/gstsahayapis/loan-acceptance/verify-loan-acceptance-request/verify-loan-acceptance-request.component';
import { GrantLoanRequestComponent } from './component/documentation/gstsahayapis/grant-loan/grant-loan-request/grant-loan-request.component';
import { LoanSummaryRequestComponent } from './component/documentation/gstsahayapis/grant-loan/loan-summary-request/loan-summary-request.component';
import { GetLoanRequestComponent } from './component/documentation/gstsahayapis/grant-loan/get-loan-request/get-loan-request.component';
import { LoanStatementRequestComponent } from './component/documentation/gstsahayapis/grant-loan/loan-statement-request/loan-statement-request.component';
import { ListLoansRequestComponent } from './component/documentation/gstsahayapis/grant-loan/list-loans-request/list-loans-request.component';
import { SetRepaymentPlanRequestComponent } from './component/documentation/gstsahayapis/repayment/set-repayment-plan-request/set-repayment-plan-request.component';
import { SetRepaymentPlanStatusRequestComponent } from './component/documentation/gstsahayapis/repayment/set-repayment-plan-status-request/set-repayment-plan-status-request.component';
import { TriggerRepaymentRequestComponent } from './component/documentation/gstsahayapis/repayment/trigger-repayment-request/trigger-repayment-request.component';
import { TriggerRepaymentStatusRequestComponent } from './component/documentation/gstsahayapis/repayment/trigger-repayment-status-request/trigger-repayment-status-request.component';
import { ConfirmRepaymentComponent } from './component/documentation/gstsahayapis/repayment/confirm-repayment/confirm-repayment.component';
import { SetDisbursementAccountRequestComponent } from './component/documentation/gstsahayapis/disbursement/set-disbursement-account-request/set-disbursement-account-request.component';
import { TriggerDisbursementRequestComponent } from './component/documentation/gstsahayapis/disbursement/trigger-disbursement-request/trigger-disbursement-request.component';
import { TriggerDisbursementStatusRequestComponent } from './component/documentation/gstsahayapis/disbursement/trigger-disbursement-status-request/trigger-disbursement-status-request.component';
import { RaiseDisputeRequestComponent } from './component/documentation/gstsahayapis/loan-dispute-mgmt/raise-dispute-request/raise-dispute-request.component';
import { DisputeStatusRequestComponent } from './component/documentation/gstsahayapis/loan-dispute-mgmt/dispute-status-request/dispute-status-request.component';
import { HeartbeatApiComponent } from './component/documentation/gstsahayapis/heartbeat/heartbeat-api/heartbeat-api.component';
import { DrawerMenuDirective } from './directives/drawer-menu.directive';
import { DrawerMenuComponent } from './component/common/drawer-menu/drawer-menu.component';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { NewTriggerConfigurationComponent } from './component/new-trigger-configuration/new-trigger-configuration.component';
import { DisbursedCountComponent } from './component/disbursed-count/disbursed-count.component';
import { ConstitutionPopupComponent } from './popup/constitution-popup/constitution-popup.component';
import { AddNewTriggerComponent } from './component/settings/add-new-trigger/add-new-trigger.component';
import { CreateTriggerComponent } from './component/settings/create-trigger/create-trigger.component';




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
    HighchartsChartModule
  ],
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
    ResetPasswordComponent,
    AccountPriorityPopupComponent,
    DeleteProductPopupComponent,
    LspBridgeMatrixComponent,
    ProductListComponent,
    NewProductConfigurationComponent,
    ButtonComponent,
    CheckboxComponent,
    DateComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    InputComponent,
    RadiobuttonComponent,
    SelectComponent,
    ProductCreateComponent,
    GeographicalAreasPopupComponent,
    ProductNewComponent,
    DocumentationComponent,
    CreateLoanApplicationRequestComponent,
    ConsentHandleRequestComponent,
    ConsentStatusRequestComponent,
    GenerateOfferRequestComponent,
    SetOfferRequestComponent,
    TriggerLoanAcceptanceRequestComponent,
    VerifyLoanAcceptanceRequestComponent,
    GrantLoanRequestComponent,
    LoanSummaryRequestComponent,
    GetLoanRequestComponent,
    LoanStatementRequestComponent,
    ListLoansRequestComponent,
    SetRepaymentPlanRequestComponent,
    SetRepaymentPlanStatusRequestComponent,
    TriggerRepaymentRequestComponent,
    TriggerRepaymentStatusRequestComponent,
    ConfirmRepaymentComponent,
    SetDisbursementAccountRequestComponent,
    TriggerDisbursementRequestComponent,
    TriggerDisbursementStatusRequestComponent,
    RaiseDisputeRequestComponent,
    DisputeStatusRequestComponent,
    HeartbeatApiComponent,
    DrawerMenuDirective,
    DrawerMenuComponent,
    NewTriggerConfigurationComponent,
    DisbursedCountComponent,
    ConstitutionPopupComponent,
    AddNewTriggerComponent,
    CreateTriggerComponent
  ] ,
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
