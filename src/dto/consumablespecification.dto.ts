import { Consumerspecification001wb } from "src/entity/Consumerspecification001wb";

export class ConsumerspecificationDTO {
    slNo: number;
    unitslno: number;
    consumslno: number | null;
    parameter: string;
    specification: string;
    inspecmethod: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
  
    setProperties(consumerspecification001wb: Consumerspecification001wb) {
      this.slNo = consumerspecification001wb.slNo;
      this.unitslno = consumerspecification001wb.unitslno;
      this.consumslno = consumerspecification001wb.consumslno;
      this.parameter = consumerspecification001wb.parameter;
      this.specification = consumerspecification001wb.specification;
      this.inspecmethod = consumerspecification001wb.inspecmethod;
      this.insertUser = consumerspecification001wb.insertUser;
      this.insertDatetime = consumerspecification001wb.insertDatetime;
      this.updatedUser = consumerspecification001wb.updatedUser;
      this.updatedDatetime = consumerspecification001wb.updatedDatetime;
    }
}