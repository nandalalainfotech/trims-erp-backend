import { FixturePreventiveChecklistDTO } from "src/dto/fixturepreventivechecklist.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fixture001mb } from "./Fixture001mb";
import { Fixturechecklist001mb } from "./Fixturechecklist001mb";

@Index("mslno", ["mslno"], {})
@Index("cpslno", ["cpslno"], {})
@Entity("fixturepreventivechecklist001wb", { schema: "trims" })
export class Fixturepreventivechecklist001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "mslno" })
  mslno: number;

  @Column("int", { name: "cpslno" })
  cpslno: number;

  @Column("datetime", { name: "checkpointdate" })
  checkpointdate: Date;

  @Column("varchar", { name: "observation", length: 250 })
  observation: string;

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
    (fixture001mb) => fixture001mb.fixturepreventivechecklist001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "mslno", referencedColumnName: "slNo" }])
  mslno2: Fixture001mb;

  // @ManyToOne(
  //   () => Fixturechecklist001mb,
  //   (fixturechecklist001mb) =>
  //     fixturechecklist001mb.fixturepreventivechecklist001wbs,
  //   { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  // )
  // @JoinColumn([{ name: "cpslno", referencedColumnName: "slNo" }])
  // cpslno2: Fixturechecklist001mb;

  setProperties(fixturepreventiveChecklistDTO: FixturePreventiveChecklistDTO) {
    this.slNo = fixturepreventiveChecklistDTO.slNo;
    this.unitslno = fixturepreventiveChecklistDTO.unitslno;
    this.mslno = fixturepreventiveChecklistDTO.mslno;
    this.cpslno = fixturepreventiveChecklistDTO.cpslno;
    this.checkpointdate = new Date(fixturepreventiveChecklistDTO.checkpointdate);
    this.observation = fixturepreventiveChecklistDTO.observation;
    this.insertUser = fixturepreventiveChecklistDTO.insertUser;
    this.insertDatetime = fixturepreventiveChecklistDTO.insertDatetime;
    this.updatedUser = fixturepreventiveChecklistDTO.updatedUser;
    this.updatedDatetime = fixturepreventiveChecklistDTO.updatedDatetime;
}
}
