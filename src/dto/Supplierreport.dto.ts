import { Supplierreport001wb } from "src/entity/Supplierreport001wb";

export class SupplierreportDTO {
    slNo: number;
    unitslno: number;
    supregslNo: number;
    activeslNo: number;
    supcheckslNo: number;
    observation: string;
    auditScore: number;
    ncrRef: number;
    remarks: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(supplierreport001wb: Supplierreport001wb) {
        this.slNo = supplierreport001wb.slNo;
        this.unitslno = supplierreport001wb.unitslno;
        this.supregslNo = supplierreport001wb.supregslNo;
        this.activeslNo = supplierreport001wb.activeslNo;
        this.supcheckslNo = supplierreport001wb.supcheckslNo;
        this.observation = supplierreport001wb.observation;
        this.auditScore = supplierreport001wb.auditScore;
        this.ncrRef = supplierreport001wb.ncrRef;
        this.remarks = supplierreport001wb.remarks;
        this.insertUser = supplierreport001wb.insertUser;
        this.insertDatetime = supplierreport001wb.insertDatetime;
        this.updatedUser = supplierreport001wb.updatedUser;
        this.updatedDatetime = supplierreport001wb.updatedDatetime;
    }
}