import { FixturePreventivePlanDTO } from "src/dto/fixturepreventiveplan.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fixture001mb } from "./Fixture001mb";

@Index("mslno", ["mslno"], {})
@Entity("fixturepreventiveplan001wb", { schema: "trims" })
export class Fixturepreventiveplan001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "mslno" })
  mslno: number;

  @Column("char", { name: "status", length: 1 })
  status: string;

  @Column("datetime", { name: "date" })
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
    () => Fixture001mb,
    (fixture001mb) => fixture001mb.fixturepreventiveplan001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "mslno", referencedColumnName: "slNo" }])
  mslno2: Fixture001mb;


  setProperties(fixturepreventivePlanDTO: FixturePreventivePlanDTO) {
    this.slNo = fixturepreventivePlanDTO.slNo;
    this.unitslno = fixturepreventivePlanDTO.unitslno;
    this.mslno = fixturepreventivePlanDTO.mslno;
    this.status = fixturepreventivePlanDTO.status;
    this.date =new Date( fixturepreventivePlanDTO.date);
    this.insertUser = fixturepreventivePlanDTO.insertUser;
    this.insertDatetime = fixturepreventivePlanDTO.insertDatetime;
    this.updatedUser = fixturepreventivePlanDTO.updatedUser;
    this.updatedDatetime = fixturepreventivePlanDTO.updatedDatetime;
  }
}
