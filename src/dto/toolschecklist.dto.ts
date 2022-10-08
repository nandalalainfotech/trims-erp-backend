import { Checklist001mb } from "src/entity/Checklist001mb";
import { Fixturechecklist001mb } from "src/entity/Fixturechecklist001mb";
import { Toolschecklist001mb } from "src/entity/Toolschecklist001mb";

export class ToolsChecklistDTO {
  slNo: number;
  unitslno: number;
  tcslno: number;
  tstatus: number;
  tcheckpoints: string;
  insertUser: string;
  insertDatetime: Date;
  updatedUser: string | null;
  updatedDatetime: Date | null;


  setProperties(toolschecklist001mb: Toolschecklist001mb) {
    this.slNo = toolschecklist001mb.slNo;
    this.unitslno = toolschecklist001mb.unitslno;
    this.tcslno = toolschecklist001mb.tcslno;
    this.tstatus = toolschecklist001mb.tstatus;
    this.tcheckpoints = toolschecklist001mb.tcheckpoints;
    this.insertUser = toolschecklist001mb.insertUser;
    this.insertDatetime = toolschecklist001mb.insertDatetime;
    this.updatedUser = toolschecklist001mb.updatedUser;
    this.updatedDatetime = toolschecklist001mb.updatedDatetime;
  }
}