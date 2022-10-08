import { Firstaidwb001 } from "src/entity/Firstaidwb001";
import { Legal001mb } from "src/entity/Legal001mb";
import { Legal001wb } from "src/entity/Legal001wb";

export class LegalwbDTO {
    slNo: number;
    unitslno: number;
    cslno: number;
    fslno: number;
    filename: string = "";
    filepath: string;
    originalfilename: string;
    cno:number;
    date: Date;
    date1:Date;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
    cslno2: Legal001mb;

    setProperties(legal001wb : Legal001wb ) {
        
        this.slNo = legal001wb.slNo;
        this.unitslno = legal001wb.unitslno;
        this.cslno = legal001wb.cslno;
        this.fslno = legal001wb.fslno;
        this.originalfilename = legal001wb.originalfilename;
        this.cno=legal001wb.cno;
        this.date=legal001wb.date;
        this.date1=legal001wb.date1;
        this.filename = legal001wb.filename;
        this.filepath = legal001wb.filepath;
        this.originalfilename = legal001wb.originalfilename;
        this.insertUser = legal001wb.insertUser;
        this.insertDatetime = legal001wb.insertDatetime;
        this.updatedUser = legal001wb.updatedUser;
        this.updatedDatetime = legal001wb.updatedDatetime;
    }
}