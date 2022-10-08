import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Machine001mb } from "./Machine001mb";
import { Spares001mb } from "./Spares001mb";
import { Breakdown001mb } from "./Breakdown001mb";
import { Rootcause001mb } from "./Rootcause001mb";
import { Preventiveaction001mb } from "./Preventiveaction001mb";
import { BreakDownRegDTO } from "src/dto/breakdownRegwb.dto";

@Index("mslno", ["mslno"], {})
@Index("sslno", ["sslno"], {})
@Index("bdsl", ["bdsl"], {})
@Index("rcsl", ["rcsl"], {})
@Index("pasl", ["pasl"], {})
@Entity("breakdownreg001wb", { schema: "trims" })
export class Breakdownreg001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "mslno" })
  mslno: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column({ name: "date", type:"date" })
  date: Date;

  @Column("int", { name: "bdsl" })
  bdsl: number;

  @Column("int", { name: "rcsl" })
  rcsl: number;

  @Column("int", { name: "pasl" })
  pasl: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("int", { name: "spareCost" })
  spareCost: number;

  @Column("int", { name: "sparesQty" })
  sparesQty: number;

  @Column("varchar", { name: "attendby", length: 50 })
  attendby: string;

  @Column("varchar", { name: "remarks", length: 100 })
  remarks: string;

  @Column("varchar", { name: "startTime", nullable: true, length: 50 })
  startTime: string | null;

  @Column("varchar", { name: "endTime", nullable: true, length: 50 })
  endTime: string | null;

  @Column("varchar", { name: "filename", length: 50 })
  filename: string;

  @Column("varchar", { name: "filepath", length: 50 })
  filepath: string;

  @Column("varchar", { name: "originalfilename", length: 50 })
  originalfilename: string;

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
    (machine001mb) => machine001mb.breakdownreg001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "mslno", referencedColumnName: "slNo" }])
  mslno2: Machine001mb;

  @ManyToOne(
    () => Spares001mb,
    (spares001mb) => spares001mb.breakdownreg001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Spares001mb;

  @ManyToOne(
    () => Breakdown001mb,
    (breakdown001mb) => breakdown001mb.breakdownreg001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "bdsl", referencedColumnName: "slNo" }])
  bdsl2: Breakdown001mb;

  @ManyToOne(
    () => Rootcause001mb,
    (rootcause001mb) => rootcause001mb.breakdownreg001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "rcsl", referencedColumnName: "slNo" }])
  rcsl2: Rootcause001mb;

  @ManyToOne(
    () => Preventiveaction001mb,
    (preventiveaction001mb) => preventiveaction001mb.breakdownreg001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "pasl", referencedColumnName: "slNo" }])
  pasl2: Preventiveaction001mb;


  setProperties(breakDownRegDTO: BreakDownRegDTO) {
    this.slNo = breakDownRegDTO.slNo;
    this.unitslno = breakDownRegDTO.unitslno;
    this.mslno = breakDownRegDTO.mslno;
    this.date = new Date(breakDownRegDTO.date);
    this.bdsl = breakDownRegDTO.bdsl;
    this.rcsl = breakDownRegDTO.rcsl;
    this.pasl = breakDownRegDTO.pasl;
    this.filename = breakDownRegDTO.filename;
    this.filepath = breakDownRegDTO.filepath;
    this.originalfilename = breakDownRegDTO.originalfilename;
    this.startTime = breakDownRegDTO.startTime;
    this.endTime = breakDownRegDTO.endTime;
    this.sslno = breakDownRegDTO.sslno;
    this.spareCost = breakDownRegDTO.spareCost;
    this.sparesQty = breakDownRegDTO.sparesQty;
    this.attendby = breakDownRegDTO.attendby;
    this.remarks = breakDownRegDTO.remarks;
    this.insertUser = breakDownRegDTO.insertUser;
    this.insertDatetime = breakDownRegDTO.insertDatetime;
    this.updatedUser = breakDownRegDTO.updatedUser;
    this.updatedDatetime = breakDownRegDTO.updatedDatetime;
}
}
