import { Prod001mb } from "src/entity/Prod001mb";


export class ProdDTO {
    slNo: number;
    unitslno: number;
    proddno: string;
    proddname: string;
    catno: string;
    drawingno: string;
    cusdetails: string;
    remarks: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;




    
setProperties(prod001mb: Prod001mb) {

    this.slNo=prod001mb.slNo;
    this.unitslno=prod001mb.unitslno;
    this.proddno=prod001mb.proddno;
    this.proddname=prod001mb.proddname;
    this.catno=prod001mb.catno;
    this.drawingno=prod001mb.drawingno;
    this.cusdetails=prod001mb.cusdetails;
    this.remarks=prod001mb.remarks;
    this.insertUser = prod001mb.insertUser;
    this.insertDatetime = prod001mb.insertDatetime;
    this.updatedUser = prod001mb.updatedUser;
    this.updatedDatetime = prod001mb.updatedDatetime;


}


}