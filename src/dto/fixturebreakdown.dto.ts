import { Breakdown001mb } from "src/entity/Breakdown001mb";
import { Fixturebreakdown001mb } from "src/entity/Fixturebreakdown001mb";

export class FixtureBreakdownDTO {
    slNo: number;
    unitslno: number;
    sslno: number;
    fbname: string;
    fbdetails: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(fixturebreakdown001mb: Fixturebreakdown001mb) {
        this.slNo = fixturebreakdown001mb.slNo;
        this.unitslno = fixturebreakdown001mb.unitslno;
        this.sslno = fixturebreakdown001mb.sslno;
        this.fbname = fixturebreakdown001mb.fbname;
        this.fbdetails = fixturebreakdown001mb.fbdetails;
        this.insertUser = fixturebreakdown001mb.insertUser;
        this.insertDatetime = fixturebreakdown001mb.insertDatetime;
        this.updatedUser = fixturebreakdown001mb.updatedUser;
        this.updatedDatetime = fixturebreakdown001mb.updatedDatetime;
    }
}