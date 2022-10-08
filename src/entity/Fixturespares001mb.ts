import { FixtureSparesDTO } from "src/dto/FixtureSpare.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fixture001mb } from "./Fixture001mb";
import { Status001mb } from "./Status001mb";

@Index("msslno", ["msslno"], {})
@Index("sslno", ["sslno"], {})
@Entity("fixturespares001mb", { schema: "trims" })
export class Fixturespares001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "msslno" })
  msslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("varchar", { name: "fspares", length: 50 })
  fspares: string;

  @Column("int", { name: "fsparescost", nullable: true })
  fsparescost: number | null;

  @Column("varchar", { name: "fspecification", length: 50 })
  fspecification: string;

  @Column("date", { name: "fleadtime", nullable: true })
  fleadtime: Date | null;

  @Column("int", {
    name: "fminimumstocklevel",
    nullable: true,
    default: () => "'0'",
  })
  fminimumstocklevel: number | null;

  @Column("int", {
    name: "freorderlevel",
    nullable: true,
    default: () => "'0'",
  })
  freorderlevel: number | null;

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
    (fixture001mb) => fixture001mb.fixture001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "msslno", referencedColumnName: "slNo" }])
  msslno2: Fixture001mb;

  @ManyToOne(
    () => Status001mb,
    (status001mb) => status001mb.status001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Status001mb;
  setProperties(fixturesparesDTO: FixtureSparesDTO) {
    this.slNo = fixturesparesDTO.slNo;
    this.unitslno = fixturesparesDTO.unitslno;
    this.msslno = fixturesparesDTO.msslno;
    this.sslno = fixturesparesDTO.sslno;
    this.fspares = fixturesparesDTO.fspares;
    this.fsparescost = fixturesparesDTO.fsparescost;
    this.fspecification = fixturesparesDTO.fspecification;
    this.fleadtime = new Date(fixturesparesDTO.fleadtime);
    this.fminimumstocklevel = fixturesparesDTO.fminimumstocklevel;
    this.freorderlevel = fixturesparesDTO.freorderlevel;
    this.insertUser = fixturesparesDTO.insertUser;
    this.insertDatetime = fixturesparesDTO.insertDatetime;
    this.updatedUser = fixturesparesDTO.updatedUser;
    this.updatedDatetime = fixturesparesDTO.updatedDatetime;
  }
}
