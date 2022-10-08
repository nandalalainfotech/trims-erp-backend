import { Preventiveaction001mb } from "src/entity/Preventiveaction001mb";

export class PreventiveactionDTO {
    slNo: number;
    unitslno: number;
    sslno: number;
    rcslno: number;
    name: string;
    details: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(preventiveaction001mb: Preventiveaction001mb) {
        this.slNo = preventiveaction001mb.slNo;
        this.unitslno = preventiveaction001mb.unitslno;
        this.sslno = preventiveaction001mb.sslno;
        this.rcslno = preventiveaction001mb.rcslno
        this.name = preventiveaction001mb.name;
        this.details = preventiveaction001mb.details;
        this.insertUser = preventiveaction001mb.insertUser;
        this.insertDatetime = preventiveaction001mb.insertDatetime;
        this.updatedUser = preventiveaction001mb.updatedUser;
        this.updatedDatetime = preventiveaction001mb.updatedDatetime;
    }
}