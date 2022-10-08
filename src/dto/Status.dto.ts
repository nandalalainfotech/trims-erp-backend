import { Status001mb } from "src/entity/Status001mb";

export class StatusDTO {
    slNo: number;
    unitslno: number;
    codeGroup:number;
    name: string;
    status: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(status001mb: Status001mb) {
        this.slNo = status001mb.slNo;
        this.unitslno = status001mb.unitslno;
        this.codeGroup = status001mb.codeGroup;
        this.name = status001mb.name;
        this.status = status001mb.status;
        this.insertUser = status001mb.insertUser;
        this.insertDatetime = status001mb.insertDatetime;
        this.updatedUser = status001mb.updatedUser;
        this.updatedDatetime = status001mb.updatedDatetime;
    }
}