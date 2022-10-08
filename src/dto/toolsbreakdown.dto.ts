import { Breakdown001mb } from "src/entity/Breakdown001mb";
import { Fixturebreakdown001mb } from "src/entity/Fixturebreakdown001mb";
import { Toolsbreakdown001mb } from "src/entity/Toolsbreakdown001mb";

export class ToolsBreakdownDTO {
    slNo: number;
    unitslno: number;
    sslno: number;
    tbname: string;
    tbdetails: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(toolsbreakdown001mb: Toolsbreakdown001mb) {
        this.slNo = toolsbreakdown001mb.slNo;
        this.unitslno = toolsbreakdown001mb.unitslno;
        this.sslno = toolsbreakdown001mb.sslno;
        this.tbname = toolsbreakdown001mb.tbname;
        this.tbdetails = toolsbreakdown001mb.tbdetails;
        this.insertUser = toolsbreakdown001mb.insertUser;
        this.insertDatetime = toolsbreakdown001mb.insertDatetime;
        this.updatedUser = toolsbreakdown001mb.updatedUser;
        this.updatedDatetime = toolsbreakdown001mb.updatedDatetime;
    }
}