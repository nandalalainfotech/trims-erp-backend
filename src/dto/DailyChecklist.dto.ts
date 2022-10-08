import { Dailychecklist001wb } from "src/entity/Dailychecklist001wb";

export class DailyChecklistDTO {
    slNo: number;
    unitslno: number;
    mslno: number;
    cpslno: number;
    date: Date;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(dailychecklist001wb: Dailychecklist001wb) {
        this.slNo = dailychecklist001wb.slNo;
        this.unitslno = dailychecklist001wb.unitslno;
        this.mslno = dailychecklist001wb.mslno;
        this.cpslno = dailychecklist001wb.cpslno;
        this.date = dailychecklist001wb.date;
        this.insertUser = dailychecklist001wb.insertUser;
        this.insertDatetime = dailychecklist001wb.insertDatetime;
        this.updatedUser = dailychecklist001wb.updatedUser;
        this.updatedDatetime = dailychecklist001wb.updatedDatetime;
    }
}