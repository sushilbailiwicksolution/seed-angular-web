import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {SampleRegistrationFormComponent} from './sample-registration-form/sample-registration-form.component';
import {GenerateReportComponent} from './generate-report/generate-report.component';
import {SeedReportDetailComponent} from './seed-report-detail/seed-report-detail.component';
import {AuthGuard} from './auth.guard';
import {AuthGuard1} from './auth.guard1';
import {SeedTestingRecordComponent} from './seed-testing-record/seed-testing-record.component';
import {MoistureTestingRecordComponent} from './moisture-testing-record/moisture-testing-record.component';
import {PhysicalRecordComponent} from  './physical-record/physical-record.component';
import {GerminationRecordComponent} from './germination-record/germination-record.component';
import {CreateUserComponent} from './create-user/create-user.component'
import { RedRiceRecordComponent } from './red-rice-record/red-rice-record.component';
import { ForgetComponentComponent } from './forget-component/forget-component.component';
import { UserRecordComponent } from './user-record/user-record.component';
import { TestStatusComponent } from './test-status/test-status.component';
import { MoistureTestingComponent } from './moisture-testing/moisture-testing.component';
import { GerminationTestingComponent } from './germination-testing/germination-testing.component';
import { PhysicalPurityRecordComponent } from './physical-purity-record/physical-purity-record.component';
import { RedRiceTestingRecordComponent } from './red-rice-testing-record/red-rice-testing-record.component';
const routes:Routes=[
    {path: 'dashboard', component:DashboardComponent},
    {path: 'login' ,component:LoginComponent},
    {path: '' ,component:LoginComponent},
    {path: 'sampleRegistrationForm',component:SampleRegistrationFormComponent,canActivate: [AuthGuard] },
    {path: 'registrationForm',component:SampleRegistrationFormComponent,canActivate: [AuthGuard1] },

   {path: 'generateReport'  ,component:GenerateReportComponent,canActivate: [AuthGuard1]},
    {path: 'seedReport'  ,component:SeedReportDetailComponent,canActivate:  [AuthGuard1]},
    {path: 'seedRecord',component:SeedTestingRecordComponent,canActivate:  [AuthGuard1]},
    {path: 'moistureRecord',component:MoistureTestingRecordComponent,canActivate:  [AuthGuard1]},
    {path: 'physicalRecord',component:PhysicalRecordComponent,canActivate:[AuthGuard1]},
    {path : 'germinationRecord',component:GerminationRecordComponent,canActivate:[AuthGuard1]},
    {path: 'createUserComponent',component:CreateUserComponent,canActivate:[AuthGuard1]},
    {path: 'redRiceRecord',component:RedRiceRecordComponent,canActivate:[AuthGuard1]},
    {path: 'forgetPassword', component:ForgetComponentComponent},
    {path: 'userDetail',component:UserRecordComponent,canActivate:  [AuthGuard1]},
    {path: 'testStatus',component:TestStatusComponent,canActivate:  [AuthGuard1]},
    {path: 'moistureForm', component:MoistureTestingComponent,canActivate:  [AuthGuard1] },
    {path: 'germinationForm', component:GerminationTestingComponent,canActivate:  [AuthGuard1] },
    {path: 'physicalForm', component:PhysicalPurityRecordComponent,canActivate:  [AuthGuard1] },
    {path: 'redriceForm', component:RedRiceTestingRecordComponent,canActivate:  [AuthGuard1] }

    
    
    
];

@NgModule({
 imports:[RouterModule.forRoot(routes)],
 exports:[RouterModule]
})
export  class AppRoutingModule{

}