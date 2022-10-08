import { Bank001mb } from "src/entity/Bank001mb";

export class BankDTO {
    slNo: number;
    unitslno: number;
    bankname: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
  
  
    setProperties(bank001mb: Bank001mb) {
      this.slNo = bank001mb.slNo;
      this.unitslno = bank001mb.unitslno;
      this.bankname = bank001mb.bankname;
      this.insertUser = bank001mb.insertUser;
      this.insertDatetime = bank001mb.insertDatetime;
      this.updatedUser = bank001mb.updatedUser;
      this.updatedDatetime = bank001mb.updatedDatetime;
    }
  }