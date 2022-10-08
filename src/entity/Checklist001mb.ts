import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Machine001mb } from "./Machine001mb";
import { Status001mb } from "./Status001mb";
import { Dailychecklist001wb } from "./Dailychecklist001wb";
import { Machine001wb } from "./Machine001wb";
import { Preventivechecklist001wb } from "./Preventivechecklist001wb";
import { ChecklistDTO } from "src/dto/Checklist.dto";

@Index("mcslno", ["mcslno"], {})
@Index("sslno", ["sslno"], {})
@Entity("checklist001mb", { schema: "trims" })
export class Checklist001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "mcslno" })
  mcslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("varchar", { name: "checkpoints", length: 250 })
  checkpoints: string;

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
    (machine001mb) => machine001mb.checklist001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "mcslno", referencedColumnName: "slNo" }])
  mcslno2: Machine001mb;

  @ManyToOne(() => Status001mb, (status001mb) => status001mb.checklist001mbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Status001mb;

  @OneToMany(
    () => Dailychecklist001wb,
    (dailychecklist001wb) => dailychecklist001wb.cpslno2
  )
  dailychecklist001wbs: Dailychecklist001wb[];

  @OneToMany(() => Machine001wb, (machine001wb) => machine001wb.cpslno2)
  machine001wbs: Machine001wb[];

  @OneToMany(
    () => Preventivechecklist001wb,
    (preventivechecklist001wb) => preventivechecklist001wb.cpslno2
  )
  preventivechecklist001wbs: Preventivechecklist001wb[];


  setProperties(checklistDTO: ChecklistDTO) {
    this.slNo = checklistDTO.slNo;
    this.unitslno = checklistDTO.unitslno;
    this.mcslno = checklistDTO.mcslno;
    this.sslno = checklistDTO.sslno;
    this.checkpoints = checklistDTO.checkpoints;
    this.insertUser = checklistDTO.insertUser;
    this.insertDatetime = checklistDTO.insertDatetime;
    this.updatedUser = checklistDTO.updatedUser;
    this.updatedDatetime = checklistDTO.updatedDatetime;
  }
}
