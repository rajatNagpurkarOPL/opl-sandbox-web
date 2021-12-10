import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthGuard } from './common-utils/auth/auth.guard';
import { SignupComponent } from './component/signup/signup.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { DocumentationComponent } from './component/documentation/documentation.component';
import { ActivityLogsComponent } from './component/activity-logs/activity-logs.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SecurityComponent } from './component/security/security.component';
import { CreditComponent } from './component/credit/credit.component';
const routes: Routes = [ 
  
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: '', component: NavbarComponent , canActivate: [AuthGuard], children : [
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },    
    { path: 'documentation/:code', component: DocumentationComponent},
    { path: 'activity', component: ActivityLogsComponent},
    { path: 'profile/:pageName', component: ProfileComponent},
    {path:'security/:pageName', component:SecurityComponent},
    {path:'credit/:pageName', component:CreditComponent}
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
