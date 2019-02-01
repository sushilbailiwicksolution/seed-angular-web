import { Component, OnInit } from '@angular/core';
import { AuthService1 } from '../auth.service1';
import { AppService } from '../app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserDetail, userRecord } from '../user-detail';

@Component({
  selector: 'app-user-record',
  templateUrl: './user-record.component.html',
  styleUrls: ['./user-record.component.css']
})
export class UserRecordComponent implements OnInit {

  public name6:string;
  public roleId6:string;
  public detail:userRecord[];
  public startDate:string;
  public endDate:string;
  public month:number;
  public year:number;
  public date:number;

  constructor(private authService1:AuthService1,private appService:AppService,private router:Router,private modalService: NgbModal) {
    
      this.name6=localStorage.getItem("name");
      this.roleId6=localStorage.getItem("roleId");
      this.getUserDetail();
      
   }


  
   getDashboard(){
    this.router.navigate(['/dashboard']);
  }

  getSampleRegistration(){
    this.router.navigate(['/sampleRegistrationForm']);
  }
  getMoistureRecord(){
    this.router.navigate(['/moistureTestingRecord']);
  }
  getPhysicalPurityRecord(){
    this.router.navigate(['/physicalPurity']);
  }
  getGerminationTesting(){
    this.router.navigate(['/germinationTesting']);
  }
  getGenerateReport(){
    if(this.roleId6==='1'|| this.roleId6==='3'){
    this.router.navigate(['/generateReport']);
    }else{
      window.alert("you are not authorized to generate report");
    }

   
  }

  ngOnInit() {
   
  }



  columnDefs = [
    {headerName: 'Serial No.',lockPosition: true, valueGetter: 'node.rowIndex + 1', cellClass: 'locked-col', width: 50, suppressNavigable: true},
    {headerName: 'First Name',width: 100, field: 'firstName'},
    {headerName: 'Last Name',width: 100, field: 'lastName'},
    {headerName: 'Mobile Number',width: 140, field: 'mobile'},
    {headerName: 'Address',width: 100, field: 'address'},
    {headerName: 'Email-Id',width: 150, field: 'emailId'},
    {headerName: 'Employee-Id',width: 120, field: 'employeeId'},
    {headerName: 'Date Of Joining',width: 130, field: 'dateOfJoining'}
];

  rowData:any;

  getUserDetail(){
    
    this.appService.getUserDetail().subscribe((data:UserDetail)=>{
        this.detail=data.list;
       

        this.rowData=this.detail;
        
        console.log(this.detail);
    }
  
  );
  }

  logout(){
    this.authService1.logout();
  }
}
