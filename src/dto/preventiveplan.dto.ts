import { Preventiveplan001wb } from "src/entity/Preventiveplan001wb";

export class PreventivePlanDTO {

  slNo: number;
  unitslno: number;
  mslno: number;
  status: string;
  date: Date;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  setProperties(preventiveplan001wb: Preventiveplan001wb) {
    this.slNo = preventiveplan001wb.slNo;
    this.unitslno = preventiveplan001wb.unitslno;
    this.mslno = preventiveplan001wb.mslno;
    this.status = preventiveplan001wb.status;
    this.date = preventiveplan001wb.date;
    this.insertUser = preventiveplan001wb.insertUser;
    this.insertDatetime = preventiveplan001wb.insertDatetime;
    this.updatedUser = preventiveplan001wb.updatedUser;
    this.updatedDatetime = preventiveplan001wb.updatedDatetime;
  }
}