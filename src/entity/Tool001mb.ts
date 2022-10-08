import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";


import { ToolDTO } from "src/dto/Tool.dto";

@Entity("tool001mb", { schema: "trims" })
export class Tool001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "pdno" })
  pdno: number;

  @Column("varchar", { name: "Fix1", length: 500 })
  fix1: string;

  @Column("varchar", { name: "Fix2", length: 500 })
  fix2: string;

  @Column("varchar", { name: "Fix3", length: 500 })
  fix3: string;

  @Column("varchar", { name: "Fix4", length: 500 })
  fix4: string;

  @Column("varchar", { name: "Fix5", length: 500 })
  fix5: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;


  setProperties(toolDTO: ToolDTO) {
    this.unitslno = toolDTO.unitslno;
    this.slNo = toolDTO.slNo;
    this.pdno = toolDTO.pdno;
    this.fix1 = toolDTO.fix1;
    this.fix2 = toolDTO.fix2;
    this.fix3 = toolDTO.fix3;
    this.fix4 = toolDTO.fix4;
    this.fix5 = toolDTO.fix5;
    this.insertUser = toolDTO.insertUser;
    this.insertDatetime = toolDTO.insertDatetime;
    this.updatedUser = toolDTO.updatedUser;
    this.updatedDatetime = toolDTO.updatedDatetime;
}

}

