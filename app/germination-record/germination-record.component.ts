import { Component, OnInit } from '@angular/core';
import {AppService } from '../app.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import {GerminationRecord,germinationRecord} from '../germination_record';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthService1} from '../auth.service1';
import { GenericResponse } from '../genericResponse';
import {DateViseData} from '../date_vise_data';

@Component({
  selector: 'app-germination-record',
  templateUrl: './germination-record.component.html',
  styleUrls: ['./germination-record.component.css']
})
export class GerminationRecordComponent implements OnInit {

  public name9:string;
  public roleId9:string;
  public detail:germinationRecord[];
  public startDate:string;
  public endDate:string;
  public month:number;
  public year:number;
  public date:number;

  constructor(private authService1:AuthService1,private appService:AppService,private router:Router,private modalService: NgbModal) { 
    let dateObj=new Date();
    this.month=dateObj.getMonth()+1;
    this.year=dateObj.getFullYear();

    this.startDate=this.year+"-"+this.month+"-"+"01";
    let dateOb=new Date(this.year,this.month,0);
    this.date=dateOb.getDate();
    console.log("day in a month: "+this.date);
    this.endDate=this.year+"-"+this.month+"-"+this.date;
    
    this.name9=localStorage.getItem("name");
    this.roleId9=localStorage.getItem("roleId");
    this.getGerminationRecord();
  }

  ngOnInit() {
    let dateObj=new Date();
    this.model.startDate=new Date(dateObj.getFullYear(), dateObj.getMonth(),2).toISOString().substring(0, 10);
    this.model.endDate=new Date(dateObj.getFullYear(), dateObj.getMonth()+1).toISOString().substring(0, 10);

  }


  public model=new DateViseData('','');

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
    if(this.roleId9==='1'|| this.roleId9==='3'){
    this.router.navigate(['/generateReport']);
    }else{
      window.alert("you are not authorized to generate report");
    }
  }

  columnDefs = [
    {headerName: 'Serial No.',lockPosition: true, valueGetter: 'node.rowIndex + 1', cellClass: 'locked-col', width: 50, suppressNavigable: true},
    {headerName: 'Lab Refrence Number',width: 120, field: 'labReferenceCode' },
    {headerName: 'Receipt Date',width: 120, field: 'dateOfReceipt'},
    {headerName: 'Method',width: 100, field: 'method'},
    {headerName: 'Crop',width: 100, field: 'crop'},
    {headerName: 'Variety',width: 100, field: 'variety'},
    {headerName: 'Seed Class',width: 120, field: 'seedClass'},
    {headerName: 'Total Seeds',width: 120, field: 'totalSeeds'},
    {headerName: 'Av. Normal Seedl',width: 140, field: 'avNormalSeedlings'},
    {headerName: 'Av. Abnormal Seed',width: 140, field: 'avAbnormalSeedllings'},
    {headerName: 'Av Dead Seed',width: 130, field: 'avDeadSeedlings'},
    {headerName: 'Av Hard FUS',width: 130, field: 'avHardFUS'},
    {headerName: 'Final Germination',width: 140, field: 'finalGermination'},
    {headerName: 'Date Of Report',width: 130, field: 'dateOfReport'},
    {headerName: 'IOA',width: 100, field: 'initialsOfAnalyst'},
    {headerName: 'Created By',width: 120, field: 'createdBy'},
    {headerName: 'Updated By',width: 120, field: 'updatedBy'},
    { headerName: "Actions",width: 90,
    suppressMenu: true,
    suppressSorting: true,
    template:
      `<button type="button" data-action-type="update"  class="btn">
         Edit
       </button>`
  }
];


  rowData:any;
  getGerminationRecord(){
    var req={
      "startDate":this.startDate,
      "endDate":this.endDate
    }

    this.appService.getGerminationRecord(req).subscribe((data:GerminationRecord)=>{
      this.detail=data.list;
      console.log(this.detail);
      this.rowData = this.detail;
  }

);
}


dateWiseData(){
  var req={
    "startDate":this.model.startDate,
    "endDate":this.model.endDate
  }
    this.appService.getGerminationRecord(req).subscribe((data:GerminationRecord)=>{
        this.detail=data.list;
        console.log(JSON.stringify(data));
        this.rowData = this.detail; 
    }
  
  );
  }


  public onRowClicked(e) {
    console.log("on row clicked");
    if (e.event.target !== undefined) {
        let data = e.data;
        let actionType = e.event.target.getAttribute("data-action-type");
       
        switch(actionType) {
            case "update":
                return this.onActionViewClick(data);
        }
    }
}

public onActionViewClick(data: any){
    console.log("update action clicked", data["labReferenceCode"]);
    let navigationExtras: NavigationExtras = {
  
      queryParams: {
          "labRfrenceCode": data["labReferenceCode"]
      }
  };
  this.router.navigate(['germinationForm'],navigationExtras);
}



logout(){
  this.authService1.logout();
}
  }


