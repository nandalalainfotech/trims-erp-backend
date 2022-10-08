import { Fixturepreventiveaction001mb } from "src/entity/Fixturepreventiveaction001mb";
import { Preventiveaction001mb } from "src/entity/Preventiveaction001mb";

export class FixturePreventiveactionDTO {
    slNo: number;
    unitslno: number;
    sslno: number;
    rcslno: number;
    name: string;
    details: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(fixturepreventiveaction001mb: Fixturepreventiveaction001mb) {
        this.slNo = fixturepreventiveaction001mb.slNo;
        this.unitslno = fixturepreventiveaction001mb.unitslno;
        this.sslno = fixturepreventiveaction001mb.sslno;
        this.rcslno = fixturepreventiveaction001mb.rcslno
        this.name = fixturepreventiveaction001mb.name;
        this.details = fixturepreventiveaction001mb.details;
        this.insertUser = fixturepreventiveaction001mb.insertUser;
        this.insertDatetime = fixturepreventiveaction001mb.insertDatetime;
        this.updatedUser = fixturepreventiveaction001mb.updatedUser;
        this.updatedDatetime = fixturepreventiveaction001mb.updatedDatetime;
    }
}