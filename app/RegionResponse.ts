export class RegionResponse{
    status:string;
    statusCode:any;
    message:string;
    list:genResponse[];
}

export class genResponse{
    id:number;
    region:string;
}