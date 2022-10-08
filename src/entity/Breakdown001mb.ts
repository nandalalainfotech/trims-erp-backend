import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Status001mb } from "./Status001mb";
import { Breakdownreg001wb } from "./Breakdownreg001wb";
import { Rootcause001mb } from "./Rootcause001mb";
import { BreakdownDTO } from "src/dto/breakdown.dto";
import { Fixturerootcause001mb } from "./Fixturerootcause001mb";

@Index("sslno", ["sslno"], {})
@Entity("breakdown001mb", { schema: "trims" })
export class Breakdown001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

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

  @ManyToOne(() => Status001mb, (status001mb) => status001mb.breakdown001mbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Status001mb;

  @OneToMany(
    () => Breakdownreg001wb,
    (breakdownreg001wb) => breakdownreg001wb.bdsl2
  )
  breakdownreg001wbs: Breakdownreg001wb[];

  @OneToMany(() => Rootcause001mb, (rootcause001mb) => rootcause001mb.brslno2)
  rootcause001mbs: Rootcause001mb[];
  fixturerootcause001mbs: any;
  toolsrootcause001mbs: any;




 
  setProperties(breakdownDTO: BreakdownDTO) {
    this.slNo = breakdownDTO.slNo;
    this.unitslno = breakdownDTO.unitslno;
    this.sslno = breakdownDTO.sslno;
    this.name = breakdownDTO.name;
    this.details = breakdownDTO.details;
    this.insertUser = breakdownDTO.insertUser;
    this.insertDatetime = breakdownDTO.insertDatetime;
    this.updatedUser = breakdownDTO.updatedUser;
    this.updatedDatetime = breakdownDTO.updatedDatetime;
  }
}
