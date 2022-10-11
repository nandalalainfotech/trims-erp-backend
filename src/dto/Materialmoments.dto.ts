import { Materialmoments001wb } from "src/entity/Materialmoments001wb";


export class MaterialmomentsDTO {
    slNo: number;
    unitslno: number;
    itemslno: number;
    childslno: number;
    prtslno: number;
    consumslno: number;
    date: Date;
    cudate: Date;
    cptdate: Date;
    prtdate: Date;
    qunty: number;
    cuqunty: number;
    cptqunty: number;
    prtqunty: number;
    department: string;
    cudepartment: string;
    prtdepartment: string;
    cptdepartment: string; 
    time: string;
    cutime: string;
    cpttime: string;
    prttime: string;
    shift: string;
    cushift: string;
    cptshift: string;
    prtshift: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;


    setProperties(materialmoments001wb: Materialmoments001wb) {
        this.slNo = materialmoments001wb.slNo;
        this.unitslno = materialmoments001wb.unitslno;

        this.itemslno = materialmoments001wb.itemslno;
        this.childslno = materialmoments001wb.childslno;
        this.prtslno = materialmoments001wb.prtslno;
        this.consumslno = materialmoments001wb.consumslno;
        this.date = new Date( materialmoments001wb.date);
        this.cudate = new Date( materialmoments001wb.cudate);
        this.cptdate = new Date( materialmoments001wb.cptdate);
        this.prtdate = new Date( materialmoments001wb.prtdate);
        this.qunty = materialmoments001wb.qunty;
        this.cuqunty = materialmoments001wb.cuqunty;
        this.cptqunty = materialmoments001wb.cptqunty;
        this.prtqunty = materialmoments001wb.prtqunty;
        this.department = materialmoments001wb.department;
        this.cudepartment = materialmoments001wb.cudepartment;
        this.cptdepartment = materialmoments001wb.cptdepartment;
        this.prtdepartment = materialmoments001wb.prtdepartment;
        this.time = materialmoments001wb.time;
        this.cutime = materialmoments001wb.cutime;
        this.cpttime = materialmoments001wb.cpttime;
        this.prttime = materialmoments001wb.prttime;
        this.shift = materialmoments001wb.shift;
        this.cushift = materialmoments001wb.cushift;
        this.cptshift = materialmoments001wb.cptshift;
        this.prtshift = materialmoments001wb.prtshift;
        this.insertUser = materialmoments001wb.insertUser;
        this.insertDatetime = materialmoments001wb.insertDatetime;
        this.updatedUser = materialmoments001wb.updatedUser;
        this.updatedDatetime = materialmoments001wb.updatedDatetime;
    }
}