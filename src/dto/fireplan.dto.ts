import { Fireplan001wb } from "src/entity/Fireplan001wb";
import { Firstaidwb001 } from "src/entity/Firstaidwb001";

export class FireplanDTO {
    slNo?: number;
    unitslno: number;
    fire: string | any;
    app: string = "";
    loc: string = "";
    date: Date;
    date1: Date;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
 

    setProperties(fireplan001wb : Fireplan001wb ) {
        
        this.slNo = fireplan001wb.slNo;
        this.unitslno = fireplan001wb.unitslno;
        this.fire = fireplan001wb.fire;
        this.app = fireplan001wb.app;
        this.loc = fireplan001wb.loc;
        this.date = fireplan001wb.date;
        this.date1 = fireplan001wb.date1;
        this.insertUser = fireplan001wb.insertUser;
        this.insertDatetime = fireplan001wb.insertDatetime;
        this.updatedUser = fireplan001wb.updatedUser;
        this.updatedDatetime = fireplan001wb.updatedDatetime;

    }
}