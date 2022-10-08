import { Checklist001mb } from "src/entity/Checklist001mb";
import { Fixturechecklist001mb } from "src/entity/Fixturechecklist001mb";

export class FixtureChecklistDTO {
  slNo: number;
  unitslno?: number;
  fcslno: number;
  fstatus: number;
  fcheckpoints: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;


  setProperties(fixturechecklist001mb: Fixturechecklist001mb) {
    this.slNo = fixturechecklist001mb.slNo;
    this.unitslno = fixturechecklist001mb.unitslno;
    this.fcslno = fixturechecklist001mb.fcslno;
    this.fstatus = fixturechecklist001mb.fstatus;
    this.fcheckpoints = fixturechecklist001mb.fcheckpoints;
    this.insertUser = fixturechecklist001mb.insertUser;
    this.insertDatetime = fixturechecklist001mb.insertDatetime;
    this.updatedUser = fixturechecklist001mb.updatedUser;
    this.updatedDatetime = fixturechecklist001mb.updatedDatetime;
  }
}