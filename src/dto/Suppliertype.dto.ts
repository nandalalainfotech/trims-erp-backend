import { Suppliertype001mb } from "src/entity/Suppliertype001mb";

export class SuppliertypeDTO {
    slNo: number;
    unitslno: number;
    sslno:number;
    name: string;
    descrip: string;
    order: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(suppliertype001mb: Suppliertype001mb) {
        this.slNo = suppliertype001mb.slNo;
        this.unitslno = suppliertype001mb.unitslno;
        this.sslno = suppliertype001mb.sslno;
        this.name = suppliertype001mb.name;
        this.descrip = suppliertype001mb.descrip;
        this.order = suppliertype001mb.order;
        this.insertUser = suppliertype001mb.insertUser;
        this.insertDatetime = suppliertype001mb.insertDatetime;
        this.updatedUser = suppliertype001mb.updatedUser;
        this.updatedDatetime = suppliertype001mb.updatedDatetime;
    }
}