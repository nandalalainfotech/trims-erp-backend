import { Customerpoitem001wb } from "src/entity/Customerpoitem001wb";
import { Customerpomaster001mb } from "src/entity/Customerpomaster001mb";

export class CustomerpomasterDTO {
    slNo: number;
    unitslno: number;
    custemercode: number;
    custemername: string;
    custemerPONo: string;
    poDate: Date | null;
    deliveryDate: Date | null;
    packing: string;
    logistic: string;
    inspection: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    customerpoitem001wbs: Customerpoitem001wb[] = [];

    setProperties(customerpomaster001mb:  Customerpomaster001mb) {
        this.slNo = customerpomaster001mb.slNo;
        this.unitslno = customerpomaster001mb.unitslno;
        this.custemername = customerpomaster001mb.custemername;
        this.custemercode = customerpomaster001mb.custemercode
        this.custemerPONo = customerpomaster001mb.custemerPONo;
        this.poDate = new Date(customerpomaster001mb.poDate);
        this.deliveryDate = new Date(customerpomaster001mb.deliveryDate);
        this.packing = customerpomaster001mb.packing;
        this.logistic = customerpomaster001mb.logistic;
        this.inspection = customerpomaster001mb.inspection;
        this.insertUser = customerpomaster001mb.insertUser;
        this.insertDatetime = customerpomaster001mb.insertDatetime;
        this.updatedUser = customerpomaster001mb.updatedUser;
        this.updatedDatetime = customerpomaster001mb.updatedDatetime;
    }
}