import { AuditService } from './audits/audit/audit.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AuditsComponent } from './audits/audit-list/audits.component';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuditComponent } from './audits/audit/audit.component';
import { NavbarComponent } from './navbar/navbar.component';
//import { InputFileUpload } from './input-file-component/input-file-upload.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { requestInterceptorJWT } from './shared/requestinterceptor-jwt';
import { SpinnerComponent } from './spinner/spinner.component';
import { requestInterceptorSpinner } from './shared/requestinterceptor-spinner';
//import { ProgressBarService } from './progress-bar.service';
//import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  declarations: [
    AppComponent,
    AuditsComponent,
    AuditComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    //InputFileUpload,
    FileUploadComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot( 
      [
        {path:'', redirectTo : "Login", pathMatch: "full" },
        {path:'Audits', component: AuditsComponent},
        {path:'Login', component: LoginComponent},
        {path: 'audits/audit/new', component: AuditComponent},
        {path: 'audits/audit/:AuditCode', component: AuditComponent}

      ]
     ),
     HttpClientModule,
     //NgProgressModule
  ],
  providers: [AuditService, 
              { provide : HTTP_INTERCEPTORS, useClass: requestInterceptorJWT, multi:true},
              { provide : HTTP_INTERCEPTORS, useClass: requestInterceptorSpinner, multi:true}
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
