import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { GenericResponse } from '../genericResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-component',
  templateUrl: './forget-component.component.html',
  styleUrls: ['./forget-component.component.css']
})
export class ForgetComponentComponent implements OnInit {

  constructor(private appService:AppService,private router:Router) { }

  ngOnInit() {
  }
 email:string;
 detail:GenericResponse;
  getForgetPassword(){
    var req={
      "emailId":this.email
    };
    this.appService.getForgetPassword(req).subscribe((data:GenericResponse)=>{
                this.detail=data;
               console.log("response=>  "+JSON.stringify(data));
                
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
                      })}
          
      console.log("email address for forgetmPassword => "+this.email);

    });
  }
  loginPage(){
    this.router.navigate(['/login']);
  }

}
