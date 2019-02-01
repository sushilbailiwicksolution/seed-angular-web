import { Component, OnInit } from '@angular/core';
import {Login} from '../login';
import {AppService } from '../app.service';
import {GenericResponse} from '../genericResponse';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   private loginDetail: Array<object>=[];
   constructor(private appService:AppService,private router:Router){
            
   }
  


   loginForm: FormGroup;
   message: string;
   returnUrl: string;
  model = new Login( '',  '');  
  public detail:GenericResponse;
    
  
  

  submitted = false;
 
 onSubmit() {  
   
    if(this.model.email===''|| this.model.password==='' || this.detail.statusCode===1){
      this.router.navigate(['/login']);
    
    }else if(this.detail.statusCode===-1){
      this.router.navigate(['/login']);
     
    }
    else if(this.detail.statusCode===0){
      if(this.detail.roleId==='2'){
        this.router.navigate(['/sampleRegistrationForm']); 
      }else{
             
      this.router.navigate(['/dashboard']);  
      }
    localStorage.setItem("id",this.detail.employeeId);
    localStorage.setItem("status",this.detail.status);
    localStorage.setItem("roleId",this.detail.roleId);
    console.log("roleId==>   "+this.detail.roleId );
    }

 }
 
 ngOnInit() {
  
}
    
   public getLogin(){
     var loginEmail={
       emailId:this.model.email,
       password:this.model.password
     };
     this.appService.getLogin(loginEmail).subscribe((data:GenericResponse)=>
      {
        
        this.detail = data;
        console.log(JSON.stringify(data));

        if(this.detail.statusCode!==0){
        Swal({
          type: 'error'   ,
          position: 'center',
          title: this.detail.status,
          text: this.detail.message,
                
        })}
        else{
          Swal({
            type: 'success'   ,
            position: 'center',
            title: this.detail.status,
            text: this.detail.message,
                  
          })}
       

         



        this.onSubmit();
        
      }

      );
      
   }
     public forgtePassword(){
       console.log("routing forget method call")
      this.router.navigate(['/forgetPassword']);
     }


  }