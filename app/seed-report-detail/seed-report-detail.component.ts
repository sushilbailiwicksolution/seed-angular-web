import { Component, OnInit } from '@angular/core';
import {AppService } from '../app.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,ActivatedRoute
} from '@angular/router';
import {GenericResponse} from '../genericResponse';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {seedReport, GenerateReport} from '../generate-report';

import {SeedReportGenerate,analysisReport} from '../seed_report_generate';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 
import {AuthService} from '../auth.service';
import { SeedStandard, SeedStand } from '../seed-standard';

@Component({
  selector: 'app-seed-report-detail',
  templateUrl: './seed-report-detail.component.html',
  styleUrls: ['./seed-report-detail.component.css']
})
export class SeedReportDetailComponent implements OnInit {
   labCode:any;
   message:string=new Date().toDateString();
   roleId6:string;

  public detail:seedReport[];
  public name:string;
  constructor(private authService:AuthService,private appService:AppService,private router:Router,private modelServices:NgbModal,private route: ActivatedRoute ) { 
    this.roleId6=localStorage.getItem("roleId");
    this.name=localStorage.getItem("name");
   this.route.queryParams.subscribe(params=>{
      this.labCode=params["labRfrenceCode"];
      this.getGeneratedReportByLatRefCode(this.labCode);
      this.getAnalysisResult(this.labCode);
      this.getSeedStandardResult(this.labCode);
    })
      
     
     
  }

 

  ngOnInit() {
  

  
  }
  getDashboard(){
    this.router.navigate(['/dashboard']);
  }

  
  getGenerateReport(){
    if(this.roleId6==='1'|| this.roleId6==='3'){
    this.router.navigate(['/generateReport']);
    }else{
      window.alert("you are not authorized to generate report");
    }
  }

  public senderName:string;
     public address:string;
     public crop:string;
     public variety:string;
     public seedClass:string;
     public qty:string;
     public lotNo:string;
     public dateOfReceipt:string;
     
  getGeneratedReportByLatRefCode(labReference){
    
    console.log("rajnish "+labReference);
    var labR={
      "labReferenceNumber":labReference
    }
    this.appService.getGeneratedReportByLatRefCode(labR).subscribe((data:GenerateReport)=>{
      this.detail = data.listSeedReport;
       
       this.senderName=this.detail[0].senderName;
      this.crop=this.detail[0].crop;
      this.variety=this.detail[0].variety;
      this.seedClass=this.detail[0].seedClass;
      this.qty=this.detail[0].qty;
      this.lotNo=this.detail[0].lotNo;
      this.dateOfReceipt=this.detail[0].dateOfReceipt;

     console.log("report page "+JSON.stringify(data));
    });
  }

  /*==================================================================================*/


  senderCatagory:string;
    region:string;
    township:string;
    villageTrack:string;
    village:string;
    senderName1:string;
    crop1:string;
    year:string;
    season:string;
    variety1:string;
    seedClass1:string;
    lotNo1:string;
    labReferenceNo:string;
    physicalPurity:string;
     germination:string;
    seedMoistureContent:string;
    inertMatter:string;
    otherCropSeed:string;
    weedSeedContent:string;
    redRiceContent:string;
    seedDate:string;  
    lot_size:string; 
    seedSource:string;

    
  public detail1:analysisReport[];

  getAnalysisResult(labReference){
    console.log("rajnish "+labReference);
    var labR={
      "labReferenceNumber":labReference
    }

    this.appService.getAnalysisResult(labR).subscribe((data:SeedReportGenerate)=>{
      this.detail1=data.list;
      this.senderCatagory=this.detail1[0].senderCatagory;
      this.region=this.detail1[0].region;
      this.township=this.detail1[0].township;
      this.villageTrack=this.detail1[0].villageTrack;
      this.village=this.detail1[0].village;
      this.senderName1=this.detail1[0].senderName;
      this.crop1=this.detail1[0].crop;
      this.year=this.detail1[0].year;
      if(this.detail1[0].season==='1'){
        this.season='Summer';
      }
      if(this.detail1[0].season==='2'){
        this.season='Monsoon';
      }
      if(this.detail1[0].season==='3'){
        this.season='Winter';
      }

      this.variety1=this.detail1[0].variety;
      this.seedClass1=this.detail1[0].seedClass;
      this.lotNo1=this.detail1[0].lotNo;
      this.labReferenceNo=this.detail1[0].labReferenceNo;
      this.physicalPurity=this.detail1[0].physicalPurity;
      this.germination=this.detail1[0].germination;
      this.seedMoistureContent=this.detail1[0].seedMoistureContent;
      this.inertMatter=this.detail1[0].inertMatter;
      this.otherCropSeed=this.detail1[0].otherCropSeed;
      this.weedSeedContent=this.detail1[0].weedSeedContent;
      this.redRiceContent=this.detail1[0].redRiceContent;
      this.seedDate=this.detail1[0].seedDate;
      this.lot_size=this.detail1[0].lot_size;
      this.seedSource=this.detail1[0].seedSource;

     console.log("data for analysis report > "+JSON.stringify(data));
    });
  }



  /*===========================================================================================================*/
  detail2:SeedStand[];

  pureSeed:string;
  germinationStand:string;
  moistureContent:string;
  inertMatterStand:string;
  otherSeed:string;
  totalWeedSeed:string;
  objectionableWeedSeed:string;
  redRiceGains:string;

  getSeedStandardResult(LRN){
    var value={
      "labReferenceNumber":LRN
    }

    this.appService.getSeedStandardResult(value).subscribe((data:SeedStandard)=>{
      this.detail2=data.list;

      this.pureSeed=this.detail2[0].pureSeed;
      this.germinationStand=this.detail2[0].germination;
      this.moistureContent=this.detail2[0].moistureContent;
      this.inertMatterStand=this.detail2[0].inertMatter;
      this.otherSeed=this.detail2[0].otherSeed;
      this.totalWeedSeed=this.detail2[0].totalWeedSeed;
      this.objectionableWeedSeed=this.detail2[0].objectionableWeedSeed;
      this.redRiceGains=this.detail2[0].redRiceGains;


      console.log("value of seed standard=>  "+JSON.stringify(data));

    });

  }


/*====================================================================================*/


  getPdf(){  
    
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 500;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save(''+this.labCode+'.pdf'); // Generated PDF   
    });  
  }  

  logout(){
    this.authService.logout();
  }

}


