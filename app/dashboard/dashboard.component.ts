import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,ActivatedRoute } from '@angular/router';
import {AppService} from '../app.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {GenericResponse, userDetail} from '../genericResponse';
import {AuthService} from '../auth.service';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public id:string ;
  public detail:userDetail[]; 
  public name:string;
  public firstName:string;
  public lastName:string;
  public roleId:string;
  

  constructor(private authService:AuthService,private router:Router,private appService:AppService,private modelServices:NgbModal,private route: ActivatedRoute) { 
    this.id = localStorage.getItem('id');
    console.log("id in dashboard : "+this.id);
    this.getEmployeeDetail(this.id);
  this.roleId=localStorage.getItem('roleId');
        console.log("roleId in dashboard=>   "+this.roleId);
  }

  ngOnInit() {
   
  }

 
  

  getDashboard(){
    this.router.navigate(['/dashboard']);
  }

  getCreateUser(){
    if(this.roleId==='1'){
      this.router.navigate(['/createUserComponent']);
      }else{
        window.alert("you are not authorized to create user");
      }
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
   
  getUsers(){
   this.router.navigate(['/userDetail']); 
  }

  getPhysicalPurityRecord(){
    this.router.navigate(['/physicalPurity']);
  }
  getGerminationTesting(){
    this.router.navigate(['/germinationTesting']);
  }
  getGenerateReport(){
    if(this.roleId==='1'|| this.roleId==='3'){
    this.router.navigate(['/generateReport']);
    }else{
      window.alert("you are not authorized to generate report");
    }

   
  }
  getSeedRecord(){
    if(this.roleId==='1'){
      this.router.navigate(['/seedRecord']);
    }
    else{
      window.alert("you are not authorized ");
    }}



    getMoistureRecordDetail(){
      if(this.roleId==='1'){
        this.router.navigate(['/moistureRecord']);
      }
      else{
        window.alert("you are not authorized");
      }
    }
    getPhysicalRecord(){
      if(this.roleId==='1'){
        this.router.navigate(['/physicalRecord']);
      }
      else{
        window.alert("you are not authorized");
      }
    }
    getGerminationRecord(){
      if(this.roleId==='1'){
        this.router.navigate(['/germinationRecord']);
      }
      else{
        window.alert("you are not authorized");
      }
    }
    getRedRiceRecord(){
      if(this.roleId==='1'){
        this.router.navigate(['/redRiceRecord']);
      }
      else{
        window.alert("you are not authorized");
      }
    }
            
  
  

  getEmployeeDetail(id){
    var labR={
      "id":this.id
    }
    console.log("id of employee in method "+ this.id);
    this.appService.getEmployeeDetail(labR).subscribe((data:GenericResponse)=>{
      this.detail = data.list;
      this.firstName=this.detail[0].firstName;
      this.lastName=this.detail[0].lastName;
     
      this.name=this.firstName+" "+this.lastName

     localStorage.setItem("name",this.name);
     console.log("my name " +this.firstName);
     console.log("json data : =>   "+JSON.stringify(data))
     console.log("inside local  "+localStorage.getItem("name"));
    });
  }

  

  logout(){
    this.authService.logout();
  }
  
}
