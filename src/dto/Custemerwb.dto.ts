import { Custemer001wb } from "src/entity/Custemer001wb";


export class CustemerwbDTO {
    slNo: number;
    unitslno: number;
    custemerSlno:number;
    custemername: string;
    prodescrip: string;
    descrip: string;
    qunty: string;
    uom: string;
    unitrate: string;
    totalamount: number;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
   
    setProperties(custemer001wb: Custemer001wb) {
    this.slNo = custemer001wb.slNo;
    this.unitslno = custemer001wb.unitslno;
    this.custemerSlno = custemer001wb.custemerSlno;
    this.custemername = custemer001wb.custemername;
    this.prodescrip = custemer001wb.prodescrip;
    this.qunty = custemer001wb.qunty;
    this.uom = custemer001wb.uom;
    this.unitrate = custemer001wb.unitrate;
    this.totalamount = custemer001wb.totalamount;
    this.insertUser = custemer001wb.insertUser;
    this.insertDatetime = custemer001wb.insertDatetime;
    this.updatedUser = custemer001wb.updatedUser;
    this.updatedDatetime = custemer001wb.updatedDatetime;
    
    
    }
}