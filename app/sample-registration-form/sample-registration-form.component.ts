import { Component, OnInit,Input } from '@angular/core';
import {sampleRegister} from '../sampleRegister';
import {AppService } from '../app.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import {GenericResponse} from '../genericResponse';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../auth.service';
import {CropResponse} from '../CropResponse';
import {VarietyResponse} from '../VarietyResponse';
import { RegionResponse } from '../RegionResponse';
import { TownResponse } from '../TownResponse';
import { SeedClassResponse } from '../SeedClassResponse';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
 

@Component({
  selector: 'app-sample-registration-form',
  templateUrl: './sample-registration-form.component.html',
  styleUrls: ['./sample-registration-form.component.css']
})
export class SampleRegistrationFormComponent implements OnInit {
 
  public name4:string;
  public roleId4:string;
  public empId:string;
  public labRefrenceCode:string;

  currentYear=(new Date()).getFullYear();
  nextPreviousYear=(new Date()).getFullYear()-2;
  previousYear=(new Date()).getFullYear()-1;
  nextYear=(new Date()).getFullYear()+1;
  nextToNextYr=(new Date()).getFullYear()+2;
  years:number[];

  constructor(private route: ActivatedRoute,private authService:AuthService,private appService:AppService,private router:Router,private modalService: NgbModal) { 
    this.name4=localStorage.getItem("name");
    this.roleId4=localStorage.getItem("roleId");
    this.empId = localStorage.getItem('id');
    this.getCrop();
    this.getRegion();
    this.getSeedClass();

    if(this.roleId4==='1'){
      this.route.queryParams.subscribe(params=>{
        this.labRefrenceCode=params["labRfrenceCode"];
        
         });
         this.getSeedRecordLab();        
    }

    
  this.model.dateOfReceipt=new Date().toISOString().substring(0, 10);

  this.years=[this.nextPreviousYear,this.previousYear,this.currentYear,this.nextYear,this.nextToNextYr];
      
  
  }
  




  getDashboard(){
    this.router.navigate(['/dashboard']);
  }

  getSampleRegistration(){
    this.router.navigate(['/sampleRegistrationForm']);
  }
 
  getGenerateReport(){
    if(this.roleId4==='1'|| this.roleId4==='3'){
      this.router.navigate(['/generateReport']);
    }else{
      window.alert("you are not authorized to generate reoprt");
    }
   

  }

   
    
     
  

   model=new sampleRegister('','','','','','','','','','','','','','','','','','','','','','','','');

   

   public detail:GenericResponse; 
   
   

   alltest:string;
   germinationTest:string;
   moistureTest:string;
   physicalPurityTest:string;
   redRiceTest:string;
   

  



  ngOnInit() {
    
  }
options:any;
optionSelected:any;
options1:any;
optionSelected1:any;
options2:any;   //get region
optionSelected2:any;  //get region
options3:any;  // get town
optionSelected3:any; //get town
options4:any;  // get village track 
optionSelected4:any; //get village track
options5:any;  // get village
optionSelected5:any; //get village

optionsSelected6:any;//year
optionsSelected7:any//season
optionsSelected8:any;//senderCatagory;
options9:any; // seed class;
optionsSelected9:any;  //seed class;


          public getSeedClass(){
            this.appService.getSeedClass().subscribe((data:SeedClassResponse)=>{
              this.options9=data.list;
              console.log("seed class method call "+JSON.stringify(data));
            });
          }
          
          onOptionSelected6(event){
            this.optionsSelected6=event.target.value;
          }
          onOptionSelected7(event){
            this.optionsSelected7=event.target.value;
          }
          onOptionSelected9(event){
            this.optionsSelected9=event.target.value;
          }
          
        public getRegion(){
          this.appService.getRegion().subscribe((data:RegionResponse)=>{
              this.options2=data.list;
              console.log(JSON.stringify(data));
          });
        }
         onOptionSelected2(event){

        this.optionSelected2 = event.target.value; //option value will be sent as event
        
        this.getVillageTrackOnTownId(null);
        this.getVillageByVillageTrackId(null);
          this.getTownShipByStateId(this.optionSelected2);
        }
        getTownShipByStateId(value){
          var req={
          "id":value
          }
          this.appService.getTownShipByStateId(req).subscribe((data:TownResponse)=>{
            console.log("id===>  "+value);
            this.options3=data.list;
          });
        }
 
        onOptionSelected3(event){
          this.optionSelected3=event.target.value;
          this.getVillageByVillageTrackId(null);
          this.getVillageTrackOnTownId(this.optionSelected3);
        }
 
        getVillageTrackOnTownId(value){
         var req={
           "id":value
        }
        console.log("village track method invoked with id ==> "+value);
         this.appService.getVillageTrackOnTownId(req).subscribe((data:TownResponse)=>{
          this.options4=data.list;
          console.log("data of town == >   "+JSON.stringify(data));
         });
        }
        onOptionSelected4(event){
          this.optionSelected4=event.target.value;
         this.getVillageByVillageTrackId(this.optionSelected4);
        }
  
        getVillageByVillageTrackId(value){
         console.log("village method invoked with id ==> "+value);
         var req={
           "name":value
         }
         this.appService.getVillageByVillageTrackId(req).subscribe((data:TownResponse)=>{
                this.options5=data.list;     
                console.log("message from village api=>   "+data.message);
         });
       }
       onOptionSelected5(event){
         this.optionSelected5=event.target.value;
       }




      onOptionSelected8(event){
        this.optionsSelected8 = event.target.value; 
      }


      


        public getCrop(){
          this.appService.getCrop().subscribe((data:CropResponse)=>{
            
              this.options=data.list;
              console.log("value of crop "+this.options);

        });
      }
      

      onOptionSelected(event){
        if(this.options)
        this.optionSelected = event.target.value; //option value will be sent as event
        console.log("crop => "+this.optionSelected);
        this.model.variety=null;
          this.getVariety(this.optionSelected);
        
      }
     
  
      getVariety(value){
        var req={
          "id":value
        }
        this.appService.getVariety(req).subscribe((data:VarietyResponse)=>{
       
         this.options1=data.list
        });
      }
      onOptionSelected1(event){
        this.optionSelected1 = event.target.value;
        this.model.variety=this.optionSelected1;
      }
      

      selectAll(){
        console.log("method called: "+this.model.allTest);

       if( this.model.allTest){
        console.log("method called: true");
        this.model.germinationTest="true";
        this.model.physicalPurityTest="true";
        this.model.redRiceTest="true";
        this.model.moistureTest="true";
      }
      if(!this.model.allTest){
        console.log("method called: false 1111");
        this.model.germinationTest="";
        this.model.physicalPurityTest="";
        this.model.redRiceTest="";
        this.model.moistureTest="";
      }
      }


      variety:string;


      public sampleAdd(form: NgForm){
        if(this.roleId4==='1'){
          this.updateSeedRegistration();
        }
        if(this.roleId4==='2'){
          this.addRegister(form);
        }
      }
      
        public addRegister(form: NgForm){
          if(this.optionSelected===7){
            this.variety=this.optionSelected1
            console.log("my variety -  =>  "+this.variety)
          }else{
            this.variety=this.model.variety
          }
         
           

             if(this.model.germinationTest){
              this.germinationTest="1";
            }else{  
              this.germinationTest="0";
            }
            if(this.model.physicalPurityTest){
              this.physicalPurityTest="1";
            }else{
              this.physicalPurityTest="0";
            }
            if(this.model.moistureTest){
              this.moistureTest="1";
            }else{
              this.moistureTest="0";
            }
            if(this.model.redRiceTest){
              this.redRiceTest="1";
            }else{
              this.redRiceTest="0";
            }
           
           

          

          var register={
       
           "issueDate":this.model.issueDate,
              "senderName":this.model.senderName,
            "state":this.optionSelected2,
            "township":this.optionSelected3,
             "villageTrack":this.optionSelected4,
            "village":this.optionSelected5,
          "senderCatagory":this.optionsSelected8,
               "dateOfReceipt":this.model.dateOfReceipt,
                "crop":this.optionSelected,
              "variety":this.model.variety,
              "lotNo":this.model.lotNo,
              "seedClass":this.optionsSelected9,
              "sampleQty":this.model.sampleQty,
            "packing":this.model.packing,
             "allTest":this.alltest,
             "germinationTest":this.germinationTest,
            "moistureTest":this.moistureTest,
             "physicalPurityTest":this.physicalPurityTest,
             "redRiceTest":this.redRiceTest,
            "year":this.optionsSelected6,
             "season":this.optionsSelected7,
             "region":this.optionSelected2,
             "lot_size":this.model.lot_size,
             "empId":this.empId,
             "seedSource":this.model.seedSource
               
         };
         this.appService.addSample(register).subscribe((data:GenericResponse)=>
         {
           
        this.detail=data;
        if(this.detail.statusCode!==0){
          Swal({type: 'error', 
          position: 'center',
          title: this.detail.status,
          text: this.detail.message,
              
          }
        
        )
        
        }else{
              Swal({
            type: 'success'  ,
            position: 'center',
            title: this.detail.status,
            text: this.detail.message,
                    
              })
              form.reset();
            }
           
         }
         );
          
      
        }

/* ============        from here seed  update  ===================================*/

     senderCatagory:string;     
  

        getSeedRecordLab(){
          var req={
                "labReferenceNumber":this.labRefrenceCode
           }
           this.appService.getSeedRecordLab(req).subscribe(data=>{

             console.log("seed update   "+JSON.stringify(data["list"]));
             
             data["list"][0].senderName;


             this.model.issueDate=data["list"][0].issueDate;
            this.model.senderName=data["list"][0].senderName;
            this.model.villageTrack= data["list"][0].villageTrack;

      /*============= setting catagory value===================*/
        this.senderCatagory=data["list"][0].senderCatagory;
        
        if(this.senderCatagory==='Seed Farms'){
          this.model.senderCatagory='1';
        }
        if(this.senderCatagory==='Seed Grower Association Members'){
          this.model.senderCatagory='2';
        }
        if(this.senderCatagory==='Seed Growers'){
          this.model.senderCatagory='3';
        }
        if(this.senderCatagory==='Seed Company'){
          this.model.senderCatagory='4';
        }
        if(this.senderCatagory==='NGOs, LNGOs'){
          this.model.senderCatagory='5';
        }
        if(this.senderCatagory==='Others'){
          this.model.senderCatagory='6';
        }
        
        this.optionsSelected8=this.model.senderCatagory;

     /*=============end of setting catagory value===================*/
         

              this.model.dateOfReceipt=data["list"][0].dateOfReceipt;
             this.model.lotNo=data["list"][0].lotNo;
             this.model.sampleQty=data["list"][0].sampleQty;
         this.model.packing=data["list"][0].packing;
           this.model.year=data["list"][0].year;

            
           /*============= setting season value===================*/

           this.model.season=data["list"][0].season;
           this.model.cropId=data["list"][0].cropId;
           this.getVariety(this.model.cropId);
           this.model.variety=data["list"][0].variety;
           this.model.seedClassID=data["list"][0].seedClassID;
           this.model.regionId=data["list"][0].regionId;
            
      

           this.getTownShipByStateId(this.model.regionId);
           this.model.townshipId=data["list"][0].townshipId;
           this.getVillageTrackOnTownId(this.model.townshipId);
           this.model.villageTrack=data["list"][0].villageTrack;
           this.getVillageByVillageTrackId(this.model.villageTrack);
           this.model.villageId=data["list"][0].villageId;  
           this.model.packing=data["list"][0].packing;


                 /*=============end of setting season value===================*/

          this.model.lot_size=data["list"][0].lot_size;
            this.empId=data["list"][0].empId;
            this.model.seedSource=data["list"][0].seedSource;
   
              /*============= setting seed Test check===================*/



            this.alltest=data["list"][0].allTest;
             let germinationTest=data["list"][0].germinationTest;
             let moistureTest=data["list"][0].moistureTest;
             let physicalPurityTest=data["list"][0].physicalPurityTest;
             let redRiceTest=data["list"][0].redRiceTest;

           if(germinationTest=="1" && moistureTest=="1" && physicalPurityTest=="1" && redRiceTest=="1"){
            console.log("method called: true");
            this.model.allTest="true";
            this.model.germinationTest="true";
            this.model.physicalPurityTest="true";
            this.model.redRiceTest="true";
            this.model.moistureTest="true";
          }
          if(germinationTest=="1"){
            this.model.germinationTest="true";
          }
          if(moistureTest=="1"){
            this.model.moistureTest="true";
          }
          if(physicalPurityTest=="1"){
            this.model.physicalPurityTest="true";
          }
          if(redRiceTest=="1"){
            this.model.redRiceTest="true";
          }

             /*=============end of setting seed Test check===================*/

            /*=============setting all option selected value from drop down Test check===================*/ 
            this.optionSelected=this.model.cropId;
            this.optionSelected2=this.model.regionId;
             this.optionSelected3=this.model.townshipId;
             this.optionSelected4=this.model.villageTrack;
             this.optionSelected5=this.model.villageId;
             this.optionsSelected6=this.model.year;
             this.optionsSelected7=this.model.season;
             this.optionsSelected9=this.model.seedClassID;
           this.optionSelected1=this.model.variety;
            /*=============setting all option selected value from drop down Test check===================*/ 


           })
         }  

         updateSeedRegistration(){
          if(this.optionSelected===7){
            this.variety=this.optionSelected1
            console.log("my variety -  =>  "+this.variety)
          }else{
            this.variety=this.model.variety
          }
         
           

             if(this.model.germinationTest){
              this.germinationTest="1";
            }else{  
              this.germinationTest="0";
            }
            if(this.model.physicalPurityTest){
              this.physicalPurityTest="1";
            }else{
              this.physicalPurityTest="0";
            }
            if(this.model.moistureTest){
              this.moistureTest="1";
            }else{
              this.moistureTest="0";
            }
            if(this.model.redRiceTest){
              this.redRiceTest="1";
            }else{
              this.redRiceTest="0";
            }
           
           

          

          var register={
       
           "issueDate":this.model.issueDate,
              "senderName":this.model.senderName,
            "state":this.optionSelected2,
            "township":this.optionSelected3,
             "villageTrack":this.optionSelected4,
            "village":this.optionSelected5,
          "senderCatagory":this.optionsSelected8,
               "dateOfReceipt":this.model.dateOfReceipt,
                "crop":this.optionSelected,
              "variety":this.model.variety,
              "lotNo":this.model.lotNo,
              "seedClass":this.optionsSelected9,
              "sampleQty":this.model.sampleQty,
            "packing":this.model.packing,
             "allTest":this.alltest,
             "germinationTest":this.germinationTest,
            "moistureTest":this.moistureTest,
             "physicalPurityTest":this.physicalPurityTest,
             "redRiceTest":this.redRiceTest,
            "year":this.optionsSelected6,
             "season":this.optionsSelected7,
             "region":this.optionSelected2,
             "lot_size":this.model.lot_size,
             "empId":this.empId,
             "seedSource":this.model.seedSource,
               "labReferenceCode":this.labRefrenceCode
         };
         this.appService.updateSeedRegistration(register).subscribe((data:GenericResponse)=>
         {
           
        this.detail=data;
        if(this.detail.statusCode!==0){
          Swal({type: 'error', 
          position: 'center',
          title: this.detail.status,
          text: this.detail.message,
              
          }
        
        )
        
        }else{
              Swal({
            type: 'success'  ,
            position: 'center',
            title: this.detail.status,
            text: this.detail.message,
                    
              })
             this.router.navigate([('seedRecord')]);
            }
           
         }
         );

      
         }


 /* ============ logout method ================= */        
        logout(){
          this.authService.logout();
        }
      
}
