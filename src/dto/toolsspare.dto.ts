import { Spares001mb } from "src/entity/Spares001mb";
import { Toolsspares001mb } from "src/entity/Toolsspares001mb";

export class ToolsSparesDTO {
  slNo: number;
  unitslno: number;
  msslno: number;
  tsslno: number;
  tspares: string;
  tsparescost: number | null;
  tspecification: string;
  tleadtime: Date | null;
  tminimumstocklevel: number | null;
  treorderlevel: number | null;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  setProperties(toolsspares001mb: Toolsspares001mb) {
    this.slNo = toolsspares001mb.slNo;
    this.unitslno = toolsspares001mb.unitslno;
    this.msslno = toolsspares001mb.msslno;
    this.tsslno = toolsspares001mb.tsslno;
    this.tsparescost = toolsspares001mb.tsparescost;
    this.tspares = toolsspares001mb.tspares;
    this.tspecification = toolsspares001mb.tspecification;
    this.tleadtime = toolsspares001mb.tleadtime;
    this.tminimumstocklevel = toolsspares001mb.tminimumstocklevel;
    this.treorderlevel = toolsspares001mb.treorderlevel;
    this.insertUser = toolsspares001mb.insertUser;
    this.insertDatetime = toolsspares001mb.insertDatetime;
    this.updatedUser = toolsspares001mb.updatedUser;
    this.updatedDatetime = toolsspares001mb.updatedDatetime;
  }
}