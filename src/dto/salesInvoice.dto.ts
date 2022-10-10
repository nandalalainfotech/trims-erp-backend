import { Custemer001wb } from "src/entity/Custemer001wb";
import { Salesinvoice001wb } from "src/entity/Salesinvoice001wb";


export class SalesInvoiceDTO {
   
    slNo: number;
    unitslno: number;
    custmrSlno: number;
    custemerCode: string |any;
    sInvoice: string|any;
    cDate: Date;
    consignee: string;
    date: Date;
    refno: string;
    pono: string;
    remarks: string | null;
    statusSlno: number | null;
    otherRef: string;
    dispatchThrough: string;
    destination: string;
    termsDelivery: string;
    supplierFrom: string;
    hsn: string;
    dueOn: Date;
    tAmount: number | null;
    tWords: string | null;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    custemer001wbs: Custemer001wb[];
   
   
    
    setProperties(salesinvoice001wb: Salesinvoice001wb) {
        this.slNo = salesinvoice001wb.slNo;
	this.unitslno = salesinvoice001wb.unitslno;
    this.custmrSlno = salesinvoice001wb.custmrSlno;
    this.custemerCode = salesinvoice001wb.custemerCode;
    this.sInvoice = salesinvoice001wb.sInvoice;
    this.cDate = new Date(salesinvoice001wb.cDate);
    this.consignee = salesinvoice001wb.consignee;
    this.date = new Date(salesinvoice001wb.date);
    this.refno = salesinvoice001wb.refno;
    this.pono = salesinvoice001wb.pono;
    this.remarks=salesinvoice001wb.remarks;
    this.statusSlno=salesinvoice001wb.statusSlno;
    this.otherRef = salesinvoice001wb.otherRef;
    this.dispatchThrough = salesinvoice001wb.dispatchThrough;
    this.destination = salesinvoice001wb.destination;
    this.termsDelivery = salesinvoice001wb.termsDelivery;
    this.supplierFrom = salesinvoice001wb.supplierFrom;
    this.hsn = salesinvoice001wb.hsn;
    this.dueOn = new Date(salesinvoice001wb.dueOn);
    this.tAmount = salesinvoice001wb.tAmount;
    this.tWords = salesinvoice001wb.tWords;
    this.insertUser = salesinvoice001wb.insertUser;
    this.insertDatetime = salesinvoice001wb.insertDatetime;
    this.updatedUser = salesinvoice001wb.updatedUser;
    this.updatedDatetime = salesinvoice001wb.updatedDatetime;
     

    }
}