export class GenericResponse {
  status:string;
  statusCode:number;
 message:string;
 list:userDetail[];
 employeeId:string; 
 roleId:string;
}
export class userDetail{
  firstName:string;
  lastName:string;
}

