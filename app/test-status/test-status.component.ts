import { Component, OnInit } from '@angular/core';
import { AuthService1 } from '../auth.service1';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateViseData } from '../date_vise_data';
import { testStatus, TestStatusModel } from '../test_status_model';

@Component({
  selector: 'app-test-status',
  templateUrl: './test-status.component.html',
  styleUrls: ['./test-status.component.css']
})
export class TestStatusComponent implements OnInit {

  public name6:string;
  public roleId6:string;
  public startDate:string;
  public endDate:string;
  public month:number;
  public year:number;
  public date:number;
  public detail:testStatus[];
  public model=new DateViseData('','');

  constructor(private authService1:AuthService1,private appService:AppService,private router:Router,private modalService: NgbModal) {
    let dateObj=new Date();
    this.month=dateObj.getMonth()+1;
    this.year=dateObj.getFullYear();

    this.startDate=this.year+"-"+this.month+"-"+"01";
    let dateOb=new Date(this.year,this.month,0);
    this.date=dateOb.getDate();
    console.log("day in a month: "+this.date);
    this.endDate=this.year+"-"+this.month+"-"+this.date
    this.name6=localStorage.getItem("name");
    this.roleId6=localStorage.getItem("roleId");
    this.getStatusOfTest();
  }
  columnDefs = [
  {headerName: 'Serial No.',lockPosition: true, valueGetter: 'node.rowIndex + 1', cellClass: 'locked-col', width: 50, suppressNavigable: true},
  {headerName: 'Sender Name',width: 120, field: 'name' },
    {headerName: 'Lab Refrence No.',width: 140, field: 'labReferenceCode' },


    {headerName: 'Germination Test',width: 130, field: 'germinationTest',cellStyle: function(params) {
      if (params.value==='Test Not Taken') {
          return {color: 'black', backgroundColor: 'white'};
      } else if(params.value==='Report Not Arrived'){
        return {color: 'red', backgroundColor: 'white'};
      }else if(params.value==='Report Arrived'){
        return {color: 'green', backgroundColor: 'white'};
      }
  } },


    {headerName: 'Physical Purity',width: 130,cellStyle: function(params) {
      if (params.value==='Test Not Taken') {
          return {color: 'black', backgroundColor: 'white'};
      } else if(params.value==='Report Not Arrived'){
        return {color: 'red', backgroundColor: 'white'};
      }else if(params.value==='Report Arrived'){
        return {color: 'green', backgroundColor: 'white'};
      }
  } ,field: 'physicalTest'},


    {headerName: 'Moisture Test',width: 130,cellStyle: function(params) {
      if (params.value==='Test Not Taken') {
          return {color: 'black', backgroundColor: 'white'};
      } else if(params.value==='Report Not Arrived'){
        return {color: 'red', backgroundColor: 'white'};
      }else if(params.value==='Report Arrived'){
        return {color: 'green', backgroundColor: 'white'};
      }
  }, field: 'moistureTest'},


    {headerName: 'Red Rice Test',width: 130,cellStyle: function(params) {
      if (params.value==='Test Not Taken') {
          return {color: 'black', backgroundColor: 'white'};
      } else if(params.value==='Report Not Arrived'){
        return {color: 'red', backgroundColor: 'white'};
      }else if(params.value==='Report Arrived'){
        return {color: 'green', backgroundColor: 'white'};
      }
  }, field: 'redRiceTest'},
  

    {headerName: 'date',width: 120, field: 'date'},
  ];


rowData:any;
  getStatusOfTest(){
    var req={
      "startDate":this.startDate,
      "endDate":this.endDate
    }
    this.appService.getStatusOfTest(req).subscribe((data:TestStatusModel)=>{
      this.detail=data.list;
      this.rowData=this.detail;
      console.log("data =>   "+JSON.stringify(data));
      
    })
  }









  ngOnInit() {
    let dateObj=new Date();
    this.model.startDate=new Date(dateObj.getFullYear(), dateObj.getMonth(),2).toISOString().substring(0, 10);
    this.model.endDate=new Date(dateObj.getFullYear(), dateObj.getMonth()+1).toISOString().substring(0, 10);

  }
  getDashboard(){
    this.router.navigate(['/dashboard']);
  }
  getGenerateReport(){
    if(this.roleId6==='1'|| this.roleId6==='3'){
    this.router.navigate(['/generateReport']);
    }else{

      window.alert("you are not authorized to generate report");
    }

}
getCreateUser(){
  if(this.roleId6==='1'){
    this.router.navigate(['/createUserComponent']);
    }else{
      window.alert("you are not authorized to create user");
    }
  }
   dateWiseData(){
    var req={
      "startDate":this.model.startDate,
      "endDate":this.model.endDate
    }
    this.appService.getStatusOfTest(req).subscribe((data:TestStatusModel)=>{
      this.detail=data.list;
      this.rowData=this.detail;
      console.log("data =>   "+JSON.stringify(data));
    });
  }
  logout(){
    this.authService1.logout();
  }
}
