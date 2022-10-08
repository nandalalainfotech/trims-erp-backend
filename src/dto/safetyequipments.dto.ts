import { Rootcause001mb } from "src/entity/Rootcause001mb";
import { Safetyequwb001 } from "src/entity/Safetyequwb001";

export class SafetyEquipmentsDTO {
    slNo?: number;
    unitslno: number;
    seNo: string | any;
    pur: string = "";
    stock: string = "";
    remark: string="";
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;

    setProperties(safetyequwb001: Safetyequwb001) {
        this.slNo = safetyequwb001.slNo;
        this.unitslno = safetyequwb001.unitslno;
        this.seNo = safetyequwb001.seNo;
        this.pur = safetyequwb001.pur
        this.stock = safetyequwb001.stock;
        this.remark = safetyequwb001.remark;
        this.insertUser = safetyequwb001.insertUser;
        this.insertDatetime = safetyequwb001.insertDatetime;
        this.updatedUser = safetyequwb001.updatedUser;
        this.updatedDatetime = safetyequwb001.updatedDatetime;
    }
}