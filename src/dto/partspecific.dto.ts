import { Partspecific001wb } from "src/entity/Partspecific001wb";

export class PartSpecificDTO {
    slNo: number;
    unitslno: number;
    partslno: number | null;
    parameter: string;
    specification: string;
    inspecmethod: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
  
  
    setProperties(partspecific001wb: Partspecific001wb) {
      this.slNo = partspecific001wb.slNo;
      this.unitslno = partspecific001wb.unitslno;
      this.partslno = partspecific001wb.partslno;
      this.parameter = partspecific001wb.parameter;
      this.specification = partspecific001wb.specification;
      this.inspecmethod = partspecific001wb.inspecmethod;
      this.insertUser = partspecific001wb.insertUser;
      this.insertDatetime = partspecific001wb.insertDatetime;
      this.updatedUser = partspecific001wb.updatedUser;
      this.updatedDatetime = partspecific001wb.updatedDatetime;
    }
}