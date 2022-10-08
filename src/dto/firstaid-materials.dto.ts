import { Firstaidwb001 } from "src/entity/Firstaidwb001";

export class FirstaidMaterialsDTO {
    slNo: number;
    unitslno: number;
    fabxno:number;
    mname: string = "";
    date: Date;
    app: string = "";
    loc: string="";
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(firstaidwb001 : Firstaidwb001 ) {
        
        this.slNo = firstaidwb001.slNo;
        this.unitslno = firstaidwb001.unitslno;
        this.fabxno = firstaidwb001.fabxno;
        this.mname = firstaidwb001.mname;
        this.date = firstaidwb001.date;
        this.app = firstaidwb001.app;
        this.loc = firstaidwb001.loc;
        this.insertUser = firstaidwb001.insertUser;
        this.insertDatetime = firstaidwb001.insertDatetime;
        this.updatedUser = firstaidwb001.updatedUser;
        this.updatedDatetime = firstaidwb001.updatedDatetime;
    }
}