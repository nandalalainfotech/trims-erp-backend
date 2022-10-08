import { PreventivePlanDTO } from "src/dto/preventiveplan.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Machine001mb } from "./Machine001mb";

@Index("mslno", ["mslno"], {})
@Entity("preventiveplan001wb", { schema: "trims" })
export class Preventiveplan001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "mslno" })
  mslno: number;

  @Column("char", { name: "status", length: 1 })
  status: string;

  @Column({ name: "date", type:"date" })
  date: Date;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Machine001mb,
    (machine001mb) => machine001mb.preventiveplan001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "mslno", referencedColumnName: "slNo" }])
  mslno2: Machine001mb;

  setProperties(preventivePlanDTO: PreventivePlanDTO) {
    this.slNo = preventivePlanDTO.slNo;
    this.unitslno = preventivePlanDTO.unitslno;
    this.mslno = preventivePlanDTO.mslno;
    this.status = preventivePlanDTO.status;
    this.date =new Date( preventivePlanDTO.date);
    this.insertUser = preventivePlanDTO.insertUser;
    this.insertDatetime = preventivePlanDTO.insertDatetime;
    this.updatedUser = preventivePlanDTO.updatedUser;
    this.updatedDatetime = preventivePlanDTO.updatedDatetime;
  }
}
