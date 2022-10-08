import { Fixturepreventiveplan001wb } from "src/entity/Fixturepreventiveplan001wb";
import { Preventiveplan001wb } from "src/entity/Preventiveplan001wb";

export class FixturePreventivePlanDTO {

  slNo: number;
  unitslno: number;
  mslno: number;
  status: string;
  date: Date;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  setProperties(fixturepreventiveplan001wb: Fixturepreventiveplan001wb) {
    this.slNo = fixturepreventiveplan001wb.slNo;
    this.unitslno = fixturepreventiveplan001wb.unitslno;
    this.mslno = fixturepreventiveplan001wb.mslno;
    this.status = fixturepreventiveplan001wb.status;
    this.date = fixturepreventiveplan001wb.date;
    this.insertUser = fixturepreventiveplan001wb.insertUser;
    this.insertDatetime = fixturepreventiveplan001wb.insertDatetime;
    this.updatedUser = fixturepreventiveplan001wb.updatedUser;
    this.updatedDatetime = fixturepreventiveplan001wb.updatedDatetime;
  }
}