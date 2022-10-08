import { Purchaseorder001wb } from "src/entity/Purchaseorder001wb";
import { Salesorder001wb } from "src/entity/Salesorder001wb";
import { PurchaseorderDTO } from "./Purchaseorder.dto";

export class SalesOrderDTO {
    slNo: number;
    unitslno: number;
    porderSlno: number;
    invoiceNo: string;
    date: Date;
    deliveryNote: string;
    modePay: string;
    refNoDate: string;
    otherRef: string;
    buyerOrderNo: string;
    buyerDate: Date;
    dispatchDocNo: string;
    deliveryNoteDate: string;
    dispatchThrough: string;
    destination: string;
    billOfLading: string;
    motorvehicleNo: string;
    termsDelivery: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    porderSlno2: Purchaseorder001wb;

    porder: PurchaseorderDTO[] = [];


    total: number;
    word: string;
    supplierFrom: string;
    company: string;
    consignee: string




    setProperties(salesorder001wb: Salesorder001wb) {
        this.slNo = salesorder001wb.slNo;
        this.unitslno = salesorder001wb.unitslno;
        this.porderSlno = salesorder001wb.porderSlno;
        this.invoiceNo = salesorder001wb.invoiceNo;
        this.date = salesorder001wb.date;
        this.deliveryNote = salesorder001wb.deliveryNote;
        this.modePay = salesorder001wb.modePay;
        this.refNoDate = salesorder001wb.refNoDate;
        this.otherRef = salesorder001wb.otherRef;
        this.buyerOrderNo = salesorder001wb.buyerOrderNo;
        this.buyerDate = salesorder001wb.buyerDate;
        this.dispatchDocNo = salesorder001wb.dispatchDocNo;
        this.deliveryNoteDate = salesorder001wb.deliveryNoteDate;
        this.dispatchThrough = salesorder001wb.dispatchThrough;
        this.destination = salesorder001wb.destination;
        this.billOfLading = salesorder001wb.billOfLading;
        this.motorvehicleNo = salesorder001wb.motorvehicleNo;
        this.termsDelivery = salesorder001wb.termsDelivery;
        this.insertUser = salesorder001wb.insertUser;
        this.insertDatetime = salesorder001wb.insertDatetime;
        this.updatedUser = salesorder001wb.updatedUser;
        this.updatedDatetime = salesorder001wb.updatedDatetime;
        this.porder = [];
    }
}