import { Component, OnInit } from '@angular/core';
import {AppService } from '../app.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import {PhysicalPurity,physicalRecord} from '../physical_purity';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthService1} from '../auth.service1';
import { GenericResponse } from '../genericResponse';
import {DateViseData} from '../date_vise_data';

@Component({
  selector: 'app-physical-record',
  templateUrl: './physical-record.component.html',
  styleUrls: ['./physical-record.component.css']
})
export class PhysicalRecordComponent implements OnInit {

  public name8:string;
  public roleId8:string;
  public detail:physicalRecord[];
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
    
    this.name8=localStorage.getItem("name");
    this.roleId8=localStorage.getItem("roleId");
    this.getPhysicalRecord();
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
    if(this.roleId8==='1'|| this.roleId8==='3'){
    this.router.navigate(['/generateReport']);
    }else{
      window.alert("you are not authorized to generate report");
    }
  }



  ngOnInit() {
    let dateObj=new Date();
    this.model.startDate=new Date(dateObj.getFullYear(), dateObj.getMonth(),2).toISOString().substring(0, 10);
    this.model.endDate=new Date(dateObj.getFullYear(), dateObj.getMonth()+1).toISOString().substring(0, 10);

  }

  // column head definition

  columnDefs = [
    {headerName: 'Serial No.',lockPosition: true, valueGetter: 'node.rowIndex + 1', cellClass: 'locked-col', width: 50, suppressNavigable: true},
    {headerName: 'Date Of Test',width: 120, field: 'dateOfTest' },
    {headerName: 'Lab Refrence Number',width: 120, field: 'labReferenceCode' },
    {headerName: 'Receipt Date',width: 120, field: 'dateOfReceipt'},
    {headerName: 'Crop',width: 100, field: 'cropName'},
    {headerName: 'Variety',width: 100, field: 'variety'},
    {headerName: 'Seed Class',width: 100, field: 'seedClass'},
    {headerName: 'Av. Wt. of sample',width: 150, field: 'avWtOfSample' },
    {headerName: 'Av. Wt. of pure seed',width: 150, field: 'avWtOfPureSeed' },
    {headerName: 'Av. Wt. of Inert',width: 150, field: 'avWtOfInert'},
    {headerName: 'Av Other Crop',width: 130, field: 'avOtherCrop'},
    {headerName: 'Physical Purity %',width: 130, field: 'physicalPurity'},
    {headerName: 'Other Crop %',width: 120, field: 'otherCropPer'},
    {headerName: 'Inert %',width: 100, field: 'inertPer'},
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





  public model=new DateViseData('','');

  rowData:any;
  getPhysicalRecord(){
    var req={
      "startDate":this.startDate,
      "endDate":this.endDate
    }
     this.appService.getPhysicalRecord(req).subscribe((data:PhysicalPurity)=>{
       this.detail=data.list;
       console.log("data from => "+JSON.stringify(data));
       console.log(this.detail);
       console.log(this.startDate+"      "+this.endDate);
       this.rowData = this.detail;
     });
    }
  
    logout(){
      this.authService1.logout();
    }

    dateWiseData(){
      var req={
        "startDate":this.model.startDate,
        "endDate":this.model.endDate
      }
        this.appService.getPhysicalRecord(req).subscribe((data:PhysicalPurity)=>{
            this.detail=data.list;
            console.log(this.detail);
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
      this.router.navigate(['physicalForm'],navigationExtras);
    }

}
