import { Breakdown001mb } from "src/entity/Breakdown001mb";

export class BreakdownDTO {
    slNo: number;
    unitslno: number;
    sslno: number;
    name: string;
    details: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(breakdown001mb: Breakdown001mb) {
        this.slNo = breakdown001mb.slNo;
        this.unitslno = breakdown001mb.unitslno;
        this.sslno = breakdown001mb.sslno;
        this.name = breakdown001mb.name;
        this.details = breakdown001mb.details;
        this.insertUser = breakdown001mb.insertUser;
        this.insertDatetime = breakdown001mb.insertDatetime;
        this.updatedUser = breakdown001mb.updatedUser;
        this.updatedDatetime = breakdown001mb.updatedDatetime;
    }
}