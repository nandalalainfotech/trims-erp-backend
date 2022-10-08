import { FixtureBreakdownDTO } from "src/dto/fixturebreakdown.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Fixturerootcause001mb } from "./Fixturerootcause001mb";
import { Fixturestatus001mb } from "./Fixturestatus001mb";

@Index("sslno", ["sslno"], {})
@Entity(" fixturebreakdown001mb", { schema: "trims" })
export class Fixturebreakdown001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("varchar", { name: "fbname", length: 250 })
  fbname: string;

  @Column("varchar", { name: "fbdetails", length: 250 })
  fbdetails: string;

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
    (fixturestatus001mb) => fixturestatus001mb.fixturebreakdown001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Fixturestatus001mb;
  @OneToMany(() => Fixturerootcause001mb, (fixturerootcause001mb) => fixturerootcause001mb.fbrslno2)
  fixturerootcause001mbs: Fixturerootcause001mb[];

  setProperties(fixturebreakdownDTO: FixtureBreakdownDTO) {
    this.slNo = fixturebreakdownDTO.slNo;
    this.unitslno = fixturebreakdownDTO.unitslno;
    this.sslno = fixturebreakdownDTO.sslno;
    this.fbname = fixturebreakdownDTO.fbname;
    this.fbdetails = fixturebreakdownDTO.fbdetails;
    this.insertUser = fixturebreakdownDTO.insertUser;
    this.insertDatetime = fixturebreakdownDTO.insertDatetime;
    this.updatedUser = fixturebreakdownDTO.updatedUser;
    this.updatedDatetime = fixturebreakdownDTO.updatedDatetime;
  }
}
