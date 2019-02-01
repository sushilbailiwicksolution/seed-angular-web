export class SeedClassResponse{
    status:string;
    statusCode:any;
    message:string;
    list:genResponse[];
}

export class genResponse{
    id:number;
    seedClass:string;
}