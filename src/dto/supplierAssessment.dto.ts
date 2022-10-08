import { Supplierassessment001wb } from "src/entity/Supplierassessment001wb";

export class SupplierAssessmentDTO {
    slNo: number;
    unitslno: number;
    suppSlno: number;
    assessSlno: number;
    score: number;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(supplierassess001wb: Supplierassessment001wb) {
        this.slNo = supplierassess001wb.slNo;
        this.unitslno = supplierassess001wb.unitslno;
        this.suppSlno = supplierassess001wb.suppSlno;
        this.assessSlno = supplierassess001wb.assessSlno;
        this.score = supplierassess001wb.score;
        this.insertUser = supplierassess001wb.insertUser;
        this.insertDatetime = supplierassess001wb.insertDatetime;
        this.updatedUser = supplierassess001wb.updatedUser;
        this.updatedDatetime = supplierassess001wb.updatedDatetime;
    }
}