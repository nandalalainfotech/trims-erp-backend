import { Customerpoitem001wb } from "src/entity/Customerpoitem001wb";

export class CustomerpoitemDTO {
    slNo: number;
    unitslno: number;
    customerpoSlno:number | any;
    prtcode:number;
    prtmname: string;
    prtdescrip: string;
    prtqunty: string;
    prtuom: string;
    prthsn: string;
    prtunitrate: string;
    prttotalamount: number;
    drawingNo: string;
    revisionNo: string;
    revisionDate: Date | null;
    hsn: string;
    gst: string;

    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    orderitemSlno:any;

    setProperties(customerpoitem001wb: Customerpoitem001wb) {
        this.slNo=customerpoitem001wb.slNo;
        this.unitslno=customerpoitem001wb.unitslno;
        this.customerpoSlno=customerpoitem001wb.customerpoSlno;
        this.prtcode=customerpoitem001wb.prtcode;
        this.prtmname=customerpoitem001wb.prtmname;
        this.prtdescrip=customerpoitem001wb.prtdescrip;
        this.prtqunty=customerpoitem001wb.prtqunty;
        this.prtuom=customerpoitem001wb.prtuom;
        this.prthsn = customerpoitem001wb.prthsn;
        this.prtunitrate=customerpoitem001wb.prtunitrate;
        this.prttotalamount=customerpoitem001wb.prttotalamount;
        this.drawingNo=customerpoitem001wb.drawingNo;
        this.revisionNo=customerpoitem001wb.revisionNo;
        this.revisionDate = new Date(customerpoitem001wb.revisionDate);
        this.hsn=customerpoitem001wb.hsn;
        this.gst=customerpoitem001wb.gst;
    
        this.insertUser = customerpoitem001wb.insertUser;
        this.insertDatetime = customerpoitem001wb.insertDatetime;
        this.updatedUser = customerpoitem001wb.updatedUser;
        this.updatedDatetime = customerpoitem001wb.updatedDatetime;
    }
}