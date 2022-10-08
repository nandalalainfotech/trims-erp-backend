import { Fixturerootcause001mb } from "src/entity/Fixturerootcause001mb";
import { Rootcause001mb } from "src/entity/Rootcause001mb";
import { Toolsrootcause001mb } from "src/entity/Toolsrootcause001mb";

export class ToolsRootcauseDTO {
    slNo: number;
    unitslno: number;
    sslno: number;
    tbrslno: number;
    tname: string;
    tdetails: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(toolsrootcause001mb: Toolsrootcause001mb) {
        this.slNo = toolsrootcause001mb.slNo;
        this.unitslno = toolsrootcause001mb.unitslno;
        this.sslno = toolsrootcause001mb.sslno;
        this.tbrslno = toolsrootcause001mb.tbrslno
        this.tname = toolsrootcause001mb.tname;
        this.tdetails = toolsrootcause001mb.tdetails;
        this.insertUser = toolsrootcause001mb.insertUser;
        this.insertDatetime = toolsrootcause001mb.insertDatetime;
        this.updatedUser = toolsrootcause001mb.updatedUser;
        this.updatedDatetime = toolsrootcause001mb.updatedDatetime;
    }
}