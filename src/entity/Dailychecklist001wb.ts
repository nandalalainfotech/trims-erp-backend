import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Machine001mb } from "./Machine001mb";
import { Checklist001mb } from "./Checklist001mb";
import { DailyChecklistDTO } from "src/dto/DailyChecklist.dto";

@Index("mslno", ["mslno"], {})
@Index("cpslno", ["cpslno"], {})
@Entity("dailychecklist001wb", { schema: "trims" })
export class Dailychecklist001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "mslno" })
  mslno: number;

  @Column("int", { name: "cpslno" })
  cpslno: number;

  @Column({ name: "date", type:"date" })
  date: Date;

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
    (machine001mb) => machine001mb.dailychecklist001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "mslno", referencedColumnName: "slNo" }])
  mslno2: Machine001mb;

  @ManyToOne(
    () => Checklist001mb,
    (checklist001mb) => checklist001mb.dailychecklist001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "cpslno", referencedColumnName: "slNo" }])
  cpslno2: Checklist001mb;

  setProperties(dailyChecklistDTO: DailyChecklistDTO) {
    this.slNo = dailyChecklistDTO.slNo;
    this.unitslno = dailyChecklistDTO.unitslno;
    this.mslno = dailyChecklistDTO.mslno;
    this.cpslno = dailyChecklistDTO.cpslno;
    this.date = new Date(dailyChecklistDTO.date);
    this.insertUser = dailyChecklistDTO.insertUser;
    this.insertDatetime = dailyChecklistDTO.insertDatetime;
    this.updatedUser = dailyChecklistDTO.updatedUser;
    this.updatedDatetime = dailyChecklistDTO.updatedDatetime;
}
}
