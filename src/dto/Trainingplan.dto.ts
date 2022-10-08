import { Trainingplan001mb } from "src/entity/Trainingplan001mb";

export class TrainingplanDTO {
    slNo: number;
    unitslno: number;
    trainingname: string;
    status: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(trainingplan001mb: Trainingplan001mb) {
        this.slNo = trainingplan001mb.slNo;
        this.unitslno = trainingplan001mb.unitslno;
        this.trainingname = trainingplan001mb.trainingname;
        this.status = trainingplan001mb.status;
        this.insertUser = trainingplan001mb.insertUser;
        this.insertDatetime = trainingplan001mb.insertDatetime;
        this.updatedUser = trainingplan001mb.updatedUser;
        this.updatedDatetime = trainingplan001mb.updatedDatetime;
    }
}