import { ToolsPreventiveactionDTO } from "src/dto/toolspreventiveaction.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Toolsrootcause001mb } from "./Toolsrootcause001mb";
import { Toolsstatus001mb } from "./Toolsstatus001mb";

@Index("sslno", ["sslno"], {})
@Entity("toolspreventiveaction001mb", { schema: "trims" })
export class Toolspreventiveaction001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("int", { name: "trcslno" })
  trcslno: number;

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
    (toolsstatus001mb) => toolsstatus001mb.toolspreventiveaction001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Toolsstatus001mb;

  @ManyToOne(
    () => Toolsrootcause001mb,
    (toolsrootcause001mb) =>
    toolsrootcause001mb.fixturepreventiveaction001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "trcslno", referencedColumnName: "slNo" }])
  trcslno2: Toolsrootcause001mb;

  setProperties(toolsPreventiveactionDTO: ToolsPreventiveactionDTO) {
    this.slNo = toolsPreventiveactionDTO.slNo;
    this.unitslno = toolsPreventiveactionDTO.unitslno;
    this.sslno = toolsPreventiveactionDTO.sslno;
    this.trcslno = toolsPreventiveactionDTO.trcslno
    this.tname = toolsPreventiveactionDTO.tname;
    this.tdetails = toolsPreventiveactionDTO.tdetails;
    this.insertUser = toolsPreventiveactionDTO.insertUser;
    this.insertDatetime = toolsPreventiveactionDTO.insertDatetime;
    this.updatedUser = toolsPreventiveactionDTO.updatedUser;
    this.updatedDatetime = toolsPreventiveactionDTO.updatedDatetime;
}
}
