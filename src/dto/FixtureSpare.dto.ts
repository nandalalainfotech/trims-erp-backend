import { Fixturespares001mb } from "src/entity/Fixturespares001mb";
import { Spares001mb } from "src/entity/Spares001mb";

export class FixtureSparesDTO {
  slNo: number;
  unitslno: number;
  msslno: number;
  sslno: number;
  fspares: string;
  fsparescost: number | null;
  fspecification: string;
  fleadtime: Date | null;
  fminimumstocklevel: number | null;
  freorderlevel: number | null;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  setProperties(fixturespares001mb: Fixturespares001mb) {
    this.slNo = fixturespares001mb.slNo;
    this.unitslno = fixturespares001mb.unitslno;
    this.msslno = fixturespares001mb.msslno;
    this.sslno = fixturespares001mb.sslno;
    this.fsparescost = fixturespares001mb.fsparescost;
    this.fspares = fixturespares001mb.fspares;
    this.fspecification = fixturespares001mb.fspecification;
    this.fleadtime = fixturespares001mb.fleadtime;
    this.fminimumstocklevel = fixturespares001mb.fminimumstocklevel;
    this.freorderlevel = fixturespares001mb.freorderlevel;
    this.insertUser = fixturespares001mb.insertUser;
    this.insertDatetime = fixturespares001mb.insertDatetime;
    this.updatedUser = fixturespares001mb.updatedUser;
    this.updatedDatetime = fixturespares001mb.updatedDatetime;
  }
}