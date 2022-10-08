import { FixtureDTO } from "src/dto/fixture.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fixturechecklist001mb } from "./Fixturechecklist001mb";
import { Status001mb } from "./Status001mb";


@Index("sslno", ["sslno"], {})
@Entity("fixture001mb", { schema: "trims" })
export class Fixture001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("varchar", { name: "fcode", length: 50 })
  fcode: string;

  @Column("varchar", { name: "fname", length: 500 })
  fname: string;

  @Column("datetime", { name: "fyear" })
  fyear: Date;

  @Column("varchar", { name: "fcapacity", length: 100 })
  fcapacity: string;

  @Column("varchar", { name: "ftype", length: 100 })
  ftype: string;

  @Column("varchar", { name: "fmake", length: 100 })
  fmake: string;

  @Column("varchar", { name: "flocation", length: 100 })
  flocation: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(() => Status001mb, (status001mb) => status001mb.fixture001mb, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  


  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Status001mb;
  fixture001mbs: any;
  fixturechecklist001mbs: any;
  fixturepreventiveplan001wbs: any;
  fixturepreventivechecklist001wbs: any;
  fixturedailychecklist001wbs:any;

  setProperties(fixtureDTO: FixtureDTO) {
    this.slNo = fixtureDTO.slNo;
    this.unitslno = fixtureDTO.unitslno;
    this.sslno = fixtureDTO.sslno;
    this.fcode = fixtureDTO.fcode;
    this.fname = fixtureDTO.fname;
    this.fyear = new Date(fixtureDTO.fyear);
    this.fcapacity = fixtureDTO.fcapacity;
    this.ftype = fixtureDTO.ftype;
    this.fmake = fixtureDTO.fmake;
    this.flocation = fixtureDTO.flocation;
    this.insertUser = fixtureDTO.insertUser;
    this.insertDatetime = fixtureDTO.insertDatetime;
    this.updatedUser = fixtureDTO.updatedUser;
    this.updatedDatetime = fixtureDTO.updatedDatetime;
  }
}
