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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', component: NavbarComponent , children : [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'products/save', component: ProductsComponent, canActivate: [AuthGuard]},
    { path: 'products/sent', component: ProductsComponent, canActivate: [AuthGuard]},
    { path: 'products/sent-back', component: ProductsComponent, canActivate: [AuthGuard]},
    { path: 'products/active', component: ProductsComponent, canActivate: [AuthGuard]},
    { path: 'products/inactive', component: ProductsComponent, canActivate: [AuthGuard]},
    { path: 'product', component: ProductComponent, canActivate: [AuthGuard]},
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
   ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
