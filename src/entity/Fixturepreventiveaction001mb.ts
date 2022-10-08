import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fixturestatus001mb } from "./Fixturestatus001mb";
import { Fixturerootcause001mb } from "./Fixturerootcause001mb";
import { FixturePreventiveactionDTO } from "src/dto/fixturepreventiveaction.dto";

@Index("sslno", ["sslno"], {})
@Index("rcslno", ["rcslno"], {})
@Entity("fixturepreventiveaction001mb", { schema: "trims" })
export class Fixturepreventiveaction001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("int", { name: "rcslno" })
  rcslno: number;

  @Column("varchar", { name: "name", length: 250 })
  name: string;

  @Column("varchar", { name: "details", length: 250 })
  details: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Fixturestatus001mb,
    (fixturestatus001mb) => fixturestatus001mb.fixturepreventiveaction001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Fixturestatus001mb;

  @ManyToOne(
    () => Fixturerootcause001mb,
    (fixturerootcause001mb) =>
      fixturerootcause001mb.fixturepreventiveaction001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "rcslno", referencedColumnName: "slNo" }])
  rcslno2: Fixturerootcause001mb;
  setProperties(fixturepreventiveactionDTO: FixturePreventiveactionDTO) {
    this.slNo = fixturepreventiveactionDTO.slNo;
    this.unitslno = fixturepreventiveactionDTO.unitslno;
    this.sslno = fixturepreventiveactionDTO.sslno;
    this.rcslno = fixturepreventiveactionDTO.rcslno
    this.name = fixturepreventiveactionDTO.name;
    this.details = fixturepreventiveactionDTO.details;
    this.insertUser = fixturepreventiveactionDTO.insertUser;
    this.insertDatetime = fixturepreventiveactionDTO.insertDatetime;
    this.updatedUser = fixturepreventiveactionDTO.updatedUser;
    this.updatedDatetime = fixturepreventiveactionDTO.updatedDatetime;
}
}