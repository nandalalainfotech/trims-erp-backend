import { Suppchecklist001mb } from "src/entity/Suppchecklist001mb";

export class SuppChecklistDTO {
    slNo: number;
    unitslno: number;
    activityslNo: number;
    checkpointsName: string;
    status: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(suppchecklist001mb: Suppchecklist001mb) {
        this.slNo = suppchecklist001mb.slNo;
        this.unitslno = suppchecklist001mb.unitslno;
        this.activityslNo = suppchecklist001mb.activityslNo;
        this.checkpointsName = suppchecklist001mb.checkpointsName;
        this.status = suppchecklist001mb.status;
        this.insertUser = suppchecklist001mb.insertUser;
        this.insertDatetime = suppchecklist001mb.insertDatetime;
        this.updatedUser = suppchecklist001mb.updatedUser;
        this.updatedDatetime = suppchecklist001mb.updatedDatetime;
    }
}