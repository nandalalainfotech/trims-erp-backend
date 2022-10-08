import { Tool001mb } from "src/entity/Tool001mb";


export class ToolDTO {
    slNo: number;
    unitslno: number;
    pdno: number;
    fix1: string;
    fix2: string;
    fix3: string;
    fix4: string;
    fix5: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;


    setProperties(tool001mb: Tool001mb) {

        this.slNo = tool001mb.slNo;
        this.unitslno = tool001mb.unitslno;
        this.pdno = tool001mb.pdno;
        this.fix1 = tool001mb.fix1;
        this.fix2 = tool001mb.fix2;
        this.fix3 = tool001mb.fix3;
        this.fix4 = tool001mb.fix4;
        this.fix5 = tool001mb.fix5;
        this.insertUser = tool001mb.insertUser;
        this.insertDatetime = tool001mb.insertDatetime;
        this.updatedUser = tool001mb.updatedUser;
        this.updatedDatetime = tool001mb.updatedDatetime;
    }
}