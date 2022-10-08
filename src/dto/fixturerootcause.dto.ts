import { Fixturerootcause001mb } from "src/entity/Fixturerootcause001mb";
import { Rootcause001mb } from "src/entity/Rootcause001mb";

export class FixtureRootcauseDTO {
    slNo: number;
    unitslno: number;
    sslno: number;
    fbrslno: number;
    fname: string;
    fdetails: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(fixturerootcause001mb: Fixturerootcause001mb) {
        this.slNo = fixturerootcause001mb.slNo;
        this.unitslno = fixturerootcause001mb.unitslno;
        this.sslno = fixturerootcause001mb.sslno;
        this.fbrslno = fixturerootcause001mb.fbrslno
        this.fname = fixturerootcause001mb.fname;
        this.fdetails = fixturerootcause001mb.fdetails;
        this.insertUser = fixturerootcause001mb.insertUser;
        this.insertDatetime = fixturerootcause001mb.insertDatetime;
        this.updatedUser = fixturerootcause001mb.updatedUser;
        this.updatedDatetime = fixturerootcause001mb.updatedDatetime;
    }
}