export class MoistureModel {
    status:string;
    statusCode:any;
    message:string;
    list:moistureRecord[];

}
export class moistureRecord{
    issueDate:string;
    labReferenceCode:string;
   dateOfTest: string;
    method:string;
   dateOfReceipt: string;
  cropName: string;
    variety: string;
    seedClass: string;
    tempC:string;
    rh:string;
    wtOfContainer: string;
    wtOfSeedContainer:string;
    wtOfDrySeedContainer:string;
   wtOfContainerR1:string;
    wtOfSeedContainerR1:string;
    wtOfDrySeedContainerR1:string;
    tempOven:string;
    meterReading1:string;
    meterReading:string;
    meterReading3:string;
    moistureContent:string;
     inOfAnalyst:string;
}