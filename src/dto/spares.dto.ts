import { Spares001mb } from "src/entity/Spares001mb";

export class SparesDTO {
  slNo: number;
  unitslno: number;
  msslno: number;
  sslno: number;
  spares: string;
  sparescost: number | null;
  specification: string;
  leadtime: string;
  minimumstocklevel: number | null;
  reorderlevel: number | null;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  setProperties(spares001mb: Spares001mb) {
    this.slNo = spares001mb.slNo;
    this.unitslno = spares001mb.unitslno;
    this.msslno = spares001mb.msslno;
    this.sslno = spares001mb.sslno;
    this.sparescost = spares001mb.sparescost;
    this.spares = spares001mb.spares;
    this.specification = spares001mb.specification;
    this.leadtime = spares001mb.leadtime;
    this.minimumstocklevel = spares001mb.minimumstocklevel;
    this.reorderlevel = spares001mb.reorderlevel;
    this.insertUser = spares001mb.insertUser;
    this.insertDatetime = spares001mb.insertDatetime;
    this.updatedUser = spares001mb.updatedUser;
    this.updatedDatetime = spares001mb.updatedDatetime;
  }
}