import { ToolsStatusDTO } from "src/dto/toolsstatusdto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Toolsmaster001mb } from "./Toolsmaster001mb";


@Entity("toolsstatus001mb", { schema: "trims" })
export class Toolsstatus001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "code_group" })
  codeGroup: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("char", { name: "status", length: 100 })
  status: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(
    () => Toolsmaster001mb,
    (toolsmaster001mb) => toolsmaster001mb.tsslno2
  )
  toolsmaster001mbs: Toolsmaster001mb[];
  toolsspares001mbs: any;
  toolsbreakdown001mbs: any;
  toolschecklist001mbs: any;
  toolsrootcause001mbs: any;
  toolspreventiveaction001mbs: any;



  setProperties(toolsStatusDTO: ToolsStatusDTO) {
    this.slNo = toolsStatusDTO.slNo;
    this.unitslno = toolsStatusDTO.unitslno;
    this.codeGroup = toolsStatusDTO.codeGroup;
    this.name = toolsStatusDTO.name;
    this.status = toolsStatusDTO.status;
    this.insertUser = toolsStatusDTO.insertUser;
    this.insertDatetime = toolsStatusDTO.insertDatetime;
    this.updatedUser = toolsStatusDTO.updatedUser;
    this.updatedDatetime = toolsStatusDTO.updatedDatetime;
}
}