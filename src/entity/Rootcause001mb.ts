import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Breakdownreg001wb } from "./Breakdownreg001wb";
import { Preventiveaction001mb } from "./Preventiveaction001mb";
import { Status001mb } from "./Status001mb";
import { Breakdown001mb } from "./Breakdown001mb";
import { RootcauseDTO } from "src/dto/rootcause.dto";

@Index("sslno", ["sslno"], {})
@Index("brslno", ["brslno"], {})
@Entity("rootcause001mb", { schema: "trims" })
export class Rootcause001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("int", { name: "brslno" })
  brslno: number;

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

  @OneToMany(
    () => Breakdownreg001wb,
    (breakdownreg001wb) => breakdownreg001wb.rcsl2
  )
  breakdownreg001wbs: Breakdownreg001wb[];

  @OneToMany(
    () => Preventiveaction001mb,
    (preventiveaction001mb) => preventiveaction001mb.rcslno2
  )
  preventiveaction001mbs: Preventiveaction001mb[];

  @ManyToOne(() => Status001mb, (status001mb) => status001mb.rootcause001mbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Status001mb;

  @ManyToOne(
    () => Breakdown001mb,
    (breakdown001mb) => breakdown001mb.rootcause001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "brslno", referencedColumnName: "slNo" }])
  brslno2: Breakdown001mb;

  setProperties(rootcauseDTO: RootcauseDTO) {
    this.slNo = rootcauseDTO.slNo;
    this.unitslno = rootcauseDTO.unitslno;
    this.sslno = rootcauseDTO.sslno;
    this.brslno = rootcauseDTO.brslno
    this.name = rootcauseDTO.name;
    this.details = rootcauseDTO.details;
    this.insertUser = rootcauseDTO.insertUser;
    this.insertDatetime = rootcauseDTO.insertDatetime;
    this.updatedUser = rootcauseDTO.updatedUser;
    this.updatedDatetime = rootcauseDTO.updatedDatetime;
}
}
