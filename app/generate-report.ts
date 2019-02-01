export class GenerateReport {
    status:string;
    statusCode:any;
    message:string;
    list:genReport[];
    listSeedReport:seedReport[];
    listGerminationRecord:germinationRecord[];

}


   
export class genReport{
      senderName:string;
      dateOfReceipt:string;
      lotNo:string;
      labReferenceCode:string;
      seedClass:string;
      sampleQty:string;

}
export class seedReport{
    senderName:string;
    address:string;
    crop:string;
    variety:string;
    seedClass:string;
    qty:string;
    lotNo:string;
    dateOfReceipt:string;

}




export class germinationRecord{
     issueNo:string;
     issueDate:string;
     amendNo:string;
     amendDate:string;
     labReferenceCode:string;
     dateOfReceipt:string;
     dateOfPutting:string;
     crop:string;
     method:string;
     variety:string;
     seedClass:string;
     dateOfPutting1:string;
     totalSeeds:string;
     avNormalSeedlings:string;
     avAbnormalSeedllings:string;
     avDeadSeedlings:string;
     avHardFUS:string;
     finalGermination:string;
     dateOfReport:string;
     initialsOfAnalyst:string;
}