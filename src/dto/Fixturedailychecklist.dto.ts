import { Fixturedailychecklist001wb } from "src/entity/Fixturedailychecklist001wb";

export class FixturedailychecklistDTO {
    slNo: number;
    unitslno?: number;
    mslno: number;
    cpslno: number;
    date: Date;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(fixturedailychecklist001wb: Fixturedailychecklist001wb) {
        this.slNo = fixturedailychecklist001wb.slNo;
        this.unitslno = fixturedailychecklist001wb.unitslno;
        this.mslno = fixturedailychecklist001wb.mslno;
        this.cpslno = fixturedailychecklist001wb.cpslno;
        this.date = fixturedailychecklist001wb.date;
        this.insertUser = fixturedailychecklist001wb.insertUser;
        this.insertDatetime = fixturedailychecklist001wb.insertDatetime;
        this.updatedUser = fixturedailychecklist001wb.updatedUser;
        this.updatedDatetime = fixturedailychecklist001wb.updatedDatetime;
    }
}