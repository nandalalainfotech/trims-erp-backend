import { Suppliertrainingplan001wb } from "src/entity/Suppliertrainingplan001wb";

export class SuppliertrainingplanDTO {
    slNo: number;
    unitslno: number;
    supregslNo: number;
    trainingslNo: number;
    status: string;
    date: Date;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(suppliertrainingplan001wb: Suppliertrainingplan001wb) {
        this.slNo = suppliertrainingplan001wb.slNo;
        this.unitslno = suppliertrainingplan001wb.unitslno;
        this.supregslNo = suppliertrainingplan001wb.supregslNo;
        this.trainingslNo = suppliertrainingplan001wb.trainingslNo;
        this.status = suppliertrainingplan001wb.status;
        this.date = suppliertrainingplan001wb.date;
        this.insertUser = suppliertrainingplan001wb.insertUser;
        this.insertDatetime = suppliertrainingplan001wb.insertDatetime;
        this.updatedUser = suppliertrainingplan001wb.updatedUser;
        this.updatedDatetime = suppliertrainingplan001wb.updatedDatetime;
    }
}