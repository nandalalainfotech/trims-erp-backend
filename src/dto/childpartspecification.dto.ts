import { Childpartspecification001wb } from "src/entity/Childpartspecification001wb";

export class ChildpartspecificationDTO {
    slNo: number;
    unitslno: number;
    cprtslno: number | null;
    parameter: string;
    specification: string;
    inspecmethod: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
  
  
    setProperties(childpartspecification001wb: Childpartspecification001wb) {
      this.slNo = childpartspecification001wb.slNo;
      this.unitslno = childpartspecification001wb.unitslno;
       this. cprtslno = childpartspecification001wb. cprtslno;
      this.parameter = childpartspecification001wb.parameter;
      this.specification = childpartspecification001wb.specification;
      this.inspecmethod = childpartspecification001wb.inspecmethod;
      this.insertUser = childpartspecification001wb.insertUser;
      this.insertDatetime = childpartspecification001wb.insertDatetime;
      this.updatedUser = childpartspecification001wb.updatedUser;
      this.updatedDatetime = childpartspecification001wb.updatedDatetime;
    }
}