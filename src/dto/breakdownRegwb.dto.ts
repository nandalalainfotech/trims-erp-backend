import { Breakdownreg001wb } from "src/entity/Breakdownreg001wb";

export class BreakDownRegDTO {
    slNo: number;
    unitslno: number;
    mslno: number;
    date: Date;
    bdsl: number;
    rcsl: number;
    pasl: number;
    filename: string;
    filepath: string;
    originalfilename: string;
    startTime: string | null;
    endTime: string | null;
    sslno: number;
    spareCost: number;
    sparesQty: number;
    attendby: string;
    remarks: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(breakdownreg001wb: Breakdownreg001wb) {
        this.slNo = breakdownreg001wb.slNo;
        this.unitslno = breakdownreg001wb.unitslno;
        this.mslno = breakdownreg001wb.mslno;
        this.date = breakdownreg001wb.date;
        this.bdsl = breakdownreg001wb.bdsl;
        this.rcsl = breakdownreg001wb.rcsl;
        this.pasl = breakdownreg001wb.pasl;
        this.filename = breakdownreg001wb.filename;
        this.filepath = breakdownreg001wb.filepath;
        this.originalfilename = breakdownreg001wb.originalfilename;
        this.startTime = breakdownreg001wb.startTime;
        this.endTime = breakdownreg001wb.endTime;
        this.sslno = breakdownreg001wb.sslno;
        this.spareCost = breakdownreg001wb.spareCost;
        this.sparesQty = breakdownreg001wb.sparesQty;
        this.attendby = breakdownreg001wb.attendby;
        this.remarks = breakdownreg001wb.remarks;
        this.insertUser = breakdownreg001wb.insertUser;
        this.insertDatetime = breakdownreg001wb.insertDatetime;
        this.updatedUser = breakdownreg001wb.updatedUser;
        this.updatedDatetime = breakdownreg001wb.updatedDatetime;
    }
}