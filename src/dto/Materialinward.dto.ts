import { Materialinward001wb } from "src/entity/Materialinward001wb";
import { Materialreceiveditem001wb } from "src/entity/Materialreceiveditem001wb";

export class MaterialinwardDTO {
    slNo: number;
    unitslno: number;
    purchseSlno: number;
    date: Date;
    dcNo: string;
    invoiceno: string;
    dcDate: Date;
    supliername: string;
    grn: string;
    vehicleno:string;
    drivername:string;
    driverno:string;
    remark:string;
    remarks: string | null;
    status: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;

    materialreceiveditem001wbs?: Materialreceiveditem001wb[];

    setProperties(materialinward001wb: Materialinward001wb) {
        this.slNo = materialinward001wb.slNo;
        this.unitslno = materialinward001wb.unitslno;
        this.purchseSlno = materialinward001wb.purchseSlno;
        this.date = materialinward001wb.date;
        this.dcNo = materialinward001wb.dcNo;
        this.invoiceno = materialinward001wb.invoiceno;
        this.dcDate = materialinward001wb.dcDate;
        this.supliername = materialinward001wb.supliername;
        this.grn = materialinward001wb.grn;
        this.vehicleno = materialinward001wb.vehicleno;
        this.drivername = materialinward001wb.drivername;
        this.driverno = materialinward001wb.driverno;
        this.remark = materialinward001wb.remark;

        this.remarks = materialinward001wb.remarks;
        this.status = materialinward001wb.status;
        this.insertUser = materialinward001wb.insertUser;
        this.insertDatetime = materialinward001wb.insertDatetime;
        this.updatedUser = materialinward001wb.updatedUser;
        this.updatedDatetime = materialinward001wb.updatedDatetime
    }
}