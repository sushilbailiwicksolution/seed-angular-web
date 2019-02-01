import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { RedRiceTestingRecords } from '../red-rice-records';
import { GenericResponse } from '../genericResponse';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AuthService1 } from '../auth.service1';
@Component({
  selector: 'app-red-rice-testing-record',
  templateUrl: './red-rice-testing-record.component.html',
  styleUrls: ['./red-rice-testing-record.component.css']
})
export class RedRiceTestingRecordComponent implements OnInit {
  redRicePer500Rep: number;
  redRicePer500: number;
  optionSelected: any;
  public name3:string;
  public labRefrenceCode:string;
  public roleId3:string;
  method:string;
    public model=new RedRiceTestingRecords('','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','');
    public detail:GenericResponse;
  constructor(private route: ActivatedRoute,private authService1:AuthService1,private router:Router,private appService:AppService) { 
    this.name3=localStorage.getItem("name");
    this.roleId3=localStorage.getItem("roleId");
    this.route.queryParams.subscribe(params=>{
      this.labRefrenceCode=params["labRfrenceCode"];
      console.log("inside the constructer==>"+this.labRefrenceCode);
      
       });
       this.getTestReportData();
  }
  getResponse:any;
  getTestReportData(){
    var req={
      "labReferenceNumber":this.labRefrenceCode,
      "operationType":"redRiceTest"
    }
   this.appService.getTestReportData(req).subscribe(data=>{
     console.log("data to update => "+ JSON.stringify(data["list"]));

      this.getResponse=data;
      this.method=data["list"][0].method;
      this.model.dateOfReceipt=data["list"][0].dateOfReceipt;
      this.model.dateOfTest=data["list"][0].dateOfTest;
     this.model.labRefrenceNumber=data["list"][0].labRefrenceNumber;
         this.model.cropName=data["list"][0].cropName;
         this.model.variety=data["list"][0].variety;
        this.model.seedClass=data["list"][0].seedClass;
        this.model.cropId=data["list"][0].cropId;
        this.model.seedClassId=data["list"][0].seedClassId;
         this.model.weightOfWorkingSample=data["list"][0].weightOfWorkingSample;
         this.model.numberRedRiceWorking=data["list"][0].numberRedRiceWorking;
         this.model.numberRedRicePer500=data["list"][0].numberRedRicePer500;
         this.model.weightOfWorkingSampleR=data["list"][0].weightOfWorkingSampleR;
         this.model.numberRedRiceWorkingR=data["list"][0].numberRedRiceWorkingR;
         this.model.analystSignature=data["list"][0].analystSignature;
         this.model.acceptable=data["list"][0].acceptable;
         if(this.method==="Satake Machine Dehulling"){
          this.model.method="Satake Machine Dehulling";
          this.model.methodId='1';
          
        }
        if(this.method==="Water Soak"){
          this.model.method="Water Soak"
          this.model.methodId='2';
        }
        this.numberRedRiceWorking=parseInt(this.model.numberRedRiceWorking);
        this.weightOfWorkingSample =parseInt(this.model.weightOfWorkingSample);
        this.numberRedRiceWorkingR=parseInt(this.model.numberRedRiceWorkingR);
        this.weightOfWorkingSampleR =parseInt(this.model.weightOfWorkingSampleR);
  
  
        this.redRicePer500= (this.numberRedRiceWorking * 500) / this.weightOfWorkingSample;
       console.log("calculated value= >   "+this.redRicePer500,'   numberRedRiceWorking=> '+this.numberRedRiceWorking+' weightOfWorkingSample=>   '+this.weightOfWorkingSample);
       this.redRicePer500Rep= (this.numberRedRiceWorkingR * 500) /this. weightOfWorkingSampleR;
       console.log("calculated value rep= >   "+this.redRicePer500Rep);
       this.model.numberRedRicePer500=((this.redRicePer500+this.redRicePer500Rep)/2).toString();
      

      
      

   })
  }

    numberRedRiceWorking:any;
    weightOfWorkingSample:any
    numberRedRiceWorkingR:any;
    weightOfWorkingSampleR:any;
     getAllValue(){
      this.numberRedRiceWorking=parseInt(this.model.numberRedRiceWorking);
      this.weightOfWorkingSample =parseInt(this.model.weightOfWorkingSample);
      this.numberRedRiceWorkingR=parseInt(this.model.numberRedRiceWorkingR);
      this.weightOfWorkingSampleR =parseInt(this.model.weightOfWorkingSampleR);


      this.redRicePer500= (this.numberRedRiceWorking * 500) / this.weightOfWorkingSample;
     console.log("calculated value= >   "+this.redRicePer500,'   numberRedRiceWorking=> '+this.numberRedRiceWorking+' weightOfWorkingSample=>   '+this.weightOfWorkingSample);
     this.redRicePer500Rep= (this.numberRedRiceWorkingR * 500) /this. weightOfWorkingSampleR;
     console.log("calculated value rep= >   "+this.redRicePer500Rep);
     this.model.numberRedRicePer500=((this.redRicePer500+this.redRicePer500Rep)/2).toString();
     }




  onOptionSelected(event){
    this.optionSelected=event.target.value;
    
    console.log("in option select method => "+this.optionSelected)
     if(this.optionSelected==="1"){
       this.model.method="Satake Machine Dehulling"
     } if(this.optionSelected==="2"){
      this.model.method="Water Soak"
    } 
     
}
  addredriceform(form: NgForm){
    this.getAllValue();
    var redrice={
      dateOfReceipt:this.model.dateOfReceipt,
      dateOfTest:this.model.dateOfTest,
      labRefrenceNumber: this.model.labRefrenceNumber,
      cropName: this.model.cropId,
      variety:this.model.variety,
      seedClass:this.model.seedClassId,
      method:this.model.method,
      weightOfWorkingSample:this.model.weightOfWorkingSample,
      numberRedRiceWorking:this.model.numberRedRiceWorking,
      numberRedRicePer500:this.model.numberRedRicePer500,
      weightOfWorkingSampleR:this.model.weightOfWorkingSampleR,
      numberRedRiceWorkingR:this.model.numberRedRiceWorkingR,
      
      analystSignature: this.model.analystSignature,
      acceptable:this.model.acceptable,
      "empId":localStorage.getItem('id')
    };
    console.log("Every data in redrice===>"+JSON.stringify(redrice));
    this.appService.updateRedRice(redrice).subscribe((data:GenericResponse)=>{
      this.detail = data;
     if(this.detail.statusCode!==0){
      Swal({type: 'error', 
      position: 'center',
      title: this.detail.status,
      text: this.detail.message,
          
      }
    
    ).then
    this.getDashboard();
    }else{
          Swal({
        type: 'success'  ,
        position: 'center',
        title: this.detail.status,
        text: this.detail.message,
         
          })
          this.router.navigate(['/redRiceRecord']);
          
        }
        
    });
  }





  ngOnInit() {
    console.log("inside germinarion "+this.name3);
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
    if(this.roleId3==='1'|| this.roleId3==='3'){
      this.router.navigate(['/generateReport']);
    }else{
      window.alert("you are not authorized to generate reoprt");
    }
   
  }
  logout(){
    this.authService1.logout();
  }
}
