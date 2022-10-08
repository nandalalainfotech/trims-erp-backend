import { Purchaseinvoiceitems001wb } from "src/entity/Purchaseinvoiceitems001wb";

export class PurchaseInvoiceItemDTO { 

    slNo: number;
    unitslno: number;
    purchaseslno: number;
    itemcode: number;
    itemname: string;
    descrip: string;
    qunty: string;
    uom: string;
    unitrate: string;
    totalamount: number;
    cucode: number;
    cuname: string;
    cudescrip: string;
    cuqunty: string;
    cuom: string;
    cunitrate: string;
    cutotalamount: number;
    cptcode: number;
    cptname: string;
    cptdescrip: string;
    cptqunty: string;
    cptuom: string;
    cptunitrate: string;
    cpttotalamount: number;
    prtcode: number;
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

    setProperties(purchaseinvoiceitems001wb: Purchaseinvoiceitems001wb) {
        this.slNo = purchaseinvoiceitems001wb.slNo;
        this.unitslno = purchaseinvoiceitems001wb.unitslno;
        this.purchaseslno = purchaseinvoiceitems001wb.purchaseslno;
        this.itemcode = purchaseinvoiceitems001wb.itemcode;
        this.itemname = purchaseinvoiceitems001wb.itemname;
        this.descrip = purchaseinvoiceitems001wb.descrip;
        this.qunty = purchaseinvoiceitems001wb.qunty;
        this.uom = purchaseinvoiceitems001wb.uom;
        this.unitrate = purchaseinvoiceitems001wb.unitrate;
        this.totalamount = purchaseinvoiceitems001wb.totalamount;

        this.hsn = purchaseinvoiceitems001wb.hsn;
        this.chsn = purchaseinvoiceitems001wb.chsn;
        this.cpthsn = purchaseinvoiceitems001wb.cpthsn;
        this.prthsn = purchaseinvoiceitems001wb.prthsn;

        this.cucode = purchaseinvoiceitems001wb.cucode;
        this.cuname = purchaseinvoiceitems001wb.cuname;
        this.cudescrip = purchaseinvoiceitems001wb.cudescrip;
        this.cuqunty = purchaseinvoiceitems001wb.cuqunty;
        this.cuom = purchaseinvoiceitems001wb.cuom;
        this.cunitrate = purchaseinvoiceitems001wb.cunitrate;
        this.cutotalamount = purchaseinvoiceitems001wb.cutotalamount;


        this.cptcode = purchaseinvoiceitems001wb.cptcode;
        this.cptname = purchaseinvoiceitems001wb.cptname;
        this.cptdescrip = purchaseinvoiceitems001wb.cptdescrip;
        this.cptqunty = purchaseinvoiceitems001wb.cptqunty;
        this.cptuom = purchaseinvoiceitems001wb.cptuom;
        this.cptunitrate = purchaseinvoiceitems001wb.cptunitrate;
        this.cpttotalamount = purchaseinvoiceitems001wb.cpttotalamount;


        this.prtcode = purchaseinvoiceitems001wb.prtcode;
        this.prtmname = purchaseinvoiceitems001wb.prtmname;
        this.prtdescrip = purchaseinvoiceitems001wb.prtdescrip;
        this.prtqunty = purchaseinvoiceitems001wb.prtqunty;
        this.prtuom = purchaseinvoiceitems001wb.prtuom;
        this.prtunitrate = purchaseinvoiceitems001wb.prtunitrate;
        this.prttotalamount = purchaseinvoiceitems001wb.prttotalamount;



        this.insertUser = purchaseinvoiceitems001wb.insertUser;
        this.insertDatetime = purchaseinvoiceitems001wb.insertDatetime;
        this.updatedUser = purchaseinvoiceitems001wb.updatedUser;
        this.updatedDatetime = purchaseinvoiceitems001wb.updatedDatetime;


    }

}