import { Observationsitems001wb } from "src/entity/Observationsitems001wb";
import { Rawmaterialinspection001wb } from "src/entity/Rawmaterialinspection001wb";

export class RawmaterialinspectionDTO {
  slNo: number;
  unitslno: number;
  rawmaterialslno: number;
  itemcode: number | any;
  itemname: string;
  descrip: string;
  cucode: number;
  cuname: string;
  cudescrip: string;
  cptcode: number;
  cptname: string;
  cptdescrip: string;
  prtcode: number;
  prtname: string;
  prtdescrip: string;

  qunty: number | any;
  cptqunty: number;
  cuqunty: number;
  prtqunty: number;

  receivedQty: number;
  acceptedQty: number;
  rejectedQty: number;
  outstanding: number;

  cureceivedQty: number;
  cuacceptedQty: number;
  curejectedQty: number;
  cuoutstanding: number;

  cptreceivedQty: number;
  cptacceptedQty: number;
  cptrejectedQty: number;
  cptoutstanding: number;

  prtreceivedQty: number;
  prtacceptedQty: number;
  prtrejectedQty: number;
  prtoutstanding: number;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;
  orderitemSlno: any;
  
  observationsitems001wbs:  Observationsitems001wb[] = [];
  closing: number;
  cucolsing: number;
  cptcolsing: number;
  prtcolsing: number;
  acceptedsum: number;
  cuacceptedsum: number;
  cptacceptedsum: number;
  prtacceptedsum: number;
  rejectesum: number;
  curejectesum: number;
  cptrejectesum: number;
  prtrejectesum: number;

  setProperties(rawmaterialinspection001wb: Rawmaterialinspection001wb) {
    this.slNo = rawmaterialinspection001wb.slNo;
    this.unitslno = rawmaterialinspection001wb.unitslno;
    this.rawmaterialslno = rawmaterialinspection001wb.rawmaterialslno;
    this.itemcode = rawmaterialinspection001wb.itemcode;
    this.descrip = rawmaterialinspection001wb.descrip;
    this.cucode = rawmaterialinspection001wb.cucode;
    this.cuname = rawmaterialinspection001wb.cuname;
    this.cudescrip = rawmaterialinspection001wb.cudescrip;
    this.cptcode = rawmaterialinspection001wb.cptcode;
    this.cptname = rawmaterialinspection001wb.cptname;
    this.cptdescrip = rawmaterialinspection001wb.cptdescrip;
    this.prtcode = rawmaterialinspection001wb.prtcode;
    this.prtname = rawmaterialinspection001wb.prtname;
    this.prtdescrip = rawmaterialinspection001wb.prtdescrip;

    this.prtqunty = rawmaterialinspection001wb.prtqunty;
    this.cuqunty = rawmaterialinspection001wb.cuqunty;
    this.cptqunty = rawmaterialinspection001wb.cptqunty;
    this.qunty = rawmaterialinspection001wb.qunty;

    this.cptreceivedQty = rawmaterialinspection001wb.cptreceivedQty;
    this.cptacceptedQty = rawmaterialinspection001wb.cptacceptedQty;
    this.cptrejectedQty = rawmaterialinspection001wb.cptrejectedQty;
    this.cptoutstanding = rawmaterialinspection001wb.cptoutstanding;

    this.prtreceivedQty = rawmaterialinspection001wb.prtreceivedQty;
    this.prtacceptedQty = rawmaterialinspection001wb.prtacceptedQty;
    this.prtrejectedQty = rawmaterialinspection001wb.prtrejectedQty;
    this.prtoutstanding = rawmaterialinspection001wb.prtoutstanding;

    this.receivedQty = rawmaterialinspection001wb.receivedQty;
    this.acceptedQty = rawmaterialinspection001wb.acceptedQty;
    this.rejectedQty = rawmaterialinspection001wb.rejectedQty;
    this.outstanding = rawmaterialinspection001wb.outstanding;

    this.cureceivedQty = rawmaterialinspection001wb.cureceivedQty;
    this.cuacceptedQty = rawmaterialinspection001wb.cuacceptedQty;
    this.curejectedQty = rawmaterialinspection001wb.curejectedQty;
    this.cuoutstanding = rawmaterialinspection001wb.cuoutstanding;
    this.insertUser = rawmaterialinspection001wb.insertUser;
    this.insertDatetime = rawmaterialinspection001wb.insertDatetime;
    this.updatedUser = rawmaterialinspection001wb.updatedUser;
    this.updatedDatetime = rawmaterialinspection001wb.updatedDatetime;


  }
}