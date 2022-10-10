import { Childpart001mb } from "src/entity/ChildPart001mb";
import { Childpartspecification001wb } from "src/entity/Childpartspecification001wb";

export class ChildPartDTO {
  slNo: number;
  unitslno: number;
  cpartno: string;
  cpartname: string;
  splan: string;
  descrip: string;
  hsn: string;
  qunty: string;
  unitamount: number;
  uom: string;
  gst: number;
  location: string;
  mslevel: string;
  orderlevel: string;
  leadtime: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  childpartspecification001wbs: Childpartspecification001wb[];

  setProperties(childpart001mb: Childpart001mb) {
    this.slNo = childpart001mb.slNo;
    this.unitslno = childpart001mb.unitslno;
    this.cpartno = childpart001mb.cpartno;
    this.cpartname = childpart001mb.cpartname;
    this.splan = childpart001mb.splan;
    this.descrip=childpart001mb.descrip;
    this.unitamount=childpart001mb.unitamount;
    this.uom=childpart001mb.uom;
    this.gst=childpart001mb.gst;
    this.hsn=childpart001mb.hsn;
    this.qunty=childpart001mb.qunty;
    this.location = childpart001mb.location;
    this.mslevel = childpart001mb.mslevel;
    this.orderlevel = childpart001mb.orderlevel;
    this.leadtime = childpart001mb.leadtime;
    this.insertUser = childpart001mb.insertUser;
    this.insertDatetime = childpart001mb.insertDatetime;
    this.updatedUser = childpart001mb.updatedUser;
    this.updatedDatetime = childpart001mb.updatedDatetime;
  }
}
