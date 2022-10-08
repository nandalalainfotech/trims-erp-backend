import { FileDTO } from "src/dto/file.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Legal001wb } from "./Legal001wb";

@Entity("file001mb", { schema: "trims" })
export class File001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "ftype", length: 500 })
  ftype: string;

  @Column("varchar", { name: "status", length: 500 })
  status: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(() => Legal001wb, (legal001wb) => legal001wb.fslno2)
  legal001wbs: Legal001wb[];
    legal001hbs: any;

  setProperties(fileDTO: FileDTO) {
    this.slNo = fileDTO.slNo;
    this.unitslno = fileDTO.unitslno;
    this.ftype = fileDTO.ftype;
    this.status = fileDTO.status;
    this.insertUser = fileDTO.insertUser;
    this.insertDatetime = fileDTO.insertDatetime;
    this.updatedUser = fileDTO.updatedUser;
    this.updatedDatetime = fileDTO.updatedDatetime;
  }
}
