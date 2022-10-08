import { Rootcause001mb } from "src/entity/Rootcause001mb";

export class RootcauseDTO {
    slNo: number;
    unitslno: number;
    sslno: number;
    brslno: number;
    name: string;
    details: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(rootcause001mb: Rootcause001mb) {
        this.slNo = rootcause001mb.slNo;
        this.unitslno = rootcause001mb.unitslno;
        this.sslno = rootcause001mb.sslno;
        this.brslno = rootcause001mb.brslno
        this.name = rootcause001mb.name;
        this.details = rootcause001mb.details;
        this.insertUser = rootcause001mb.insertUser;
        this.insertDatetime = rootcause001mb.insertDatetime;
        this.updatedUser = rootcause001mb.updatedUser;
        this.updatedDatetime = rootcause001mb.updatedDatetime;
    }
}