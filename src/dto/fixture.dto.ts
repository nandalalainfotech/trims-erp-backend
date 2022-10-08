import { Fixture001mb } from "src/entity/Fixture001mb";
import { Machine001mb } from "src/entity/Machine001mb";


export class FixtureDTO {
  slNo: number;
  unitslno: number;
  sslno: number;
  fcode: string;
  fname: string;
  fyear: Date | null;
  fcapacity: string;
  ftype: string;
  fmake: string;
  flocation: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;


  setProperties(fixture001mb: Fixture001mb) {
    this.slNo = fixture001mb.slNo;
    this.unitslno = fixture001mb.unitslno;
    this.sslno = fixture001mb.sslno;
    this.fcode = fixture001mb.fcode;
    this.fname = fixture001mb.fname;
    this.fyear = fixture001mb.fyear;
    this.fcapacity = fixture001mb.fcapacity;
    this.ftype = fixture001mb.ftype;
    this.fmake = fixture001mb.fmake;
    this.flocation = fixture001mb.flocation;
    this.insertUser = fixture001mb.insertUser;
    this.insertDatetime = fixture001mb.insertDatetime;
    this.updatedUser = fixture001mb.updatedUser;
    this.updatedDatetime = fixture001mb.updatedDatetime;
  }
}