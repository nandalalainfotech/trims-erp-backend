import { ToolsSparesDTO } from "src/dto/toolsspare.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Toolsmaster001mb } from "./Toolsmaster001mb";
import { Toolsstatus001mb } from "./Toolsstatus001mb";

@Index("msslno", ["msslno"], {})
@Index("tsslno", ["tsslno"], {})
@Entity("toolsspares001mb", { schema: "trims" })
export class Toolsspares001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "msslno" })
  msslno: number;

  @Column("int", { name: "tsslno" })
  tsslno: number;

  @Column("varchar", { name: "tspares", length: 50 })
  tspares: string;

  @Column("int", { name: "tsparescost", nullable: true })
  tsparescost: number | null;

  @Column("varchar", { name: "tspecification", length: 50 })
  tspecification: string;

  @Column("datetime", { name: "tleadtime", nullable: true })
  tleadtime: Date | null;

  @Column("int", {
    name: "tminimumstocklevel",
    nullable: true,
    default: () => "'0'",
  })
  tminimumstocklevel: number | null;

  @Column("int", {
    name: "treorderlevel",
    nullable: true,
    default: () => "'0'",
  })
  treorderlevel: number | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Toolsmaster001mb,
    (toolsmaster001mb) => toolsmaster001mb.toolsspares001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "msslno", referencedColumnName: "slNo" }])
  msslno2: Toolsmaster001mb;

  @ManyToOne(
    () => Toolsstatus001mb,
    (toolsstatus001mb) => toolsstatus001mb.toolsspares001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "tsslno", referencedColumnName: "slNo" }])
  tsslno2: Toolsstatus001mb;

  setProperties(toolssparesDTO: ToolsSparesDTO) {
    this.slNo = toolssparesDTO.slNo;
    this.unitslno = toolssparesDTO.unitslno;
    this.msslno = toolssparesDTO.msslno;
    this.tsslno = toolssparesDTO.tsslno;
    this.tspares = toolssparesDTO.tspares;
    this.tsparescost = toolssparesDTO.tsparescost;
    this.tspecification = toolssparesDTO.tspecification;
    this.tleadtime = new Date(toolssparesDTO.tleadtime);
    this.tminimumstocklevel = toolssparesDTO.tminimumstocklevel;
    this.treorderlevel = toolssparesDTO.treorderlevel;
    this.insertUser = toolssparesDTO.insertUser;
    this.insertDatetime = toolssparesDTO.insertDatetime;
    this.updatedUser = toolssparesDTO.updatedUser;
    this.updatedDatetime = toolssparesDTO.updatedDatetime;
  }
}
