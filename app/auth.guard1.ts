import {Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService1 } from './auth.service1';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard1 implements CanActivate{
    constructor(private authService1:AuthService1,private router:Router){

    }
   canActivate(next:ActivatedRouteSnapshot,
     state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean
    {
        if(localStorage.getItem("roleId")==='2'){
            console.log("roleId"+ localStorage.getItem("roleId"));
            this.router.navigate(["/login"]);
            return false;
        }
        if(this.authService1.isLoggedIn1()){
            return true;
        }else{
            this.router.navigate(["/login"]);
            return false
        }
    }


}




