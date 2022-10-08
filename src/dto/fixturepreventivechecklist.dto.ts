import { Fixturepreventivechecklist001wb } from "src/entity/Fixturepreventivechecklist001wb";
import { Preventivechecklist001wb } from "src/entity/Preventivechecklist001wb";

export class FixturePreventiveChecklistDTO {
    slNo: number;
    unitslno: number;
    mslno: number;
    cpslno: number;
    checkpointdate: Date;
    observation: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    setProperties(fixturepreventivechecklist001wb: Fixturepreventivechecklist001wb) {
        this.slNo = fixturepreventivechecklist001wb.slNo;
        this.unitslno = fixturepreventivechecklist001wb.unitslno;
        this.mslno = fixturepreventivechecklist001wb.mslno;
        this.cpslno = fixturepreventivechecklist001wb.cpslno;
        this.checkpointdate = fixturepreventivechecklist001wb.checkpointdate;
        this.observation = fixturepreventivechecklist001wb.observation;
        this.insertUser = fixturepreventivechecklist001wb.insertUser;
        this.insertDatetime = fixturepreventivechecklist001wb.insertDatetime;
        this.updatedUser = fixturepreventivechecklist001wb.updatedUser;
        this.updatedDatetime = fixturepreventivechecklist001wb.updatedDatetime;
    }
}