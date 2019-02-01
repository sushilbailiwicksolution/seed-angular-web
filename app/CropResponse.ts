export class CropResponse{
    status:string;
    statusCode:any;
    message:string;
    list:genResponse[];
}

export class genResponse{
    id:number;
    crop:string;
}