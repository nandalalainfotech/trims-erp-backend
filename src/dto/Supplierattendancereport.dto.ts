import { Supplierattendancereport001wb } from "src/entity/Supplierattendancereport001wb";

export class SupplierattendancereportDTO {
    slNo: number;
    unitslno: number;
    supregslNo: number;
    trainingslNo: number;
    trainerName: string;
    traineeName: string;
    traineeRole: string;
    attendancestatus: string;
    date: Date;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(supplierattendancereport001wb: Supplierattendancereport001wb) {
        this.slNo = supplierattendancereport001wb.slNo;
        this.unitslno = supplierattendancereport001wb.unitslno;
        this.supregslNo = supplierattendancereport001wb.supregslNo;
        this.trainingslNo = supplierattendancereport001wb.trainingslNo;
        this.trainerName = supplierattendancereport001wb.trainerName;
        this.traineeName = supplierattendancereport001wb.traineeName;
        this.traineeRole = supplierattendancereport001wb.traineeRole;
        this.attendancestatus = supplierattendancereport001wb.attendancestatus;
        this.date = supplierattendancereport001wb.date;
        this.insertUser = supplierattendancereport001wb.insertUser;
        this.insertDatetime = supplierattendancereport001wb.insertDatetime;
        this.updatedUser = supplierattendancereport001wb.updatedUser;
        this.updatedDatetime = supplierattendancereport001wb.updatedDatetime;
    }
}