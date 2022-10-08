import { Machine001mb } from "src/entity/Machine001mb";


export class MachineDTO {
  slNo: number;
  unitslno: number;
  sslno: number;
  mcode: string;
  mname: string;
  year: Date | null;
  capacity: string;
  mtype: string;
  make: string;
  location: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;


  setProperties(machine001mb: Machine001mb) {
    this.slNo = machine001mb.slNo;
    this.unitslno = machine001mb.unitslno;
    this.sslno = machine001mb.sslno;
    this.mcode = machine001mb.mcode;
    this.mname = machine001mb.mname;
    this.year = machine001mb.year;
    this.capacity = machine001mb.capacity;
    this.mtype = machine001mb.mtype;
    this.make = machine001mb.make;
    this.location = machine001mb.location;
    this.insertUser = machine001mb.insertUser;
    this.insertDatetime = machine001mb.insertDatetime;
    this.updatedUser = machine001mb.updatedUser;
    this.updatedDatetime = machine001mb.updatedDatetime;
  }
}