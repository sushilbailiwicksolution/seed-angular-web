import { Component, OnInit } from '@angular/core';
import {AppService } from '../app.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import {GenericResponse} from '../genericResponse';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {GerminationTestingRecord} from '../germination-testing-record';
import {AuthService} from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-germination-testing',
  templateUrl: './germination-testing.component.html',
  styleUrls: ['./germination-testing.component.css']
})
export class GerminationTestingComponent implements OnInit {
  optionSelected: any;
  public name1:string;
  public roleId1:string;
  public labRefrenceCode:string;
  constructor(private route: ActivatedRoute,private authService:AuthService,private appService:AppService,private router:Router,private modelServices:NgbModal ) {
    this.name1=localStorage.getItem("name");
    this.roleId1=localStorage.getItem("roleId");
    this.route.queryParams.subscribe(params=>{
      this.labRefrenceCode=params["labRfrenceCode"];
      
       });
       this.getTestReportData();
   }

  
   
  public model=new GerminationTestingRecord('','','','','','','','','','','','','','','','','','','','','');
  public detail:GenericResponse;
   
  ngOnInit() {
    console.log("inside germinarion "+this.name1);
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
    if(this.roleId1==='1'|| this.roleId1==='3'){
      this.router.navigate(['/generateReport']);
    }else{
      window.alert("you are not authorized to generate reoprt");
    }
   
  }
    
   
  onOptionSelected(event){
      this.optionSelected=event.target.value;
      
      console.log("in option select method => "+this.optionSelected)
       if(this.optionSelected==="1"){
         this.model.method="TP"
       } if(this.optionSelected==="2"){
        this.model.method="BP"
      } if(this.optionSelected==="3"){
        this.model.method="SAND"
      }
       
  }
 getResponse:any;
method:string;
  getTestReportData(){
    var req={
      "labReferenceNumber":this.labRefrenceCode,
      "operationType":"germinationTest"  
    }
   this.appService.getTestReportData(req).subscribe(data=>{
     console.log("data to update => "+ JSON.stringify(data["list"]));

     this.getResponse=data;
        this.model.labReferenceCode=data["list"][0].labReferenceCode;
        this.model.dateOfReceipt=data["list"][0].dateOfReceipt;
        this.model.dateOfPutting=data["list"][0].dateOfPutting;
        this.model.crop=data["list"][0].crop;
        this.model.method=data["list"][0].method;
        this.model.variety=data["list"][0].variety;
        this.model.seedClass=data["list"][0].seedClass;
        this.model.dateOfPutting1=data["list"][0].dateOfPutting1;
        this.model.totalSeeds=data["list"][0].totalSeeds;
        this.model.avNormalSeedlings=data["list"][0].avNormalSeedlings;
        this.model.avAbnormalSeedllings=data["list"][0].avAbnormalSeedllings;
        this.model.avDeadSeedlings=data["list"][0].avDeadSeedlings;
        this.model.avHardFUS=data["list"][0].avHardFUS;
        this.model.finalGermination=data["list"][0].finalGermination;
        this.model.dateOfReport=data["list"][0].dateOfReport;
        this.model.initialsOfAnalyst=data["list"][0].initialsOfAnalyst;
        if(this.model.method==="TP"){
          this.model.methodId="1"
        }
        if(this.model.method==="BP"){
        this.model.methodId="2"
        }
        if(this.model.method==="SAND"){
          this.model.methodId="3"
        }

   })
  }

  updateGerminationTest(){
    
      var germination={
        labReferenceCode:this.model.labReferenceCode,
        dateOfReceipt:this.model.dateOfReceipt,
        dateOfPutting:this.model.dateOfPutting,
        crop:this.getResponse["list"][0].cropId,
        method:this.model.method,
        variety: this.model.variety,
        seedClass: this.getResponse["list"][0].seedClassId,
        dateOfPutting1:this.model.dateOfPutting1,
        totalSeeds:this.model.totalSeeds,
        avNormalSeedlings:this.model.avNormalSeedlings,
        avAbnormalSeedllings:this.model.avAbnormalSeedllings,
        avDeadSeedlings:this.model.avDeadSeedlings,
        avHardFUS:this.model.avHardFUS,
        finalGermination:this.model.finalGermination,
        dateOfReport:this.model.dateOfReport,
         initialsOfAnalyst:this.model.initialsOfAnalyst,
        "empId":localStorage.getItem('id')
      };
      this.appService.updateGerminationTest(germination).subscribe((data:GenericResponse)=>{
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
       this.router.navigate(['germinationRecord']);
          }
      });
    }


    logout(){
      this.authService.logout();
    }
  
  }


