import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProductsComponent } from './component/products/product-list/products.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SettingsComponent } from './component/settings/settings.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthGuard } from './common-utils/auth/auth.guard';
import { ProductComponent } from './component/products/product/product/product.component';
import { SignupComponent } from './component/signup/signup.component';
import { ProductViewComponent } from './component/products/product/product-view/product-view.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { LspBridgeMatrixComponent } from './component/lsp-bridge-matrix/lsp-bridge-matrix.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: '', component: NavbarComponent , canActivate: [AuthGuard], children : [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'bridge-matrix', component: LspBridgeMatrixComponent, canActivate: [AuthGuard] },
    { path: 'products/save', component: ProductsComponent, canActivate: [AuthGuard]},
    { path: 'products/sent', component: ProductsComponent, canActivate: [AuthGuard]},
    { path: 'products/sent-back', component: ProductsComponent, canActivate: [AuthGuard]},
    { path: 'products/active', component: ProductsComponent, canActivate: [AuthGuard]},
    { path: 'products/inactive', component: ProductsComponent, canActivate: [AuthGuard]},
    { path: 'product', component: ProductComponent, canActivate: [AuthGuard]},
    { path: 'product/:id', component: ProductComponent, canActivate: [AuthGuard]},
    { path: 'product-view/:status/:id', component: ProductViewComponent, canActivate: [AuthGuard]},
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
    { path: '', redirectTo: '', pathMatch: 'full' },
  ]
},
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: '**', redirectTo : '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
