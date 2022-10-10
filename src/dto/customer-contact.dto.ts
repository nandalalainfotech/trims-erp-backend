import { Customercontact001wb } from "src/entity/customercontact001wb";

export class CustomerContactDTO {
    slNo: number;
    unitslno?: number;
    customerslNo: number;
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
  
    setProperties(customercontact001wb: Customercontact001wb) {
      this.slNo = customercontact001wb.slNo;
      this.unitslno = customercontact001wb.unitslno;
      this.customerslNo = customercontact001wb.customerslNo;
      this.pname = customercontact001wb.pname;
      this.designation = customercontact001wb.designation;
      this.department = customercontact001wb.department;
      this.level = customercontact001wb.level;
      this.mnumber = customercontact001wb.mnumber;
      this.altmnumber = customercontact001wb.altmnumber;
      this.mailid = customercontact001wb.mailid;
      this.insertUser = customercontact001wb.insertUser;
      this.insertDatetime = customercontact001wb.insertDatetime;
      this.updatedUser = customercontact001wb.updatedUser;
      this.updatedDatetime = customercontact001wb.updatedDatetime;
    }
}