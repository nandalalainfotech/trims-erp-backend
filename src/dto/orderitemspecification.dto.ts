import { Orderitemspecification001wb } from "src/entity/Orderitemspecification001wb";

export class OrderitemSpecificationDTO {
    slNo: number;
    unitslno: number;
    itemslno: number | null;
    parameter: string;
    specification: string;
    inspecmethod: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
  
  
    setProperties(orderitemspecification001wb: Orderitemspecification001wb) {
      this.slNo = orderitemspecification001wb.slNo;
      this.unitslno = orderitemspecification001wb.unitslno;
      this.itemslno = orderitemspecification001wb.itemslno;
      this.parameter = orderitemspecification001wb.parameter;
      this.specification = orderitemspecification001wb.specification;
      this.inspecmethod = orderitemspecification001wb.inspecmethod;
      this.insertUser = orderitemspecification001wb.insertUser;
      this.insertDatetime = orderitemspecification001wb.insertDatetime;
      this.updatedUser = orderitemspecification001wb.updatedUser;
      this.updatedDatetime = orderitemspecification001wb.updatedDatetime;
    }
  }