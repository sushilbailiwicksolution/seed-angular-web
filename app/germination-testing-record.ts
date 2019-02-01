export class GerminationTestingRecord {

    constructor(
        public methodId:string,
   public issueNo: string,
    public issueDate:string,
    public amendNo: string,
    public amendDate: string,
    public labReferenceCode: string,
    public dateOfReceipt: string,
    public dateOfPutting: string,
    public crop:string,
    public method:string,
    public variety: string,
    public seedClass: string,
    public dateOfPutting1:string,
    public totalSeeds:string,
    public avNormalSeedlings:string,
    public avAbnormalSeedllings:string,
    public avDeadSeedlings:string,
    public avHardFUS:string,
    public finalGermination:string,
    public dateOfReport:string,
    public initialsOfAnalyst:string
    
    ){
        
    }
}
