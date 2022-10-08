import { Purchaseinvoiceitems001wb } from "src/entity/Purchaseinvoiceitems001wb";
import { Purchaseinvoicepay001wb } from "src/entity/Purchaseinvoicepay001wb";
import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";

export class PurchaseInvoicePayDTO {

    slNo: number;
    unitslno: number;
    cDate: Date;
    poSlno: number;
    prsNo: number;
    grnNo: number;
    suppliercode: number;
    suppliername: string;
    purchaseInvoice: string;
    reqDate: Date;
    incomingNo: string | any;
    filename: string = "";
    filepath: string;
    originalfilename: string;
    status: string;
    remarks: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    purchaseItem:Purchaseinvoiceitems001wb[];

    poSlno2: Purchaseorder001wb;
  
    setProperties(purchaseinvoicepay001wb: Purchaseinvoicepay001wb) {
      this.slNo = purchaseinvoicepay001wb.slNo;
      this.unitslno = purchaseinvoicepay001wb.unitslno;
      this.cDate = new Date(purchaseinvoicepay001wb.cDate);
      this.poSlno = purchaseinvoicepay001wb.poSlno;
      this.prsNo = purchaseinvoicepay001wb.prsNo;
      this.grnNo = purchaseinvoicepay001wb.grnNo;
      this.suppliercode = purchaseinvoicepay001wb.suppliercode;
      this.suppliername = purchaseinvoicepay001wb.suppliername;
      this.purchaseInvoice = purchaseinvoicepay001wb.purchaseInvoice;
      this.reqDate = new Date(purchaseinvoicepay001wb.reqDate);
      this.incomingNo = purchaseinvoicepay001wb.incomingNo;
      this.filename = purchaseinvoicepay001wb.filename;
      this.filepath = purchaseinvoicepay001wb.filepath;
      this.originalfilename = purchaseinvoicepay001wb.originalfilename;
      this.status = purchaseinvoicepay001wb.status;
      this.remarks = purchaseinvoicepay001wb.remarks;
      this.insertUser = purchaseinvoicepay001wb.insertUser;
      this.insertDatetime = purchaseinvoicepay001wb.insertDatetime;
      this.updatedUser = purchaseinvoicepay001wb.updatedUser;
      this.updatedDatetime = purchaseinvoicepay001wb.updatedDatetime;
     
    }

}