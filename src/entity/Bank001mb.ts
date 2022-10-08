import { BankDTO } from "src/dto/bank.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Statutory001wb } from "./Statutory001wb";

@Entity("bank001mb", { schema: "trims" })
export class Bank001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "bankname", length: 100 })
  bankname: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(() => Statutory001wb, (statutory001wb) => statutory001wb.bslno2)
  statutory001wbs: Statutory001wb[];
  
  setProperties(bankDTO: BankDTO) {
    this.slNo = bankDTO.slNo;
    this.unitslno = bankDTO.unitslno;
    this.bankname = bankDTO.bankname;
    this.insertUser = bankDTO.insertUser;
    this.insertDatetime = bankDTO.insertDatetime;
    this.updatedUser = bankDTO.updatedUser;
    this.updatedDatetime = bankDTO.updatedDatetime;
  }
}
