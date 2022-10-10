import { Part001mb } from "src/entity/Part001mb";
import { Partspecific001wb } from "src/entity/Partspecific001wb";

export class PartDTO {
    slNo: number;
    unitslno: number;
    partno: string;
    partname: string;
    hsn: string;
    splan: string;
    descrip: string;
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

    partspecific001wbs :Partspecific001wb[];
  
    setProperties(part001mb: Part001mb) {
      this.slNo = part001mb.slNo;
      this.unitslno = part001mb.unitslno;
      this.partno = part001mb.partno;
      this.partname = part001mb.partname;
      this.hsn = part001mb.hsn;
      this.splan = part001mb.splan;
      this.descrip=part001mb.descrip;
      this.unitamount=part001mb.unitamount;
      this.uom=part001mb.uom;
      this.gst=part001mb.gst;
      this.qunty=part001mb.qunty;
      this.location = part001mb.location;
      this.mslevel = part001mb.mslevel;
      this.orderlevel = part001mb.orderlevel;
      this.leadtime = part001mb.leadtime;
      this.insertUser = part001mb.insertUser;
      this.insertDatetime = part001mb.insertDatetime;
      this.updatedUser = part001mb.updatedUser;
      this.updatedDatetime = part001mb.updatedDatetime;
    }
  }