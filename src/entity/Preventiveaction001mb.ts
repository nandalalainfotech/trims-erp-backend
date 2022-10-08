import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Breakdownreg001wb } from "./Breakdownreg001wb";
import { Status001mb } from "./Status001mb";
import { Rootcause001mb } from "./Rootcause001mb";
import { PreventiveactionDTO } from "src/dto/preventiveaction.dto";

@Index("sslno", ["sslno"], {})
@Index("rcslno", ["rcslno"], {})
@Entity("preventiveaction001mb", { schema: "trims" })
export class Preventiveaction001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("int", { name: "rcslno" })
  rcslno: number;

  @Column("varchar", { name: "name", length: 250 })
  name: string;

  @Column("varchar", { name: "details", length: 250 })
  details: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(
    () => Breakdownreg001wb,
    (breakdownreg001wb) => breakdownreg001wb.pasl2
  )
  breakdownreg001wbs: Breakdownreg001wb[];

  @ManyToOne(
    () => Status001mb,
    (status001mb) => status001mb.preventiveaction001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Status001mb;

  @ManyToOne(
    () => Rootcause001mb,
    (rootcause001mb) => rootcause001mb.preventiveaction001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "rcslno", referencedColumnName: "slNo" }])
  rcslno2: Rootcause001mb;


  setProperties(preventiveactionDTO: PreventiveactionDTO) {
    this.slNo = preventiveactionDTO.slNo;
    this.unitslno = preventiveactionDTO.unitslno;
    this.sslno = preventiveactionDTO.sslno;
    this.rcslno = preventiveactionDTO.rcslno
    this.name = preventiveactionDTO.name;
    this.details = preventiveactionDTO.details;
    this.insertUser = preventiveactionDTO.insertUser;
    this.insertDatetime = preventiveactionDTO.insertDatetime;
    this.updatedUser = preventiveactionDTO.updatedUser;
    this.updatedDatetime = preventiveactionDTO.updatedDatetime;
}
}
