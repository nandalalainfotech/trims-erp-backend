import { ToolsBreakdownDTO } from "src/dto/toolsbreakdown.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Toolsstatus001mb } from "./Toolsstatus001mb";

@Index("sslno", ["sslno"], {})
@Entity(" toolsbreakdown001mb", { schema: "trims" })
export class Toolsbreakdown001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("varchar", { name: "tbname", length: 250 })
  tbname: string;

  @Column("varchar", { name: "tbdetails", length: 250 })
  tbdetails: string;

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
    (toolsstatus001mb) => toolsstatus001mb.toolsbreakdown001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Toolsstatus001mb;
  fixturerootcause001mbs: any;


  setProperties(toolsBreakdownDTO: ToolsBreakdownDTO) {
    this.slNo = toolsBreakdownDTO.slNo;
    this.unitslno = toolsBreakdownDTO.unitslno;
    this.sslno = toolsBreakdownDTO.sslno;
    this.tbname = toolsBreakdownDTO.tbname;
    this.tbdetails = toolsBreakdownDTO.tbdetails;
    this.insertUser = toolsBreakdownDTO.insertUser;
    this.insertDatetime = toolsBreakdownDTO.insertDatetime;
    this.updatedUser = toolsBreakdownDTO.updatedUser;
    this.updatedDatetime = toolsBreakdownDTO.updatedDatetime;
  }
}
