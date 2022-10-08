import { Purchasereqitem001wb } from "src/entity/Purchasereqitem001wb";

export class PurchasereqslipitemDTO {
    slNo: number;
    unitslno: number;
     prslno:number | any;
    orderslno:number;
    itemcode: string;
    itemname: string;
    descrip: string;
    qunty: string;
    uom: string;
    unitrate: string;
    totalamount: number;
    cucode:number;
    cuname: string;
    cudescrip: string;
    cuqunty: string;
    cuom: string;
    cunitrate: string;
    cutotalamount: number; 
    cptcode:number;
    cptname: string;
    cptdescrip: string;
    cptqunty: string;
    cptuom: string;
    cptunitrate: string;
    cpttotalamount: number;
    prtcode:number;
    prtmname: string;
    prtdescrip: string;
    prtqunty: string;
    prtuom: string;
    prtunitrate: string;
    prttotalamount: number;

    hsn: string;
    chsn: string;
    cpthsn: string;
    prthsn: string;

    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    orderitemSlno:any;
   
    setProperties(purchasereqitem001wb: Purchasereqitem001wb) {
        this.slNo=purchasereqitem001wb.slNo;
        this.unitslno=purchasereqitem001wb.unitslno;
        this.orderslno=purchasereqitem001wb.orderslno;
  this.prslno=purchasereqitem001wb.prslno;
        this.itemname=purchasereqitem001wb.itemname;
        this.descrip=purchasereqitem001wb.descrip;
        this.qunty=purchasereqitem001wb.qunty;
        this.uom=purchasereqitem001wb.uom;
        this.unitrate=purchasereqitem001wb.unitrate;
        this.totalamount=purchasereqitem001wb.totalamount;
    
        this.hsn = purchasereqitem001wb.hsn;
        this.chsn = purchasereqitem001wb.chsn;
        this.cpthsn = purchasereqitem001wb.cpthsn;
        this.prthsn = purchasereqitem001wb.prthsn;

        this.cucode=purchasereqitem001wb.cucode;
        this.cuname=purchasereqitem001wb.cuname;
        this.cudescrip=purchasereqitem001wb.cudescrip;
        this.cuqunty=purchasereqitem001wb.cuqunty;
        this.cuom=purchasereqitem001wb.cuom;
        this.cunitrate=purchasereqitem001wb.cunitrate;
        this.cutotalamount=purchasereqitem001wb.cutotalamount;
    
    
        this.cptcode=purchasereqitem001wb.cptcode;
        this.cptname=purchasereqitem001wb.cptname;
        this.cptdescrip=purchasereqitem001wb.cptdescrip;
        this.cptqunty=purchasereqitem001wb.cptqunty;
        this.cptuom=purchasereqitem001wb.cptuom;
        this.cptunitrate=purchasereqitem001wb.cptunitrate;
        this.cpttotalamount=purchasereqitem001wb.cpttotalamount;
    
    
        this.prtcode=purchasereqitem001wb.prtcode;
        this.prtmname=purchasereqitem001wb.prtmname;
        this.prtdescrip=purchasereqitem001wb.prtdescrip;
        this.prtqunty=purchasereqitem001wb.prtqunty;
        this.prtuom=purchasereqitem001wb.prtuom;
        this.prtunitrate=purchasereqitem001wb.prtunitrate;
        this.prttotalamount=purchasereqitem001wb.prttotalamount;
    
    
    
        this.insertUser = purchasereqitem001wb.insertUser;
        this.insertDatetime = purchasereqitem001wb.insertDatetime;
        this.updatedUser = purchasereqitem001wb.updatedUser;
        this.updatedDatetime = purchasereqitem001wb.updatedDatetime;
    
    
    }
}