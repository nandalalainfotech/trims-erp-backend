import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Salesitem001mb } from "src/entity/Salesitem001mb";



export class SalesItemMbDTO {
    slNo: number;
    unitslno: number;
    procode: string;
    proname: string;
    prodescrip: string;
    proqunty: string;
    prounitamount: number;
    prouom: string;
    progst: number;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(salesitem001mb: Salesitem001mb) {
        this.unitslno=salesitem001mb.unitslno;
        this.slNo=salesitem001mb.slNo;
        this.procode=salesitem001mb.procode;
        this.proname=salesitem001mb.proname;
        this.prodescrip=salesitem001mb.prodescrip;
        this.prounitamount=salesitem001mb.prounitamount;
        this.prouom=salesitem001mb.prouom;
        this.progst=salesitem001mb.progst
        this.proqunty = salesitem001mb.proqunty;
        this.insertUser = salesitem001mb.insertUser;
        this.insertDatetime = salesitem001mb.insertDatetime;
        this.updatedUser = salesitem001mb.updatedUser;
        this.updatedDatetime = salesitem001mb.updatedDatetime;
    }
}