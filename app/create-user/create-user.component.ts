import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AppService} from '../app.service';
import { createUser } from '../create_user';
import { GenericResponse } from '../genericResponse';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public id:string ;
  public name:string;
  public roleId:string;
    model=new createUser('','','','','','','','','');

    public detail:GenericResponse;

  constructor(private authService:AuthService,private router:Router,private appService:AppService,private modelServices:NgbModal,private route: ActivatedRoute) { 
    this.id = localStorage.getItem('id');
    console.log("id in dashboard : "+this.id);
  this.roleId=localStorage.getItem('roleId');
  
  this.model.dateOfJoinging=new Date().toISOString().substring(0, 10);
  }




  ngOnInit() {
  }
  getCreateUser(){
    this.router.navigate(['/createUserComponent']);
    console.log("method ");
    }

    getDashboard(){
      this.router.navigate(['/dashboard']);
    }
    getGenerateReport(){
      if(this.roleId==='1'|| this.roleId==='3'){
      this.router.navigate(['/generateReport']);
      }else{
        window.alert("you are not authorized to generate report");
      }

   

}

getTestStatus(){
  this.router.navigate(['/testStatus']);
}
optionSelected1:any;
onOptionSelected1(event){
this.optionSelected1=event.target.value;
}

addUser(){
  if(this.model.password===this.model.confirmPassword){
    var req={
      "firstName":this.model.firstName,
      "lastName":this.model.lastName,
      "mobile":this.model.mobile,
       "address":this.model.address,
       "emailId":this.model.emailId,
       "password":this.model.password,
       "employeeId":this.model.employeeId,
        "roleId":this.optionSelected1,
    } 
       this.appService.addUser(req).subscribe((data:GenericResponse)=>{
         console.log("data from form ==> "+ JSON.stringify(req)+" response from server => "+JSON.stringify(data));
      this.detail=data;
      
         if(this.detail.statusCode!==0){
          Swal({
            type: 'error' ,
            position: 'center',
            title: this.detail.status,
            text: this.detail.message,
                
          })}
          else{
            
              Swal({
                    
            type: 'success' ,
            position: 'center',
            title: this.detail.status,
            text: this.detail.message,    
              })
              this.router.navigate(['/userDetail']);
            }
       });

  }else{
    Swal({
      type: 'error' ,
      position: 'center',
      title: "password",
      text: "Your password and confirm password not same",
              
    })}
    
  }
  logout(){
    this.authService.logout();
  }      
}



