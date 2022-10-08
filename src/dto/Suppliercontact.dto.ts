import { Suppliercontact001wb } from "src/entity/Suppliercontact001wb";
import { Supplierregistration001mb } from "src/entity/Supplierregistration001mb";

export class SupplierContactDTO {
  slNo: number;
  unitslno: number;
  supplierslNo: number;
  pname: string;
  designation: string;
  department: string;
  level: string;
  mnumber: string;
  altmnumber: string;
  mailid: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  setProperties(suppliercontact001wb: Suppliercontact001wb) {
    this.slNo = suppliercontact001wb.slNo;
    this.unitslno = suppliercontact001wb.unitslno;
    this.supplierslNo = suppliercontact001wb.supplierslNo;
    this.pname = suppliercontact001wb.pname;
    this.designation = suppliercontact001wb.designation;
    this.department = suppliercontact001wb.department;
    this.level = suppliercontact001wb.level;
    this.mnumber = suppliercontact001wb.mnumber;
    this.altmnumber = suppliercontact001wb.altmnumber;
    this.mailid = suppliercontact001wb.mailid;
    this.insertUser = suppliercontact001wb.insertUser;
    this.insertDatetime = suppliercontact001wb.insertDatetime;
    this.updatedUser = suppliercontact001wb.updatedUser;
    this.updatedDatetime = suppliercontact001wb.updatedDatetime;
  }
}
