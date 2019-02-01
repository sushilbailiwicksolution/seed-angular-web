import { Component, OnInit } from '@angular/core';
import {AppService } from '../app.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import {MoistureModel,moistureRecord} from '../moisture_model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthService1} from '../auth.service1';
import {DateViseData} from '../date_vise_data';


@Component({
  selector: 'app-moisture-testing-record',
  templateUrl: './moisture-testing-record.component.html',
  styleUrls: ['./moisture-testing-record.component.css']
})
export class MoistureTestingRecordComponent implements OnInit {

  public name7:string;
  public roleId7:string;
  public detail:moistureRecord[];
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


    this.model.startDate=new Date(dateObj.getFullYear(), dateObj.getMonth(),2).toISOString().substring(0, 10);
    this.model.endDate=new Date(dateObj.getFullYear(), dateObj.getMonth()+1).toISOString().substring(0, 10);


    console.log("my date is "+this.startDate+"    "+this.endDate );

    this.name7=localStorage.getItem("name");
    this.roleId7=localStorage.getItem("roleId");
    this.getMoistureDetail();
  }


  public model=new DateViseData('','');

   
//var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
//var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  ngOnInit() { }

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
    if(this.roleId7==='1'|| this.roleId7==='3'){
    this.router.navigate(['/generateReport']);
    }else{
      window.alert("you are not authorized to generate report");
    }
  }

   
  columnDefs = [
    {headerName: 'Serial No.',lockPosition: true, valueGetter: 'node.rowIndex + 1', cellClass: 'locked-col', width: 50, suppressNavigable: true},
    {headerName: 'Date Of Test', width: 120,field: 'dateOfTest' },
    {headerName: 'Lab Refrence Number', width: 120,field: 'labReferenceCode' },
    {headerName: 'Method', width: 100,field: 'method'},
    {headerName: 'Receipt Date',width: 110 ,field: 'dateOfReceipt'},
    {headerName: 'Crop', width: 100,field: 'cropName'},
    {headerName: 'Variety',width: 100, field: 'variety'},
    {headerName: 'Seed Class',width: 100, field: 'seedClass'},
    {headerName: 'TempC',width: 100, field: 'tempC'},
    {headerName: 'Rh',width: 100, field: 'rh'},
    {headerName: 'Moisture Content',width: 120, field: 'moistureContent'},
    {headerName: 'IOA',width: 100, field: 'inOfAnalyst'},
    {headerName: 'Created By',width: 120, field: 'createdBy'},
    {headerName: 'Updated By',width: 120, field: 'updatedBy'},
    { headerName: "Actions",width: 90,
      suppressMenu: true,
      suppressSorting: true,
      template:
        `<button type="button" data-action-type="update"  class="btn"  >
           Edit
         </button>`
    }
];



rowData:any;


  getMoistureDetail(){

    var req={
      "startDate":this.startDate,
      "endDate":this.endDate

      
    }
      this.appService.getMoistureRecord(req).subscribe((data:MoistureModel)=>{
          this.detail=data.list;
          console.log("moisture content "+JSON.stringify(data));
          this.rowData = this.detail;
      }
    
    );
    }
    
    dateWiseData(){
      var req={
        "startDate":this.model.startDate,
        "endDate":this.model.endDate
      }
        this.appService.getMoistureRecord(req).subscribe((data:MoistureModel)=>{
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
      this.router.navigate(['moistureForm'],navigationExtras);
    }





    logout(){
      this.authService1.logout();
    }
  
  }
  
  