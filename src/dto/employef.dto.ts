import { Employef001mb } from "src/entity/Employef001mb";


export class EmployefDTO {
  slNo: number;
  unitslno: number;
  faNo: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;


  setProperties(employef001mb: Employef001mb) {
    this.slNo = employef001mb.slNo;
    this.unitslno = employef001mb.unitslno;
    this.faNo = employef001mb.faNo;
    this.insertUser = employef001mb.insertUser;
    this.insertDatetime = employef001mb.insertDatetime;
    this.updatedUser = employef001mb.updatedUser;
    this.updatedDatetime = employef001mb.updatedDatetime;
  }
}