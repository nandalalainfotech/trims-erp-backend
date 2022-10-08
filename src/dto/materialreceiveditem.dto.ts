import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";



export class MaterialreceiveditemDTO {
  slNo: number;
  unitslno: number;
  materialSlno: number;
  itemcode: number;
  itemname: string;
  qunty: number;
  unitrate: string;
  totalamount: number;
  receivedQty: number;
  acceptedQty: number;
  rejectedQty: number;
  outstanding: number;
  cucode: number;
  cuname: string;
  cuqunty: number;
  cunitrate: string;
  cutotalamount: number;
  cptcode: number;
  cptname: string;
  cptqunty: number;
  cptunitrate: string;
  cpttotalamount: number;
  prtcode: number;
  prtmname: string;
  prtqunty: number;
  prtunitrate: string;
  prttotalamount: number;
  descrip: string;
  cudescrip: string;
  cptdescrip: string;
  prtdescrip: string;

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

  setProperties(materialreceiveditem001wb: Materialreceiveditem001wb) {
    this.slNo = materialreceiveditem001wb.slNo;
    this.unitslno = materialreceiveditem001wb.unitslno;
    this.materialSlno = materialreceiveditem001wb.materialSlno;
    this.itemcode = materialreceiveditem001wb.itemcode;
    this.itemname = materialreceiveditem001wb.itemname;
    this.qunty = materialreceiveditem001wb.qunty;
    this.unitrate = materialreceiveditem001wb.unitrate;
    this.totalamount = materialreceiveditem001wb.totalamount;

    this.descrip = materialreceiveditem001wb.descrip;
    this.cudescrip = materialreceiveditem001wb.cudescrip;
    this.cptdescrip = materialreceiveditem001wb.cptdescrip;
    this.prtdescrip = materialreceiveditem001wb.prtdescrip;

    this.receivedQty = materialreceiveditem001wb.receivedQty;
    this.acceptedQty = materialreceiveditem001wb.acceptedQty;
    this.rejectedQty = materialreceiveditem001wb.rejectedQty;
    this.outstanding = materialreceiveditem001wb.outstanding;

    this.cucode = materialreceiveditem001wb.cucode;
    this.cuname = materialreceiveditem001wb.cuname;
    this.cuqunty = materialreceiveditem001wb.cuqunty;
    this.cunitrate = materialreceiveditem001wb.cunitrate;
    this.cutotalamount = materialreceiveditem001wb.cutotalamount;

    this.cptcode = materialreceiveditem001wb.cptcode;
    this.cptname = materialreceiveditem001wb.cptname;
    this.cptqunty = materialreceiveditem001wb.cptqunty;
    this.cptunitrate = materialreceiveditem001wb.cptunitrate;
    this.cpttotalamount = materialreceiveditem001wb.cpttotalamount;

    this.prtcode = materialreceiveditem001wb.prtcode;
    this.prtmname = materialreceiveditem001wb.prtmname;
    this.prtqunty = materialreceiveditem001wb.prtqunty;
    this.prtunitrate = materialreceiveditem001wb.prtunitrate;
    this.prttotalamount = materialreceiveditem001wb.prttotalamount;

    this.cureceivedQty = materialreceiveditem001wb.cureceivedQty;
    this.cuacceptedQty = materialreceiveditem001wb.cuacceptedQty;
    this.curejectedQty = materialreceiveditem001wb.curejectedQty;
    this.cuoutstanding = materialreceiveditem001wb.cuoutstanding;

    this.cptreceivedQty = materialreceiveditem001wb.cptreceivedQty;
    this.cptacceptedQty = materialreceiveditem001wb.cptacceptedQty;
    this.cptrejectedQty = materialreceiveditem001wb.cptrejectedQty;
    this.cptoutstanding = materialreceiveditem001wb.cptoutstanding;


    this.prtreceivedQty = materialreceiveditem001wb.prtreceivedQty;
    this.prtacceptedQty = materialreceiveditem001wb.prtacceptedQty;
    this.prtrejectedQty = materialreceiveditem001wb.prtrejectedQty;
    this.prtoutstanding = materialreceiveditem001wb.prtoutstanding;

    this.insertUser = materialreceiveditem001wb.insertUser;
    this.insertDatetime = materialreceiveditem001wb.insertDatetime;
    this.updatedUser = materialreceiveditem001wb.updatedUser;
    this.updatedDatetime = materialreceiveditem001wb.updatedDatetime;


  }
}