import { Checklist001mb } from "src/entity/Checklist001mb";

export class ChecklistDTO {
  slNo: number;
  unitslno: number;
  mcslno: number;
  sslno: number;
  checkpoints: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;


  setProperties(checklist001mb: Checklist001mb) {
    this.slNo = checklist001mb.slNo;
    this.unitslno = checklist001mb.unitslno;
    this.mcslno = checklist001mb.mcslno;
    this.sslno = checklist001mb.sslno;
    this.checkpoints = checklist001mb.checkpoints;
    this.insertUser = checklist001mb.insertUser;
    this.insertDatetime = checklist001mb.insertDatetime;
    this.updatedUser = checklist001mb.updatedUser;
    this.updatedDatetime = checklist001mb.updatedDatetime;
  }
}