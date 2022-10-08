import { Orderitem001wb } from "src/entity/Orderitem001wb";
import { Partspecification001wb } from "src/entity/Partspecification001wb";
import { Specification001wb } from "src/entity/Specification001wb";

export class PartspecificationDTO {
  slNo: number;
  unitslno: number;
  pslno: number | any;
  itemname: string;
  splan: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  orderitem001wbs: Orderitem001wb;
  specification2?:Specification001wb[];

  setProperties(partspecification001wb: Partspecification001wb) {
    this.slNo = partspecification001wb.slNo;
    this.unitslno = partspecification001wb.unitslno;
    this.pslno = partspecification001wb.pslno;
    this.itemname = partspecification001wb.itemname;
    this.splan = partspecification001wb.splan;
    this.insertUser = partspecification001wb.insertUser;
    this.insertDatetime = partspecification001wb.insertDatetime;
    this.updatedUser = partspecification001wb.updatedUser;
    this.updatedDatetime = partspecification001wb.updatedDatetime;
  }
}
