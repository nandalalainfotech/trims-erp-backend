import { Payment001wb } from "src/entity/Payment001wb";

export class PaymentDTO {
  slNo: number;
  unitslno: number;
  date: Date;
  tAmount: number;
  paidAmount: number;
  outAmount: number;
  modeofPay: string;
  chequeNo: string;
  payIdno: string;
  status: string
  dueDate: Date;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  setProperties(payment001wb: Payment001wb) {
    this.slNo = payment001wb.slNo;
    this.unitslno = payment001wb.unitslno;
    this.date = payment001wb.date;
    this.tAmount = payment001wb.tAmount;
    this.paidAmount = payment001wb.paidAmount;
    this.outAmount = payment001wb.outAmount;
    this.modeofPay = payment001wb.modeofPay;
    this.chequeNo = payment001wb.chequeNo;
    this.payIdno = payment001wb.payIdno;
    this.status = payment001wb.status;
    this.dueDate = payment001wb.dueDate;
    this.insertUser = payment001wb.insertUser;
    this.insertDatetime = payment001wb.insertDatetime;
    this.updatedUser = payment001wb.updatedUser;
    this.updatedDatetime = payment001wb.updatedDatetime;
  }
}
