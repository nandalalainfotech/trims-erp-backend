import { Fixturestatus001mb } from "src/entity/Fixturestatus001mb";
import { Status001mb } from "src/entity/Status001mb";

export class FixtureStatusDTO {
    slNo: number;
    unitslno: number;
    codeGroup:number;
    name: string;
    status: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(fixturestatus001mb: Fixturestatus001mb) {
        this.slNo = fixturestatus001mb.slNo;
        this.unitslno = fixturestatus001mb.unitslno;
        this.codeGroup = fixturestatus001mb.codeGroup;
        this.name = fixturestatus001mb.name;
        this.status = fixturestatus001mb.status;
        this.insertUser = fixturestatus001mb.insertUser;
        this.insertDatetime = fixturestatus001mb.insertDatetime;
        this.updatedUser = fixturestatus001mb.updatedUser;
        this.updatedDatetime = fixturestatus001mb.updatedDatetime;
    }
}