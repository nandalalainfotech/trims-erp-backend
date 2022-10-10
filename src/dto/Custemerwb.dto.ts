import { Custemer001wb } from "src/entity/Custemer001wb";


export class CustemerwbDTO {
    slNo: number;
    unitslno: number;
    salespartSlno:number;

    prtcode:number;
    prtmname: string;
    prtdescrip: string;
    prtqunty: string;
    prtuom: string;
    prthsn: string;
    prtunitrate: string;
    prttotalamount: number;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
   
    setProperties(custemer001wb: Custemer001wb) {
    this.slNo = custemer001wb.slNo;
    this.unitslno = custemer001wb.unitslno;
    this.salespartSlno = custemer001wb.salespartSlno;
    this.prtcode = custemer001wb.prtcode;
    this.prtmname = custemer001wb.prtmname;
    this.prtdescrip = custemer001wb.prtdescrip;
    this.prtqunty = custemer001wb.prtqunty;
    this.prtuom = custemer001wb.prtuom;
    this.prthsn = custemer001wb.prthsn;
    this.prtunitrate = custemer001wb.prtunitrate;
    this.prttotalamount = custemer001wb.prttotalamount;
    this.insertUser = custemer001wb.insertUser;
    this.insertDatetime = custemer001wb.insertDatetime;
    this.updatedUser = custemer001wb.updatedUser;
    this.updatedDatetime = custemer001wb.updatedDatetime;
    
    
    }
}