import {Injectable} from '@angular/core';
import {Router}    from '@angular/router';

@Injectable()
export class AuthService1{

   
    constructor(private router:Router){

    }

   
    isLoggedIn1(){
        
            return ( localStorage.getItem("status")==="success")  
        
        
       
    }
    logout(){
        localStorage.removeItem("status");
        localStorage.removeItem("roleId");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        this.router.navigate(["/login"]);
    }
}