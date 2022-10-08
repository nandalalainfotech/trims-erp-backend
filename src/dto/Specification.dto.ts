import { Specification001wb } from "src/entity/Specification001wb";

export class SpecificationDTO {
    slNo: number;
    unitslno: number;
    parameter: string;
    specification: string;
    inspecmethod: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
  
  
    setProperties(specification001wb: Specification001wb) {
      this.slNo = specification001wb.slNo;
      this.unitslno = specification001wb.unitslno;
      this.parameter = specification001wb.parameter;
      this.specification = specification001wb.specification;
      this.inspecmethod = specification001wb.inspecmethod;
      this.insertUser = specification001wb.insertUser;
      this.insertDatetime = specification001wb.insertDatetime;
      this.updatedUser = specification001wb.updatedUser;
      this.updatedDatetime = specification001wb.updatedDatetime;
    }
  }