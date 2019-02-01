import { Component, OnInit } from '@angular/core';
import { AuthService1 } from '../auth.service1';
import { AppService } from '../app.service';
import { Router, NavigationExtras } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateViseData } from '../date_vise_data';
import { RedRiceModel, RedRice } from '../RedRiceRecordModel';

@Component({
  selector: 'app-red-rice-record',
  templateUrl: './red-rice-record.component.html',
  styleUrls: ['./red-rice-record.component.css']
})
export class RedRiceRecordComponent implements OnInit {

  public name9:string;
  public roleId9:string;
  public detail:RedRice[];
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
    this.getRedRiceRecord();
  }
  
  public model=new DateViseData('','');

  ngOnInit() {
    let dateObj=new Date();
    this.model.startDate=new Date(dateObj.getFullYear(), dateObj.getMonth(),2).toISOString().substring(0, 10);
    this.model.endDate=new Date(dateObj.getFullYear(), dateObj.getMonth()+1).toISOString().substring(0, 10);

  }

  getDashboard(){
    this.router.navigate(['/dashboard']);
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
    {headerName: 'Date Of Test',width: 120, field: 'dateOfTest' },
    {headerName: 'Lab Refrence Number',width: 120, field: 'labRefrenceNumber' },
    {headerName: 'Receipt Date',width: 120, field: 'dateOfReceipt'},
    {headerName: 'Crop',width: 100, field: 'cropName'},
    {headerName: 'Variety',width: 100, field: 'variety'},
    {headerName: 'Seed Class',width: 110, field: 'seedClass'},
    {headerName: 'Seed Standard',width: 120, field: 'seedStandard' },
    {headerName: 'Acceptable',width: 110, field: 'acceptable' },
    {headerName: 'method',width: 100, field: 'method'},
    {headerName: 'analystSignature',width: 140, field: 'analystSignature'},
    {headerName: 'No. of Red Rice/500g',width: 155, field: 'numberRedRicePer500'},
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
  getRedRiceRecord(){
    var req={
      "startDate":this.startDate,
      "endDate":this.endDate
    }
     this.appService.getRedRice(req).subscribe((data:RedRiceModel)=>{
       this.detail=data.list;
       console.log("data from => "+JSON.stringify(data));
       console.log("another====>"+this.detail);
       console.log(this.startDate+"      "+this.endDate);
       this.rowData = this.detail;
     });
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
      console.log("update action clicked", data["labRefrenceNumber"]);
      let navigationExtras: NavigationExtras = {
    
        queryParams: {
            "labRfrenceCode": data["labRefrenceNumber"]
            
        }
    };
    console.log("clicked", data["labRefrenceNumber"]);
    this.router.navigate(['redriceForm'],navigationExtras);
  }
    logout(){
      this.authService1.logout();
    }

    dateWiseData(){
      var req={
        "startDate":this.model.startDate,
        "endDate":this.model.endDate
      }
        this.appService.getRedRice(req).subscribe((data:RedRiceModel)=>{
            this.detail=data.list;
            console.log(this.detail);
            this.rowData = this.detail;
        }
      
      );
      }

}
