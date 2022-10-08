import { Materialinspection001wb } from "src/entity/MaterialInspection001wb";
import { Observationsitems001wb } from "src/entity/Observationsitems001wb";
import { Rawmaterialinspection001wb } from "src/entity/Rawmaterialinspection001wb";


export class MaterialinspectionDTO {
    slNo: number;
    unitslno: number;
    iirno: string;
    cdate: Date;
    scname: string;
    dcno: string;
    refno: string;
    pdate: Date;
    cponumber: string;
    sponumber: string;
    grnumber: number;
    remark: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    Rawmaterialinspection:Rawmaterialinspection001wb[]|any;
    observationsitems001wbs:  Observationsitems001wb[]|any;
   

  setProperties(materialinspection001wb: Materialinspection001wb) {
    this.slNo = materialinspection001wb.slNo;
    this.unitslno = materialinspection001wb.unitslno;
    this.iirno = materialinspection001wb.iirno;
    this.cdate =new Date(materialinspection001wb.cdate);
    this.scname = materialinspection001wb.scname;
    this.dcno = materialinspection001wb.dcno;
    this.refno = materialinspection001wb.refno;
    this.pdate = materialinspection001wb.pdate;
    this.cponumber = materialinspection001wb.cponumber;
    this.sponumber = materialinspection001wb.sponumber;
    this.grnumber = materialinspection001wb.grnumber;
    this.remark = materialinspection001wb.remark;
    this.insertUser = materialinspection001wb.insertUser;
    this.insertDatetime = materialinspection001wb.insertDatetime;
    this.updatedUser = materialinspection001wb.updatedUser;
    this.updatedDatetime = materialinspection001wb.updatedDatetime;
  }
}