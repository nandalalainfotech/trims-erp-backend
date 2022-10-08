import { Purchaseable001mb } from "src/entity/Purchaseable001mb";

export class PurchaseableDTO {
    slNo: number;
    unitslno: number;
    purscode: string;
    pursname: string;
    descrip: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(purchaseable001mb: Purchaseable001mb) {
        this.slNo=purchaseable001mb.slNo;
        this.unitslno=purchaseable001mb.unitslno;
        this.purscode=purchaseable001mb.purscode;
        this.pursname=purchaseable001mb.pursname;
        this.descrip=purchaseable001mb.descrip;
        this.insertUser = purchaseable001mb.insertUser;
        this.insertDatetime = purchaseable001mb.insertDatetime;
        this.updatedUser = purchaseable001mb.updatedUser;
        this.updatedDatetime = purchaseable001mb.updatedDatetime;
    }
}