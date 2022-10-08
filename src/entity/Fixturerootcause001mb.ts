import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fixturepreventiveaction001mb } from "./Fixturepreventiveaction001mb";
import { Fixturestatus001mb } from "./Fixturestatus001mb";
import { Breakdown001mb } from "./Breakdown001mb";
import { FixtureRootcauseDTO } from "src/dto/fixturerootcause.dto";

@Index("sslno", ["sslno"], {})
@Index("fbrslno", ["fbrslno"], {})
@Entity("fixturerootcause001mb", { schema: "trims" })
export class Fixturerootcause001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("int", { name: "fbrslno" })
  fbrslno: number;

  @Column("varchar", { name: "fname", length: 250 })
  fname: string;

  @Column("varchar", { name: "fdetails", length: 250 })
  fdetails: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(
    () => Fixturepreventiveaction001mb,
    (fixturepreventiveaction001mb) => fixturepreventiveaction001mb.rcslno2
  )
  fixturepreventiveaction001mbs: Fixturepreventiveaction001mb[];

  @ManyToOne(
    () => Fixturestatus001mb,
    (fixturestatus001mb) => fixturestatus001mb.fixturerootcause001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Fixturestatus001mb;

  @ManyToOne(
    () => Breakdown001mb,
    (breakdown001mb) => breakdown001mb.fixturerootcause001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "fbrslno", referencedColumnName: "slNo" }])
  fbrslno2: Breakdown001mb;


  setProperties(fixturerootcauseDTO: FixtureRootcauseDTO) {
    this.slNo = fixturerootcauseDTO.slNo;
    this.unitslno = fixturerootcauseDTO.unitslno;
    this.sslno = fixturerootcauseDTO.sslno;
    this.fbrslno = fixturerootcauseDTO.fbrslno
    this.fname = fixturerootcauseDTO.fname;
    this.fdetails = fixturerootcauseDTO.fdetails;
    this.insertUser = fixturerootcauseDTO.insertUser;
    this.insertDatetime = fixturerootcauseDTO.insertDatetime;
    this.updatedUser = fixturerootcauseDTO.updatedUser;
    this.updatedDatetime = fixturerootcauseDTO.updatedDatetime;
}
}