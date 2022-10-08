import { Orderitem001mb } from "src/entity/Orderitem001mb";
import { Orderitemspecification001wb } from "src/entity/Orderitemspecification001wb";



export class OrderItemMbDTO {
    slNo: number;
    unitslno: number;
    itemcode: string;
    itemname: string;
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
    pslno2:any

    Orderitemspecification:Orderitemspecification001wb[];
    

    setProperties(orderitem001mb: Orderitem001mb) {
        this.slNo=orderitem001mb.slNo;
        this.unitslno=orderitem001mb.unitslno;
        this.itemcode=orderitem001mb.itemcode;
        this.itemname=orderitem001mb.itemname;
        this.descrip=orderitem001mb.descrip;
        this.unitamount=orderitem001mb.unitamount;
        this.uom=orderitem001mb.uom;
        this.gst=orderitem001mb.gst;
        this.hsn=orderitem001mb.hsn;
        this.location = orderitem001mb.location;
        this.mslevel = orderitem001mb.mslevel;
        this.orderlevel = orderitem001mb.orderlevel;
        this.leadtime = orderitem001mb.leadtime;
        this.qunty = orderitem001mb.qunty;
        this.insertUser = orderitem001mb.insertUser;
        this.insertDatetime = orderitem001mb.insertDatetime;
        this.updatedUser = orderitem001mb.updatedUser;
        this.updatedDatetime = orderitem001mb.updatedDatetime;
    }
}