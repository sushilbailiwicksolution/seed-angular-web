import { Component, OnInit } from '@angular/core';
import {PhysicalRecord} from '../physical-record';
import {AppService } from '../app.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import {GenericResponse} from '../genericResponse';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-physical-purity-record',
  templateUrl: './physical-purity-record.component.html',
  styleUrls: ['./physical-purity-record.component.css']
})
export class PhysicalPurityRecordComponent implements OnInit {
  model=new PhysicalRecord('','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','') ; 
    /*=====================================================*/
    weightOfSample:any;
    pureSeed:any;
   inertMatter:any;
   otherCropSeeds:any;
   weed:any;

   weightOfSampleR:any;
   pureSeedR:any;
   inertMatterR:any;
   otherCropSeedsR:any;
   weedReplica:any;
pureSeedPer:number;
inertSeedPer:number;
otherSeedPer:number;
weedSeedPer:number;
pureSeedPerR:number;
inertSeedPerR:number;
otherSeedPerR:number;
weedSeedPerR:number;
/*=======================================================*/
 

  public name3:string;
  public labRefrenceCode:string;
  public roleId3:string;
  constructor(private router: ActivatedRoute,private authService:AuthService,private appService:AppService,private route:Router,private modelServices:NgbModal) { 
    this.name3=localStorage.getItem("name");
    this.roleId3=localStorage.getItem("roleId");
    this.router.queryParams.subscribe(params=>{
      this.labRefrenceCode=params["labRfrenceCode"];
      
       });
       this.getTestReportData();
  }

  getTestReportData(){
    this.getCalculatedValues();
    var req={
      "labReferenceNumber":this.labRefrenceCode,
      "operationType":"physicalTest"
    }
   this.appService.getTestReportData(req).subscribe(data=>{
     
     console.log("data to update => "+ JSON.stringify(data));
    
     this.model.labReferenceCode=data["list"][0].labReferenceCode;
     this.model.dateOfReceipt=data["list"][0].dateOfReceipt;
     this.model.dateOfTest=data["list"][0].dateOfTest;
     this.model.cropName=data["list"][0].cropName;
     this.model.variety=data["list"][0].variety;
     this.model.seedClass=data["list"][0].seedClass;
     this.model.pureSeed=data["list"][0].pureSeed;
     this.model.weightOfSample=data["list"][0].weightOfSample;
     this.model.inertMatter=data["list"][0].inertMatter;
     this.model.otherCropSeeds=data["list"][0].otherCropSeeds;
     this.model.inOfAnalyst=data["list"][0].inOfAnalyst;
     this.model.cropId=data["list"][0].cropId;
     this.model.seedClassId=data["list"][0].seedClassId;
     this.model.update=data["list"][0].update;
     this.model.pureSeedR=data["list"][0].pureSeedR;
     this.model.weightOfSampleR=data["list"][0].weightOfSampleR;
     this.model.inertMatterR=data["list"][0].inertMatterR;
     this.model.otherCropSeedsR=data["list"][0].otherCropSeedsR;
     this.model.avWtOfSample=data["list"][0].avWtOfSample;
     this.model.avWtOfPureSeed=data["list"][0].avWtOfPureSeed;
     this.model.avWtOfInert=data["list"][0].avWtOfInert;
     this.model.avOtherCrop=data["list"][0].avOtherCrop;
     this.model.physicalPurity=data["list"][0].physicalPurity;
     this.model.otherCropPer=data["list"][0].otherCropPer;
     this.model.inertPer=data["list"][0].inertPer;
     this.model.weed=data["list"][0].weed;
     this.model.weedReplica=data["list"][0].weedReplica;
     this.model.weedAverage=data["list"][0].weedAverage;
     this.model.weedPercentage=data["list"][0].weedPercentage;
     this.model.empId=data["list"][0].empId;
  
      
     
     

    //  this.model.pureSeedPer=(+this.model.pureSeed*100)/(+this.model.weightOfSample);
       console.log("check value  =>>> "+this.model.pureSeed+" wt of new sample "+this.model.weightOfSample);
    
      
      

    //   //  this.model.inertSeedPer=(+this.model.inertMatter*100)/(+this.model.weightOfSample);
    //   //  this.model.otherSeedPer=(+this.model.otherCropSeeds*100)/(+this.model.weightOfSample);
    //   //  this.model.weedSeedPer=(+this.model.weed*100)/(+this.model.weightOfSample);
    //   //  this.model.pureSeedPerR=(+this.model.pureSeedR*100)/(+this.model.weightOfSampleR);
    //   //  this.model.inertSeedPerR=(+this.model.inertMatterR*100)/(+this.model.weightOfSampleR);
    //   //  this.model.otherSeedPerR=(+this.model.otherCropSeedsR*100)/(+this.model.weightOfSampleR);
    //   //  this.model.weedSeedPerR=(+this.model.weedReplica*100)/(+this.model.weightOfSampleR);

      
      

   })
  }

 


  getCalculatedValues(){
   
    this.weightOfSample=parseFloat(this.model.weightOfSample);

    this.pureSeed= parseFloat(this.model.pureSeed);
    this.inertMatter=parseFloat(this.model.inertMatter);
    this.otherCropSeeds=parseFloat(this.model.otherCropSeeds);
    this.weed=parseFloat(this.model.weed); 
 
    this.weightOfSampleR=parseFloat(this.model.weightOfSampleR);
    this.pureSeedR=parseFloat(this.model.pureSeedR);
    this.inertMatterR=parseFloat(this.model.inertMatterR);
    this.otherCropSeedsR=parseFloat(this.model.otherCropSeedsR);
    this.weedReplica=parseFloat(this.model.weedReplica);
      
  this.pureSeedPer=(this.pureSeed*100)/(this.weightOfSample).toFixed(2);
  this.inertSeedPer=(this.inertMatter*100)/(this.weightOfSample).toFixed(2);
  this.otherSeedPer=(this.otherCropSeeds*100)/(this.weightOfSample).toFixed(2);
  this.weedSeedPer=(this.weed*100)/(this.weightOfSample).toFixed(2);

  this.pureSeedPerR=(this.pureSeedR*100)/(this.weightOfSampleR).toFixed(2);
  this.inertSeedPerR=(this.inertMatterR*100)/(this.weightOfSampleR).toFixed(2);
  this.otherSeedPerR=(this.otherCropSeedsR*100)/(this.weightOfSampleR).toFixed(2);
  this.weedSeedPerR=(this.weedReplica*100)/(this.weightOfSampleR).toFixed(2);
     console.log("percentage value ==> "+this.pureSeedPer+"   "+this.model.pureSeed+"    "+this.pureSeed);
     console.log("percentage value ==> "+this.inertSeedPer);

     this.model.avWtOfSample=((this.weightOfSample+this.weightOfSampleR)/2).toFixed(2).toString();
     this.model.avWtOfPureSeed=((this.pureSeed+this.pureSeedR)/2).toFixed(2).toString();
     this.model.avWtOfInert=((this.inertMatter+this.inertMatterR)/2).toFixed(2).toString();
     this.model.avOtherCrop=((this.otherCropSeeds+this.otherCropSeedsR/2)).toFixed(2).toString();
     this.model.weedAverage=((this.weed+this.weedReplica/2)).toFixed(2).toString();

     this.model.inertPer=((this.inertSeedPer+this.inertSeedPerR)/2).toFixed(2).toString();
     this.model.otherCropPer=((this.otherSeedPer+this.otherSeedPerR)/2).toFixed(2).toString();
     this.model.physicalPurity=((this.pureSeedPer+this.pureSeedPerR)/2).toFixed(2).toString();
     this.model.weedPercentage=((this.weedSeedPer+this.weedSeedPerR)/2).toFixed(2).toString();
  }

  addPhysicalPurity(){
    this.getCalculatedValues();
var physical={
  
  labReferenceCode:this.model.labReferenceCode,
  dateOfReceipt:this.model.dateOfReceipt,
  dateOfTest:this.model.dateOfTest,
  cropName:this.model.cropId,
  variety:this.model.variety,
  seedClass:this.model.seedClassId,
  pureSeed: this.model.pureSeed,
  weightOfSample:this.model.weightOfSample,
  inertMatter:this.model.inertMatter,
  otherCropSeeds:this.model.otherCropSeeds,
  inOfAnalyst: this.model.inOfAnalyst,
  cropId:this.model.cropId,
  seedClassId: this.model.seedClassId,
  update:this.model.update,
  pureSeedR:this.model.pureSeedR,
  weightOfSampleR:this.model.weightOfSampleR,
  inertMatterR:this.model.inertMatterR,
  otherCropSeedsR:this.model.otherCropSeedsR,
  avWtOfSample:this.model.avWtOfSample,
  avWtOfPureSeed:this.model.avWtOfPureSeed,
  avWtOfInert:this.model.avWtOfInert,
  avOtherCrop:this.model.avOtherCrop,
  physicalPurity:this.model.physicalPurity,
  otherCropPer:this.model.otherCropPer,
  inertPer:this.model.inertPer,
  weed:this.model.weed,
  weedReplica:this.model.weedReplica,
  weedAverage:this.model.weedAverage,
  weedPercentage:this.model.weedPercentage,
  "empId":localStorage.getItem('id')
};

this.appService.updatePhysicalPurity(physical).subscribe((data:GenericResponse)=>{
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
     this.route.navigate(['physicalRecord']);
    }
});



  }

  getDashboard(){
    this.route.navigate(['/dashboard']);
  }
  
  getSampleRegistration(){
    this.route.navigate(['/sampleRegistrationForm']);
  }
  getMoistureRecord(){
    this.route.navigate(['/moistureTestingRecord']);
  }
  getPhysicalPurityRecord(){
    this.route.navigate(['/physicalPurity']);
  }
  getGerminationTesting(){
    this.route.navigate(['/germinationTesting']);
  }
  getGenerateReport(){
    if(this.roleId3==='1'|| this.roleId3==='3'){
      this.route.navigate(['/generateReport']);
    }else{
      window.alert("you are not authorized to generate reoprt");
    }
   
  }


  public detail:GenericResponse;

  ngOnInit() {
   // this.getCalculatedValues();
  }
  updatePhysicalPurity(){
    var purity={
        
       
    };
    this.appService.updatePhysicalPurity(purity).subscribe((data:GenericResponse)=>{
      this.detail = data;
     console.log(this.detail);
     window.alert(this.detail.message);
    });
  }

  logout(){
    this.authService.logout();
  }
  }

