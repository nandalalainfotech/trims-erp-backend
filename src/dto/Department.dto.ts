import { Department001mb } from "src/entity/Department001mb";

export class DepartmentDTO {
    slNo: number;
    // unitslno: number;
    sslno: number;
    department: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(department001mb: Department001mb) {
        this.slNo = department001mb.slNo;
        // this.unitslno = department001mb.unitslno;
        this.sslno = department001mb.sslno;
        this.department = department001mb.department;
        this.insertUser = department001mb.insertUser;
        this.insertDatetime = department001mb.insertDatetime;
        this.updatedUser = department001mb.updatedUser;
        this.updatedDatetime = department001mb.updatedDatetime;
    }
}