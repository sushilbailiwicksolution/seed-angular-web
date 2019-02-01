import { Component, OnInit } from '@angular/core';
import { MoistureTestingRecords } from '../moisture-testing-records';
import {AppService } from '../app.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import {GenericResponse} from '../genericResponse';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-moisture-testing',
  templateUrl: './moisture-testing.component.html',
  styleUrls: ['./moisture-testing.component.css']
})
export class MoistureTestingComponent implements OnInit {
  optionSelected: any;
  method:string;
  public name2:string;
  public roleId2:string;
  public labRefrenceCode:string;
  constructor(private route: ActivatedRoute,private authService:AuthService,private appService:AppService,private router:Router,private modalService: NgbModal) {
    this.name2=localStorage.getItem("name");
    this.roleId2=localStorage.getItem("roleId");
    this.route.queryParams.subscribe(params=>{
   this.labRefrenceCode=params["labRfrenceCode"];
   
    });
    this.getTestReportData();
         
   }
   
   model=new MoistureTestingRecords('','','','','','','','','','','','','','','','','','','','','','','','','','');

   public detail:GenericResponse; 

  ngOnInit() {
    console.log("inside germinarion "+this.name2);
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
    if(this.roleId2==='1'|| this.roleId2==='3'){
      this.router.navigate(['/generateReport']);
    }else{
      window.alert("you are not authorized to generate reoprt");
    }
   
  }
  
  getTestReportData(){
    var req={
      "labReferenceNumber":this.labRefrenceCode,
      "operationType":"moistureTest"
    }
  //  this.appService.getTestReportData(req).subscribe(data=>{
  //    console.log("data to update => "+ JSON.stringify(data));
     this.appService.getTestReportData(req).subscribe(data=>{
      console.log("data to update => "+ JSON.stringify(data["list"]));
 
           this.model.labReferenceCode=data["list"][0].labReferenceCode;
           this.model.dateOfTest=data["list"][0].dateOfTest;

           this.method=data["list"][0].method;
           this.model.dateOfReceipt=data["list"][0].dateOfReceipt;
           this.model.cropName=data["list"][0].cropName;
           this.model.variety=data["list"][0].variety;
           this.model.tempC=data["list"][0].tempC;
           this.model.rh=data["list"][0].rh;
           this.model.wtOfContainer=data["list"][0].wtOfContainer;
           this.model.wtOfSeedContainer=data["list"][0].wtOfSeedContainer;
           this.model.wtOfDrySeedContainer=data["list"][0].wtOfDrySeedContainer;
           this.model.wtOfContainerR1=data["list"][0].wtOfContainerR1;
           this.model.wtOfSeedContainerR1=data["list"][0].wtOfSeedContainerR1;
           this.model.wtOfDrySeedContainerR1=data["list"][0].wtOfDrySeedContainerR1;
           this.model.tempOven=data["list"][0].tempOven;
           this.model.meterReading1=data["list"][0].meterReading1;
           this.model.meterReading2=data["list"][0].meterReading2;
           this.model.meterReading3=data["list"][0].meterReading3;
           this.model.seedClass=data["list"][0].seedClass;
           this.model.moistureContent=data["list"][0].moistureContent;
           this.model.inOfAnalyst=data["list"][0].inOfAnalyst;
           this.model.seedClassId=data["list"][0].seedClassId;
           this.model.cropId=data["list"][0].cropId;
          
          
           if(this.method==="Meter"){
            this.model.method="Meter"
            this.model.methodId="1"
          }
          if(this.method==="Oven"){
            this.model.methodId="2"
          }


         
         
         
         
         
         
        
    
   })
  }

  onOptionSelected(event){
    this.optionSelected=event.target.value;
    
    console.log("in option select method => "+this.optionSelected)
     if(this.optionSelected==="1"){
       this.model.method="Meter"
     } if(this.optionSelected==="2"){
      this.model.method="Oven"
    } 
     
}

meterReading1:any;
meterReading2:any;
meterReading3:any;
wtOfContainer:any;
wtOfSeedContainer:any;
wtOfDrySeedContainer:any;
wtOfContainerR1:any;
wtOfSeedContainerR1:any;
wtOfDrySeedContainerR1:any;

    getCalculatedValues(){
      if(this.optionSelected==='1' || this.method==='Meter' || this.optionSelected==='Meter'){
      this.meterReading1=parseFloat(this.model.meterReading1);
      this.meterReading2=parseFloat(this.model.meterReading2);
      this.meterReading3=parseFloat(this.model.meterReading3);
      this.model.moistureContent=((this.meterReading1+this.meterReading2+this.meterReading3)/3).toFixed(2).toString();
      console.log("value in meter == > "+this.model.moistureContent);
    }
      if(this.optionSelected==='2' || this.method==='Oven' || this.optionSelected==='Oven'){
      this.wtOfContainer=parseFloat(this.model.wtOfContainer);
      this.wtOfSeedContainer=parseFloat(this.model.wtOfSeedContainer);
      this.wtOfDrySeedContainer=parseFloat(this.model.wtOfDrySeedContainer);
      this.wtOfContainerR1=parseFloat(this.model.wtOfContainerR1);
      this.wtOfSeedContainerR1=parseFloat(this.model.wtOfSeedContainerR1);
      this.wtOfDrySeedContainerR1=parseFloat(this.model.wtOfDrySeedContainerR1);
       
      let valueNormal=(((this.wtOfSeedContainer-this.wtOfDrySeedContainer)/(this.wtOfDrySeedContainer-this.wtOfContainer))*100).toFixed(2).toString();
        console.log("value in oven == > "+valueNormal+"    check  => "+this.wtOfDrySeedContainer);
     
        let valueNormal1=(((this.wtOfSeedContainerR1-this.wtOfDrySeedContainerR1)/(this.wtOfDrySeedContainerR1-this.wtOfContainerR1))*100).toFixed(2).toString();

        this.model.moistureContent=((parseFloat(valueNormal)+parseFloat(valueNormal1))/2).toFixed(2).toString();
      }
      
    }


  updateMoistureTest(){
    this.getCalculatedValues();
    var moisture={
      labReferenceCode:this.model.labReferenceCode,
      dateOfTest:this.model.dateOfTest,
      method:this.model.method,
      dateOfReceipt:this.model.dateOfReceipt,
      cropName:this.model.cropId,
      variety:this.model.variety,
      seedClass:this.model.seedClassId,
      tempC:this.model.tempC,
      rh:this.model.rh,
      tempOven:this.model.tempOven,
      wtOfContainer:this.model.wtOfContainer,
      wtOfSeedContainer:this.model.wtOfSeedContainer,
      wtOfDrySeedContainer:this.model.wtOfDrySeedContainer,
      wtOfContainerR1:this.model.wtOfContainerR1,
      wtOfSeedContainerR1:this.model.wtOfSeedContainerR1,
      wtOfDrySeedContainerR1:this.model.wtOfDrySeedContainerR1,
      meterReading1:this.model.meterReading1,
      meterReading2:this.model.meterReading2,
      meterReading3:this.model.meterReading3,

       moistureContent:this.model.moistureContent,
       inOfAnalyst:this.model.inOfAnalyst,
       "empId":localStorage.getItem('id')
    };
    this.appService.updateMoistureTest(moisture).subscribe((data:GenericResponse)=>{
      this.detail = data;
     console.log(this.detail);if(this.detail.statusCode!==0){
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
        this.router.navigate(['/moistureRecord']);
          
        }
    });
  }

  logout(){
    this.authService.logout();
  }

}

