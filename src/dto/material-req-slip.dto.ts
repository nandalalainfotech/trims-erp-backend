import { Materialreqslip001wb } from "src/entity/Materialreqslip001wb";

export class MaterialRequisitionSlipDTO {
    slNo: number;
    unitslno: number;
    spareSlno: number;
    mrsNo: string;
    date: Date;
    requestorName: string;
    department: string;
    description: string;
    qty: number;
    remarks: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(materialreqslip001wb: Materialreqslip001wb) {
        this.slNo = materialreqslip001wb.slNo;
        this.unitslno = materialreqslip001wb.unitslno;
        this.spareSlno = materialreqslip001wb.spareSlno;
        this.mrsNo = materialreqslip001wb.mrsNo;
        this.date = materialreqslip001wb.date;
        this.requestorName = materialreqslip001wb.requestorName;
        this.department = materialreqslip001wb.department;
        this.description = materialreqslip001wb.description;
        this.qty = materialreqslip001wb.qty;
        this.remarks = materialreqslip001wb.remarks;
        this.insertUser = materialreqslip001wb.insertUser;
        this.insertDatetime = materialreqslip001wb.insertDatetime;
        this.updatedUser = materialreqslip001wb.updatedUser;
        this.updatedDatetime = materialreqslip001wb.updatedDatetime;
    }
}