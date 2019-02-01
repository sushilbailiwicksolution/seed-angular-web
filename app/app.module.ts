import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule} from './app-routing.module';
import { CreateTestCaseComponent } from './create-test-case/create-test-case.component';
import { SampleRegistrationFormComponent } from './sample-registration-form/sample-registration-form.component';

import { GenerateReportComponent } from './generate-report/generate-report.component';
import { SeedReportDetailComponent } from './seed-report-detail/seed-report-detail.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthGuard1 } from './auth.guard1';
import {AuthService1} from './auth.service1';
import { MoistureTestingRecordComponent } from './moisture-testing-record/moisture-testing-record.component';
import { SeedTestingRecordComponent } from './seed-testing-record/seed-testing-record.component';
import { PhysicalRecordComponent } from './physical-record/physical-record.component';
import { GerminationRecordComponent } from './germination-record/germination-record.component';
import { CreateUserComponent } from './create-user/create-user.component';


import { AgGridModule } from 'ag-grid-angular';
import { RedRiceRecordComponent } from './red-rice-record/red-rice-record.component';
import { ForgetComponentComponent } from './forget-component/forget-component.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { UpdateRemoveUserComponent } from './update-remove-user/update-remove-user.component';
import { UserRecordComponent } from './user-record/user-record.component';
import { TestStatusComponent } from './test-status/test-status.component';
import { MoistureTestingComponent } from './moisture-testing/moisture-testing.component';
import { GerminationTestingComponent } from './germination-testing/germination-testing.component';
import { PhysicalPurityRecordComponent } from './physical-purity-record/physical-purity-record.component';
import { RedRiceTestingRecordComponent } from './red-rice-testing-record/red-rice-testing-record.component';
 




@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CreateTestCaseComponent,
    SampleRegistrationFormComponent,
    MoistureTestingComponent,
    GenerateReportComponent,
    SeedReportDetailComponent,
    MoistureTestingRecordComponent,
    SeedTestingRecordComponent,
    PhysicalRecordComponent,
    GerminationRecordComponent,
    CreateUserComponent,
    RedRiceRecordComponent,
    ForgetComponentComponent,
    UpdateRemoveUserComponent,
    UserRecordComponent,
    TestStatusComponent,
    GerminationTestingComponent,
    PhysicalPurityRecordComponent,
    RedRiceTestingRecordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    AngularWebStorageModule,
    AgGridModule.withComponents([])
  ],
  providers: [AuthGuard,AuthService,AuthGuard1 ,AuthService1,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
