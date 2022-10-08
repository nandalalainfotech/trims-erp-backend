import { ToolsMasterDTO } from "src/dto/toolsmaster.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Toolsstatus001mb } from "./Toolsstatus001mb";

@Index("tsslno", ["tsslno"], {})
@Entity("toolsmaster001mb", { schema: "trims" })
export class Toolsmaster001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "tsslno" })
  tsslno: number;

  @Column("varchar", { name: "tcode", length: 50 })
  tcode: string;

  @Column("varchar", { name: "tname", length: 500 })
  tname: string;

  @Column("datetime", { name: "tyear" })
  tyear: Date;

  @Column("varchar", { name: "tcapacity", length: 100 })
  tcapacity: string;

  @Column("varchar", { name: "ttype", length: 100 })
  ttype: string;

  @Column("varchar", { name: "tmake", length: 100 })
  tmake: string;

  @Column("varchar", { name: "tlocation", length: 100 })
  tlocation: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Toolsstatus001mb,
    (toolsstatus001mb) => toolsstatus001mb.toolsmaster001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "tsslno", referencedColumnName: "slNo" }])
  tsslno2: Toolsstatus001mb;
  toolsspares001mbs: any;
  toolschecklist001mbs: any;
  
  setProperties(toolsMasterDTO: ToolsMasterDTO) {
    this.slNo = toolsMasterDTO.slNo;
    this.unitslno = toolsMasterDTO.unitslno;
    this.tsslno = toolsMasterDTO.tsslno;
    this.tcode = toolsMasterDTO.tcode;
    this.tname = toolsMasterDTO.tname;
    this.tyear = new Date(toolsMasterDTO.tyear);
    this.tcapacity = toolsMasterDTO.tcapacity;
    this.ttype = toolsMasterDTO.ttype;
    this.tmake = toolsMasterDTO.tmake;
    this.tlocation = toolsMasterDTO.tlocation;
    this.insertUser = toolsMasterDTO.insertUser;
    this.insertDatetime = toolsMasterDTO.insertDatetime;
    this.updatedUser = toolsMasterDTO.updatedUser;
    this.updatedDatetime = toolsMasterDTO.updatedDatetime;
  }
}

