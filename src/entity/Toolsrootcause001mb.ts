import { ToolsRootcauseDTO } from "src/dto/toolsrootcause.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Toolsbreakdown001mb } from "./Toolsbreakdown001mb";
import { Toolsstatus001mb } from "./Toolsstatus001mb";

@Index("sslno", ["sslno"], {})
@Entity("toolsrootcause001mb", { schema: "trims" })
export class Toolsrootcause001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("int", { name: "tbrslno" })
  tbrslno: number;

  @Column("varchar", { name: "tname", length: 250 })
  tname: string;

  @Column("varchar", { name: "tdetails", length: 250 })
  tdetails: string;

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
    (toolsstatus001mb) => toolsstatus001mb.toolsrootcause001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Toolsstatus001mb;
  @ManyToOne(
    () => Toolsbreakdown001mb,
    (toolsbreakdown001mb) => toolsbreakdown001mb.fixturerootcause001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "tbrslno", referencedColumnName: "slNo" }])
  tbrslno2: Toolsbreakdown001mb;
  fixturepreventiveaction001mbs: any;

  setProperties(toolsrootcauseDTO: ToolsRootcauseDTO) {
    this.slNo = toolsrootcauseDTO.slNo;
    this.unitslno = toolsrootcauseDTO.unitslno;
    this.sslno = toolsrootcauseDTO.sslno;
    this.tbrslno = toolsrootcauseDTO.tbrslno
    this.tname = toolsrootcauseDTO.tname;
    this.tdetails = toolsrootcauseDTO.tdetails;
    this.insertUser = toolsrootcauseDTO.insertUser;
    this.insertDatetime = toolsrootcauseDTO.insertDatetime;
    this.updatedUser = toolsrootcauseDTO.updatedUser;
    this.updatedDatetime = toolsrootcauseDTO.updatedDatetime;
}
}
