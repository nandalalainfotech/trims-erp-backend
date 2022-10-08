import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { PurchaseorderDTO } from "./Purchaseorder.dto";


export class OrderItemwbDTO {
    slNo: number;
    unitslno: number;
     purchaseslno:number;
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
    prttotalamount:number;
    
    hsn: string;
    chsn: string;
    cpthsn: string;
    prthsn: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    orderitemSlno:any;
   
    setProperties(orderitem001wb: Orderitem001wb) {
        this.slNo=orderitem001wb.slNo;
        this.unitslno=orderitem001wb.unitslno;
	this.purchaseslno = orderitem001wb.purchaseslno;
        this.itemcode=orderitem001wb.itemcode;
        this.itemname=orderitem001wb.itemname;
        this.descrip=orderitem001wb.descrip;
        this.qunty=orderitem001wb.qunty;
        this.uom=orderitem001wb.uom;
        this.unitrate=orderitem001wb.unitrate;
        this.totalamount=orderitem001wb.totalamount;
    
        this.hsn = orderitem001wb.hsn;
        this.chsn = orderitem001wb.chsn;
        this.cpthsn = orderitem001wb.cpthsn;
        this.prthsn = orderitem001wb.prthsn;

        this.cucode=orderitem001wb.cucode;
        this.cuname=orderitem001wb.cuname;
        this.cudescrip=orderitem001wb.cudescrip;
        this.cuqunty=orderitem001wb.cuqunty;
        this.cuom=orderitem001wb.cuom;
        this.cunitrate=orderitem001wb.cunitrate;
        this.cutotalamount=orderitem001wb.cutotalamount;
    
    
        this.cptcode=orderitem001wb.cptcode;
        this.cptname=orderitem001wb.cptname;
        this.cptdescrip=orderitem001wb.cptdescrip;
        this.cptqunty=orderitem001wb.cptqunty;
        this.cptuom=orderitem001wb.cptuom;
        this.cptunitrate=orderitem001wb.cptunitrate;
        this.cpttotalamount=orderitem001wb.cpttotalamount;
    
    
        this.prtcode=orderitem001wb.prtcode;
        this.prtmname=orderitem001wb.prtmname;
        this.prtdescrip=orderitem001wb.prtdescrip;
        this.prtqunty=orderitem001wb.prtqunty;
        this.prtuom=orderitem001wb.prtuom;
        this.prtunitrate=orderitem001wb.prtunitrate;
        this.prttotalamount=orderitem001wb.prttotalamount;
    
    
    
        this.insertUser = orderitem001wb.insertUser;
        this.insertDatetime = orderitem001wb.insertDatetime;
        this.updatedUser = orderitem001wb.updatedUser;
        this.updatedDatetime = orderitem001wb.updatedDatetime;
    
    
    }
}