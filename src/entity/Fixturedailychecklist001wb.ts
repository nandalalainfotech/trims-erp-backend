import { FixturedailychecklistDTO } from "src/dto/Fixturedailychecklist.dto";
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
@Entity("fixturedailychecklist001wb", { schema: "trims" })
export class Fixturedailychecklist001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "mslno" })
  mslno: number;

  @Column("int", { name: "cpslno" })
  cpslno: number;

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
    (fixture001mb) => fixture001mb.fixturedailychecklist001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "mslno", referencedColumnName: "slNo" }])
  mslno2: Fixture001mb;

  @ManyToOne(
    () => Fixturechecklist001mb,
    (fixturechecklist001mb) =>
      fixturechecklist001mb.fixturedailychecklist001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "cpslno", referencedColumnName: "slNo" }])
  cpslno2: Fixturechecklist001mb;


  setProperties(fixturedailychecklistDTO: FixturedailychecklistDTO) {
    this.slNo = fixturedailychecklistDTO.slNo;
    this.unitslno = fixturedailychecklistDTO.unitslno;
    this.mslno = fixturedailychecklistDTO.mslno;
    this.cpslno = fixturedailychecklistDTO.cpslno;
    this.date = new Date(fixturedailychecklistDTO.date);
    this.insertUser = fixturedailychecklistDTO.insertUser;
    this.insertDatetime = fixturedailychecklistDTO.insertDatetime;
    this.updatedUser = fixturedailychecklistDTO.updatedUser;
    this.updatedDatetime = fixturedailychecklistDTO.updatedDatetime;
}
}
