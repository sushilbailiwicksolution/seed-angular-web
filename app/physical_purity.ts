export class PhysicalPurity {
    status:string;
    statusCode:any;
    message:string;
    list:physicalRecord[];

}
export class physicalRecord{
    issueDate: string;
    labReferenceCode:string;
    dateOfReceipt: string;
    dateOfTest: string;
    cropName: string;
    variety: string;
    seedClass: string;
    pureSeed: string;
    weightOfSample: string;
    inertMatter: string;
    otherCropSeeds: string;
    inOfAnalyst: string;
    cropId: string;
    seedClassId: string;
    update: string;
    pureSeedR: string;
    weightOfSampleR: string;
    inertMatterR: string;
    otherCropSeedsR: string;
    avWtOfSample: string;
    avWtOfPureSeed: string;
    avWtOfInert: string;
    avOtherCrop: string;
    physicalPurity: string;
    otherCropPer: string;
    inertPer: string;
}