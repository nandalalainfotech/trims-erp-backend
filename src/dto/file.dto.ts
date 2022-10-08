import { File001mb } from "src/entity/File001mb";

export class FileDTO {
    slNo: number;
    unitslno: number;
    ftype: string;
    status: string;
    insertUser: string;
    insertDatetime: Date;
    updatedUser: string | null;
    updatedDatetime: Date | null;
  
  setProperties(file001mb: File001mb) {
      this.slNo = file001mb.slNo;
      this.unitslno = file001mb.unitslno;
      this.ftype = file001mb.ftype;
      this.status = file001mb.status;
      this.insertUser = file001mb.insertUser;
      this.insertDatetime = file001mb.insertDatetime;
      this.updatedUser = file001mb.updatedUser;
      this.updatedDatetime = file001mb.updatedDatetime;
    }
  }