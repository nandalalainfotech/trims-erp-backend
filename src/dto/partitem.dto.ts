import { Partitem001wb } from "src/entity/Partitem001wb";

export class PartitemDTO {
    slNo: number;
    unitslno: number;
    partitemslNo: number | null;
    prtcode: number;
    prtmname: string;
    prtdescrip: string;
    prtqunty: string;
    prthsn: string;
    prtuom: string;
    prtunitrate: string;
    prttotalamount: number;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
  
  
    setProperties(partitem001wb: Partitem001wb) {
        this.slNo = partitem001wb.slNo;
        this.unitslno = partitem001wb.unitslno;
        this.partitemslNo = partitem001wb.partitemslNo;
        this.prtcode = partitem001wb.prtcode;
        this.prtmname = partitem001wb.prtmname;
        this.prtdescrip = partitem001wb.prtdescrip;
        this.prtqunty = partitem001wb.prtqunty;
        this.prthsn = partitem001wb.prthsn;
        this.prtuom = partitem001wb.prtuom;
        this.prtunitrate = partitem001wb.prtunitrate;
        this.prttotalamount = partitem001wb.prttotalamount;        
        this.insertUser = partitem001wb.insertUser;
        this.insertDatetime = partitem001wb.insertDatetime;
        this.updatedUser = partitem001wb.updatedUser;
        this.updatedDatetime = partitem001wb.updatedDatetime;
    }
}