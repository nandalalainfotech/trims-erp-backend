import { ToolsChecklistDTO } from "src/dto/toolschecklist.dto";
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

@Index("tcslno", ["tcslno"], {})
@Index("tstatus", ["tstatus"], {})
@Entity("toolschecklist001mb", { schema: "trims" })
export class Toolschecklist001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "tcslno" })
  tcslno: number;

  @Column("int", { name: "tstatus" })
  tstatus: number;

  @Column("varchar", { name: "tcheckpoints", length: 250 })
  tcheckpoints: string;

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
    (toolsmaster001mb) => toolsmaster001mb.toolschecklist001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "tcslno", referencedColumnName: "slNo" }])
  tcslno2: Toolsmaster001mb;

  @ManyToOne(
    () => Toolsstatus001mb,
    (toolsstatus001mb) => toolsstatus001mb.toolschecklist001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "tstatus", referencedColumnName: "slNo" }])
  
  tstatus2: Toolsstatus001mb;
  setProperties(toolsChecklistDTO: ToolsChecklistDTO) {
    this.slNo = toolsChecklistDTO.slNo;
    this.unitslno = toolsChecklistDTO.unitslno;
    this.tcslno = toolsChecklistDTO.tcslno;
    this.tstatus = toolsChecklistDTO.tstatus;
    this.tcheckpoints = toolsChecklistDTO.tcheckpoints;
    this.insertUser = toolsChecklistDTO.insertUser;
    this.insertDatetime = toolsChecklistDTO.insertDatetime;
    this.updatedUser = toolsChecklistDTO.updatedUser;
    this.updatedDatetime = toolsChecklistDTO.updatedDatetime;
  }
}