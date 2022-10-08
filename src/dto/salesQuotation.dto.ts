import { Custemer001wb } from "src/entity/Custemer001wb";
import { Partitem001wb } from "src/entity/Partitem001wb";
import { Salesquotation001wb } from "src/entity/SalesQuotation001wb";


export class SalesQuotationDTO {
   
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
    tWords: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    custemerSlno2?: Custemer001wb[];
    partitem001wbs?: Partitem001wb[] | any;
   
    
    setProperties(salesquotation001wb: Salesquotation001wb) {

    this.slNo = salesquotation001wb.slNo;
	this.unitslno = salesquotation001wb.unitslno;
    this.custmrSlno = salesquotation001wb.custmrSlno;
    this.custemerCode = salesquotation001wb.custemerCode;
    this.sInvoice = salesquotation001wb.sInvoice;
    this.cDate = new Date(salesquotation001wb.cDate);
    this.consignee = salesquotation001wb.consignee;
    this.date = new Date(salesquotation001wb.date);
    this.refno = salesquotation001wb.refno;
    this.pono = salesquotation001wb.pono;
    this.remarks=salesquotation001wb.remarks;
    this.statusSlno=salesquotation001wb.statusSlno;
    this.otherRef = salesquotation001wb.otherRef;
    this.dispatchThrough = salesquotation001wb.dispatchThrough;
    this.destination = salesquotation001wb.destination;
    this.termsDelivery = salesquotation001wb.termsDelivery;
    this.supplierFrom = salesquotation001wb.supplierFrom;
    this.hsn = salesquotation001wb.hsn;
    this.dueOn = salesquotation001wb.dueOn;
    this.tAmount = salesquotation001wb.tAmount;
    this.tWords = salesquotation001wb.tWords;
    this.insertUser = salesquotation001wb.insertUser;
    this.insertDatetime = salesquotation001wb.insertDatetime;
    this.updatedUser = salesquotation001wb.updatedUser;
    this.updatedDatetime = salesquotation001wb.updatedDatetime;
     

    }
}