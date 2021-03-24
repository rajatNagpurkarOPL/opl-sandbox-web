import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProductsComponent } from './component/products/product-list/products/products.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SettingsComponent } from './component/settings/settings.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthGuard } from './common-utils/auth/auth.guard';
import { ProductComponent } from './component/products/product/product/product.component';
import { SignupComponent } from './component/signup/signup.component';
import { ProductViewComponent } from './component/products/product/product-view/product-view.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { LspBridgeMatrixComponent } from './component/lsp-bridge-matrix/lsp-bridge-matrix.component';
import { ProductListComponent } from './component/products/product-list/product-list.component';
import { NewProductConfigurationComponent } from './component/new-product-configuration/new-product-configuration.component';
import { ProductCreateComponent } from './component/product-create/product-create.component';
import { DocumentationComponent } from './component/documentation/documentation.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: '', component: NavbarComponent , canActivate: [AuthGuard], children : [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'bridge-matrix', component: LspBridgeMatrixComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'products/save', component: ProductsComponent },
    { path: 'products/sent', component: ProductsComponent },
    { path: 'products/sent-back', component: ProductsComponent },
    { path: 'products/active', component: ProductsComponent },
    { path: 'products/inactive', component: ProductsComponent },
    { path: 'product', component: ProductComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'product-view/:status/:id', component: ProductViewComponent },
    { path: 'settings', component: SettingsComponent},
    { path: 'New-Product-Configuration', component: NewProductConfigurationComponent},
    { path: 'create-product', component: ProductCreateComponent},
    { path: 'create-product/:id', component: ProductCreateComponent },
    { path: 'documentation/:code', component: DocumentationComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ]
},
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: '**', redirectTo : 'dashboard' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
