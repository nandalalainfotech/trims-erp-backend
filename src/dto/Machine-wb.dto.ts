import { Machine001wb } from "src/entity/Machine001wb";


export class MachineWBDTO {
  slNo: number;
  unitslno: number;
  mslno: number;
  status: string;
  date: Date;
  cpslno: number;
  checkpointdate: Date;
  observation: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;

  setProperties(machine001wb: Machine001wb) {
    this.slNo = machine001wb.slNo;
    this.unitslno = machine001wb.unitslno;
    this.mslno = machine001wb.mslno;
    this.status = machine001wb.status;
    this.date = machine001wb.date;
    this.cpslno = machine001wb.cpslno;
    this.checkpointdate = machine001wb.checkpointdate;
    this.observation = machine001wb.observation;
    this.insertUser = machine001wb.insertUser;
    this.insertDatetime = machine001wb.insertDatetime;
    this.updatedUser = machine001wb.updatedUser;
    this.updatedDatetime = machine001wb.updatedDatetime;
  }
}