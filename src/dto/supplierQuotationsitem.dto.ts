
import { Supplierquotationitems001wb } from "src/entity/Supplierquotationitems001wb";

export class SupplierquotationsItemDTO { 
    slNo: number;
    unitslno: number;
    suplierslno:number;
    itemcode:number;
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

    
    hsn: string;
    chsn: string;
    cpthsn: string;
    prthsn: string;
    prttotalamount: number;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    orderitemSlno:any;
   
    setProperties(supplierquotationitems001wb: Supplierquotationitems001wb) {
        this.slNo=supplierquotationitems001wb.slNo;
        this.unitslno=supplierquotationitems001wb.unitslno;
	 this.suplierslno=supplierquotationitems001wb.suplierslno;
        this.itemcode=supplierquotationitems001wb.itemcode;
        this.itemname=supplierquotationitems001wb.itemname;
        this.descrip=supplierquotationitems001wb.descrip;
        this.qunty=supplierquotationitems001wb.qunty;
        this.uom=supplierquotationitems001wb.uom;
        this.unitrate=supplierquotationitems001wb.unitrate;
        this.totalamount=supplierquotationitems001wb.totalamount;
    
        this.hsn = supplierquotationitems001wb.hsn;
        this.chsn = supplierquotationitems001wb.chsn;
        this.cpthsn = supplierquotationitems001wb.cpthsn;
        this.prthsn = supplierquotationitems001wb.prthsn;

        this.cucode=supplierquotationitems001wb.cucode;
        this.cuname=supplierquotationitems001wb.cuname;
        this.cudescrip=supplierquotationitems001wb.cudescrip;
        this.cuqunty=supplierquotationitems001wb.cuqunty;
        this.cuom=supplierquotationitems001wb.cuom;
        this.cunitrate=supplierquotationitems001wb.cunitrate;
        this.cutotalamount=supplierquotationitems001wb.cutotalamount;
    
    
        this.cptcode=supplierquotationitems001wb.cptcode;
        this.cptname=supplierquotationitems001wb.cptname;
        this.cptdescrip=supplierquotationitems001wb.cptdescrip;
        this.cptqunty=supplierquotationitems001wb.cptqunty;
        this.cptuom=supplierquotationitems001wb.cptuom;
        this.cptunitrate=supplierquotationitems001wb.cptunitrate;
        this.cpttotalamount=supplierquotationitems001wb.cpttotalamount;
    
    
        this.prtcode=supplierquotationitems001wb.prtcode;
        this.prtmname=supplierquotationitems001wb.prtmname;
        this.prtdescrip=supplierquotationitems001wb.prtdescrip;
        this.prtqunty=supplierquotationitems001wb.prtqunty;
        this.prtuom=supplierquotationitems001wb.prtuom;
        this.prtunitrate=supplierquotationitems001wb.prtunitrate;
        this.prttotalamount=supplierquotationitems001wb.prttotalamount;
    
    
    
        this.insertUser = supplierquotationitems001wb.insertUser;
        this.insertDatetime = supplierquotationitems001wb.insertDatetime;
        this.updatedUser = supplierquotationitems001wb.updatedUser;
        this.updatedDatetime = supplierquotationitems001wb.updatedDatetime;
    
    
    }
}