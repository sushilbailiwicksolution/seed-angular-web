import { Component, OnInit } from '@angular/core';
import {AppService } from '../app.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,NavigationExtras } from '@angular/router';
import {GenericResponse} from '../genericResponse';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { genReport, GenerateReport } from '../generate-report';
import {AuthService} from '../auth.service';
import {DateViseData} from '../date_vise_data';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {
  public name:string;  
  public detail:genReport[];
  public roleId:string;
  public startDate:string;
  public endDate:string;
  public month:number;
  public year:number;
  public date:number;
  
  
  constructor(private authService:AuthService,private appService:AppService,private router:Router,private modelServices:NgbModal ) { 
    let dateObj=new Date();
    this.month=dateObj.getMonth()+1;
    this.year=dateObj.getFullYear();
     let dateOb=new Date(this.year,this.month,0);
     this.date=dateOb.getDate();
     console.log("day in a month: "+this.date);
     this.endDate=this.year+"-"+this.month+"-"+this.date;

    this.startDate=this.year+"-"+this.month+"-"+"01";
    
    console.log("endDate : "+this.endDate  );
    this.getGenerateReport();
    this.name=localStorage.getItem("name");
    this.roleId=localStorage.getItem("roleId");
  }

  ngOnInit() {
    let dateObj=new Date();
    this.model.startDate=new Date(dateObj.getFullYear(), dateObj.getMonth(),2).toISOString().substring(0, 10);
    this.model.endDate=new Date(dateObj.getFullYear(), dateObj.getMonth()+1).toISOString().substring(0, 10);

  }
  
  getDashboard(){
    this.router.navigate(['/dashboard']);
  }
  getTestStatus(){
    this.router.navigate(['/testStatus']);
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
    var req={
      "startDate":this.startDate,
      "endDate":this.endDate
    }   

    this.appService.getGenerateReport(req).subscribe((data:GenerateReport)=>{
      this.detail=data.list;
      
     

    });
  }
  public labRefrence:string; 
    
  public model=new DateViseData('','');

  getSeedReport(index){
    let navigationExtras: NavigationExtras = {
      
      queryParams: {
          "labRfrenceCode": this.detail[index].labReferenceCode
      }
  };
  if(this.roleId==="1" ||this.roleId==="3"){
    this.router.navigate(['/seedReport'],navigationExtras);}
    else{
      window.alert("Your are not authorized to generate report");
    }
  }
  getCreateUser(){
    if(this.roleId==='1'){
      this.router.navigate(['/createUserComponent']);
      }else{
        window.alert("you are not authorized to create user");
      }
    }
  logout(){
    this.authService.logout();
  }


  dateWiseData(){
    var req={
      "startDate":this.model.startDate,
      "endDate":this.model.endDate
    }
      this.appService.getGenerateReport(req).subscribe((data:GenerateReport)=>{
          this.detail=data.list;
           
      }
    
    );
    }

}
