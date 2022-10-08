import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fixture001mb } from "./Fixture001mb";
import { Fixturestatus001mb } from "./Fixturestatus001mb";
import { Fixturedailychecklist001wb } from "./Fixturedailychecklist001wb";
import { Fixturepreventivechecklist001wb } from "./Fixturepreventivechecklist001wb";
import { FixtureChecklistDTO } from "src/dto/FixtureChecklist.dto";

@Index("fcslno", ["fcslno"], {})
@Index("fstatus", ["fstatus"], {})
@Entity("fixturechecklist001mb", { schema: "trims" })
export class Fixturechecklist001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "fcslno" })
  fcslno: number;

  @Column("int", { name: "fstatus" })
  fstatus: number;

  @Column("varchar", { name: "fcheckpoints", length: 250 })
  fcheckpoints: string;

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
    (fixture001mb) => fixture001mb.fixturechecklist001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "fcslno", referencedColumnName: "slNo" }])
  fcslno2: Fixture001mb;

  @ManyToOne(
    () => Fixturestatus001mb,
    (fixturestatus001mb) => fixturestatus001mb.fixturechecklist001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "fstatus", referencedColumnName: "slNo" }])
  fstatus2: Fixturestatus001mb;

  @OneToMany(
    () => Fixturedailychecklist001wb,
    (fixturedailychecklist001wb) => fixturedailychecklist001wb.cpslno2
  )
  fixturedailychecklist001wbs: Fixturedailychecklist001wb[];

  // @OneToMany(
  //   () => Fixturepreventivechecklist001wb,
  //   (fixturepreventivechecklist001wb) => fixturepreventivechecklist001wb.cpslno2
  // )
  // fixturepreventivechecklist001wbs: Fixturepreventivechecklist001wb[];

  
  setProperties(fixturechecklistDTO: FixtureChecklistDTO) {
    this.slNo = fixturechecklistDTO.slNo;
    this.unitslno = fixturechecklistDTO.unitslno;
    this.fcslno = fixturechecklistDTO.fcslno;
    this.fstatus = fixturechecklistDTO.fstatus;
    this.fcheckpoints = fixturechecklistDTO.fcheckpoints;
    this.insertUser = fixturechecklistDTO.insertUser;
    this.insertDatetime = fixturechecklistDTO.insertDatetime;
    this.updatedUser = fixturechecklistDTO.updatedUser;
    this.updatedDatetime = fixturechecklistDTO.updatedDatetime;
  }
}
