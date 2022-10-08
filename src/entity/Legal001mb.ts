
import { LegalDTO } from "src/dto/legaldocuments.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Legal001wb } from "./Legal001wb";

@Entity("legal001mb", { schema: "trims" })
export class Legal001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "dname", length: 200 })
  dname: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;


  @OneToMany(() => Legal001wb, (legal001wb) => legal001wb.cslno2)
  legal001wbs: Legal001wb[];
  legal001hbs: any;
 
  setProperties(legalDTO: LegalDTO) {
    this.slNo = legalDTO.slNo;
    this.unitslno = legalDTO.unitslno;
    this.dname = legalDTO.dname;
    this.insertUser = legalDTO.insertUser;
    this.insertDatetime = legalDTO.insertDatetime;
    this.updatedUser = legalDTO.updatedUser;
    this.updatedDatetime = legalDTO.updatedDatetime;
  }
}
