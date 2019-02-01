import {Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router){

    }
   canActivate(next:ActivatedRouteSnapshot,
     state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean
    {
        if(localStorage.getItem("roleId")==='1'){
            this.router.navigate(["/login"]);   
            return false;
        }
      else  if(this.authService.isLoggedIn()){
            return true;
        }else{
            this.router.navigate(["/login"]);
            return false
        }
    }


}




