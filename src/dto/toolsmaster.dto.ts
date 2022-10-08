import { Fixture001mb } from "src/entity/Fixture001mb";
import { Machine001mb } from "src/entity/Machine001mb";
import { Toolsmaster001mb } from "src/entity/Toolsmaster001mb";


export class ToolsMasterDTO {
  slNo: number;
  unitslno: number;
  tsslno: number;
  tcode: string;
  tname: string;
  tyear: Date | null;
  tcapacity: string;
  ttype: string;
  tmake: string;
  tlocation: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;


  setProperties(toolsmaster001mb: Toolsmaster001mb) {
    this.slNo = toolsmaster001mb.slNo;
    this.unitslno = toolsmaster001mb.unitslno;
    this.tsslno = toolsmaster001mb.tsslno;
    this.tcode = toolsmaster001mb.tcode;
    this.tname = toolsmaster001mb.tname;
    this.tyear = toolsmaster001mb.tyear;
    this.tcapacity = toolsmaster001mb.tcapacity;
    this.ttype = toolsmaster001mb.ttype;
    this.tmake = toolsmaster001mb.tmake;
    this.tlocation = toolsmaster001mb.tlocation;
    this.insertUser = toolsmaster001mb.insertUser;
    this.insertDatetime = toolsmaster001mb.insertDatetime;
    this.updatedUser = toolsmaster001mb.updatedUser;
    this.updatedDatetime = toolsmaster001mb.updatedDatetime;
  }
}