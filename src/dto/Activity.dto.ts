import { Activity001mb } from "src/entity/Activity001mb";

export class ActivityDTO {
    slNo: number;
    unitslno: number;
    activity: string;
    status: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(activity001mb: Activity001mb) {
        this.slNo = activity001mb.slNo;
        this.unitslno = activity001mb.unitslno;
        this.activity = activity001mb.activity;
        this.status = activity001mb.status;
        this.insertUser = activity001mb.insertUser;
        this.insertDatetime = activity001mb.insertDatetime;
        this.updatedUser = activity001mb.updatedUser;
        this.updatedDatetime = activity001mb.updatedDatetime;
    }
}