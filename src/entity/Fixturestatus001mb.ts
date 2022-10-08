import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Fixturebreakdown001mb } from "./Fixturebreakdown001mb";
import { Fixture001mb } from "./Fixture001mb";
import { Fixturechecklist001mb } from "./Fixturechecklist001mb";
import { Fixturepreventiveaction001mb } from "./Fixturepreventiveaction001mb";
import { Fixturerootcause001mb } from "./Fixturerootcause001mb";
import { Fixturespares001mb } from "./Fixturespares001mb";
import { FixtureStatusDTO } from "src/dto/FixtureStatus.dto";

@Entity("fixturestatus001mb", { schema: "trims" })
export class Fixturestatus001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "code_group" })
  codeGroup: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("char", { name: "status", length: 100 })
  status: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(
    () => Fixturebreakdown001mb,
    (fixturebreakdown001mb) => fixturebreakdown001mb.sslno2
  )
  fixturebreakdown001mbs: Fixturebreakdown001mb[];

  @OneToMany(() => Fixture001mb, (fixture001mb) => fixture001mb.sslno2)
  fixture001mbs: Fixture001mb[];

  @OneToMany(
    () => Fixturechecklist001mb,
    (fixturechecklist001mb) => fixturechecklist001mb.fstatus2
  )
  fixturechecklist001mbs: Fixturechecklist001mb[];

  @OneToMany(
    () => Fixturepreventiveaction001mb,
    (fixturepreventiveaction001mb) => fixturepreventiveaction001mb.sslno2
  )
  fixturepreventiveaction001mbs: Fixturepreventiveaction001mb[];

  @OneToMany(
    () => Fixturerootcause001mb,
    (fixturerootcause001mb) => fixturerootcause001mb.sslno2
  )
  fixturerootcause001mbs: Fixturerootcause001mb[];

  @OneToMany(
    () => Fixturespares001mb,
    (fixturespares001mb) => fixturespares001mb.sslno2
  )
  fixturespares001mbs: Fixturespares001mb[];





  setProperties(fixturestatusDTO: FixtureStatusDTO) {
    this.slNo = fixturestatusDTO.slNo;
    this.unitslno = fixturestatusDTO.unitslno;
    this.codeGroup = fixturestatusDTO.codeGroup;
    this.name = fixturestatusDTO.name;
    this.status = fixturestatusDTO.status;
    this.insertUser = fixturestatusDTO.insertUser;
    this.insertDatetime = fixturestatusDTO.insertDatetime;
    this.updatedUser = fixturestatusDTO.updatedUser;
    this.updatedDatetime = fixturestatusDTO.updatedDatetime;
}
}