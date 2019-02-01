import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {AppService } from '../app.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import {SeedReport,seedRecord} from '../seed_report';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthService1} from '../auth.service1';
import {DateViseData} from '../date_vise_data';

@Component({
  selector: 'app-seed-testing-record',
  templateUrl: './seed-testing-record.component.html',
  styleUrls: ['./seed-testing-record.component.css']
})
export class SeedTestingRecordComponent implements OnInit {


  public name6:string;
  public roleId6:string;
  public detail:seedRecord[];
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
      this.name6=localStorage.getItem("name");
      this.roleId6=localStorage.getItem("roleId");
      this.getSeedRecord();
      
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
    if(this.roleId6==='1'|| this.roleId6==='3'){
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


  public model=new DateViseData('','');


  columnDefs = [
    {headerName: 'Serial No.',lockPosition: true, valueGetter: 'node.rowIndex + 1', cellClass: 'locked-col', width: 50, suppressNavigable: true},

    {headerName: 'Sender Name',width: 120, field: 'senderName' },
    {headerName: 'Lab Refrence Number',width: 140, field: 'labReferenceCode' },
    {headerName: 'Receipt Date',width: 130, field: 'dateOfReceipt'},
    {headerName: 'Crop',width: 100, field: 'crop'},
    {headerName: 'Variety',width: 100, field: 'variety'},
    {headerName: 'Seed Class',width: 100, field: 'seedClass'},
    {headerName: 'Region',width: 100, field: 'region' },
    {headerName: 'Township',width: 100, field: 'township' },
    {headerName: 'Village-Track',width: 100, field: 'villageTrack'},
    {headerName: 'village',width: 100, field: 'village'},
    {headerName: 'Sender Catagory',width: 140, field: 'senderCatagory'},
    {headerName: 'Lot No.',width: 100, field: 'lotNo'},
    {headerName: 'Lot Size.',width: 100, field: 'lot_size'},
    {headerName: 'Sample Qty',width: 120, field: 'sampleQty'},
    {headerName: 'Packing',width: 100, field: 'packing'},
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

  getSeedRecord(){
    var req={
      "startDate":this.startDate,
      "endDate":this.endDate
    }
    
    this.appService.getSeedRecord(req).subscribe((data:SeedReport)=>{
        this.detail=data.list;
        this.rowData=this.detail;
        
        console.log(this.detail);
    }
  
  );
  }

  dateWiseData(){
    var req={
      "startDate":this.model.startDate,
      "endDate":this.model.endDate
    }
      this.appService.getSeedRecord(req).subscribe((data:SeedReport)=>{
          this.detail=data.list;
          console.log(this.detail);
          this.rowData=this.detail;
           
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
    this.router.navigate(['registrationForm'],navigationExtras);
  }

  logout(){
    this.authService1.logout();
  }
}
