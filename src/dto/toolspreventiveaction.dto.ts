import { Fixturepreventiveaction001mb } from "src/entity/Fixturepreventiveaction001mb";
import { Preventiveaction001mb } from "src/entity/Preventiveaction001mb";
import { Toolspreventiveaction001mb } from "src/entity/Toolspreventiveaction001mb";

export class ToolsPreventiveactionDTO {
    slNo: number;
    unitslno: number;
    sslno: number;
    trcslno: number;
    tname: string;
    tdetails: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(toolspreventiveaction001mb: Toolspreventiveaction001mb) {
        this.slNo = toolspreventiveaction001mb.slNo;
        this.unitslno = toolspreventiveaction001mb.unitslno;
        this.sslno = toolspreventiveaction001mb.sslno;
        this.trcslno = toolspreventiveaction001mb.trcslno
        this.tname = toolspreventiveaction001mb.tname;
        this.tdetails = toolspreventiveaction001mb.tdetails;
        this.insertUser = toolspreventiveaction001mb.insertUser;
        this.insertDatetime = toolspreventiveaction001mb.insertDatetime;
        this.updatedUser = toolspreventiveaction001mb.updatedUser;
        this.updatedDatetime = toolspreventiveaction001mb.updatedDatetime;
    }
}