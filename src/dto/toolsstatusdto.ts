import { Status001mb } from "src/entity/Status001mb";
import { Toolsstatus001mb } from "src/entity/Toolsstatus001mb";

export class ToolsStatusDTO {
    slNo: number;
    unitslno: number;
    codeGroup:number;
    name: string;
    status: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(toolsstatus001mb: Toolsstatus001mb) {
        this.slNo = toolsstatus001mb.slNo;
        this.unitslno = toolsstatus001mb.unitslno;
        this.codeGroup = toolsstatus001mb.codeGroup;
        this.name = toolsstatus001mb.name;
        this.status = toolsstatus001mb.status;
        this.insertUser = toolsstatus001mb.insertUser;
        this.insertDatetime = toolsstatus001mb.insertDatetime;
        this.updatedUser = toolsstatus001mb.updatedUser;
        this.updatedDatetime = toolsstatus001mb.updatedDatetime;
    }
}