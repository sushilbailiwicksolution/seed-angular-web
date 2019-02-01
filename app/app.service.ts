import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class AppService {
   static register_url="http://148.72.22.125:8080/Seeds/";
   static BASE_URL="http://148.72.22.125:8080/Seeds/";
  //  static register_url="http://localhost:8080/Seeds/";
  //   static BASE_URL="http://localhost:8080/Seeds/";


  constructor(private httpClient:  HttpClient) { }

 
  /* ===============  get api ============= */

  getStatusOfTest(req){
    return this.httpClient.post(AppService.BASE_URL+"getStatusOfTestWeb",req);
    
  }

  getLogin(loginEmail){
    return this.httpClient.post(AppService.BASE_URL+"loginRequest",loginEmail);
  }
  getSeedRecordLab(req){
    return this.httpClient.post(AppService.BASE_URL+"getSeedRecordLab",req);
  }

  getTestReportData(req){
    return this.httpClient.post(AppService.BASE_URL+"getTestReportData",req);
  }
  getGenerateReport(req){
    return this.httpClient.post(AppService.BASE_URL+"getGeneratedReport/",req);
  }
  getGeneratedReportByLatRefCode(labReferenceNumber){
    return this.httpClient.post(AppService.BASE_URL+"getGeneratedReportByLatRefCode/",labReferenceNumber);
  }
  getAnalysisResult(labReferenceNumber){
    return this.httpClient.post(AppService.BASE_URL+"getAnalysisResult/",labReferenceNumber);
  }

  getEmployeeDetail(id){
    return this.httpClient.post(AppService.BASE_URL+"getEmployeeDetail/",id);
  }
  getSeedRecord(req){
    return this.httpClient.post(AppService.BASE_URL+"getSeedRecord/",req);
  }
  getCrop(){
    return this.httpClient.post(AppService.BASE_URL+"getCrop/","");
  }
  getVariety(req){
    return this.httpClient.post(AppService.BASE_URL+"getVariety/",req);
  }
  getMoistureRecord(req){
    return this.httpClient.post(AppService.BASE_URL+"getMoistureRecord/",req);
  }
  getPhysicalRecord(req){
    return this.httpClient.post(AppService.BASE_URL+"getPhysicalRecord/ ",req);
  }
  getGerminationRecord(req){
    return this.httpClient.post(AppService.BASE_URL+"getGerminationRecord",req);
  }
   getRedRice(req){
     return this.httpClient.post(AppService.BASE_URL+"getRedRiceTest",req);
   }
   getRegion(){
     return this.httpClient.post(AppService.BASE_URL+"getRegion","");
   }
   getTownShipByStateId(req){
     return this.httpClient.post(AppService.BASE_URL+"getTownShipByStateId",req);
   }
   getVillageTrackOnTownId(req){
     return this.httpClient.post(AppService.BASE_URL+"getVillageTrackOnTownId",req);

   }
   getVillageByVillageTrackId(req){
     return this.httpClient.post(AppService.BASE_URL+"getVillageByVillageTrackId",req);
   }
   getSeedClass(){
     return this.httpClient.post(AppService.BASE_URL+"getSeedClass","");
   }
 
   getSeedStandardResult(req){
    return this.httpClient.post(AppService.BASE_URL+"getStandardOfTest",req);
  }
  getForgetPassword(req){
    return this.httpClient.post(AppService.BASE_URL+"forgetPassword",req);
  }
  getUserDetail(){
    return this.httpClient.post(AppService.BASE_URL+"getUserRecord","");
  }
  
  /* ===============  update api ============= */

  updateMoistureTest(req){
    return this.httpClient.post(AppService.BASE_URL+"updateMoistureTest",req);
  }

  updateSeedRegistration(req){
    return this.httpClient.post(AppService.BASE_URL+"updateSeedRegistration",req);
  }

  updateGerminationTest(req){
    return this.httpClient.post(AppService.BASE_URL+"updateGerminationTest",req);
    
  }
  updatePhysicalPurity(req){
    return this.httpClient.post(AppService.BASE_URL+"updatePhysicalPurity",req);
    
  }
  updateRedRice(req){
    return this.httpClient.post(AppService.BASE_URL+"updateRedRice",req);
  }
  
   /* ===============  add api ============= */

  addSample(register){
    return this.httpClient.post(AppService.BASE_URL+"addSample/",register);
  }
 
   addUser(req){
     return this.httpClient.post(AppService.BASE_URL+"addUser",req);
   }

   
}
