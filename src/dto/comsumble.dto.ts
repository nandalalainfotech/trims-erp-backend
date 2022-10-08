import { Consumble001mb } from "src/entity/Consumble001mb";
import { Consumerspecification001wb } from "src/entity/Consumerspecification001wb";


export class ConsumbleDTO {
    slNo: number;
    unitslno: number;
    consmno: string;
    consname: string;
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

    consumerspecification: Consumerspecification001wb[];
  
    setProperties(consumble001mb: Consumble001mb) {
        this.slNo = consumble001mb.slNo;
        this.unitslno = consumble001mb.unitslno;
        this.consmno = consumble001mb.consmno;
        this.consname = consumble001mb.consname;
        this.splan = consumble001mb.splan;
        this.descrip=consumble001mb.descrip;
        this.unitamount=consumble001mb.unitamount;
        this.uom=consumble001mb.uom;
        this.gst=consumble001mb.gst;
        this.hsn = consumble001mb.hsn;
        this.qunty=consumble001mb.qunty;
        this.location = consumble001mb.location;
        this.mslevel = consumble001mb.mslevel;
        this.orderlevel = consumble001mb.orderlevel;
        this.leadtime = consumble001mb.leadtime;
        this.insertUser = consumble001mb.insertUser;
        this.insertDatetime = consumble001mb.insertDatetime;
        this.updatedUser = consumble001mb.updatedUser;
        this.updatedDatetime = consumble001mb.updatedDatetime;
    
    
      }
  }