import { SparesDTO } from "src/dto/spares.dto";
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
import { Machine001mb } from "./Machine001mb";
import { Materialreqslip001wb } from "./Materialreqslip001wb";
import { Purchasereqslip001wb } from "./Purchasereqslip001wb";
import { Status001mb } from "./Status001mb";

@Index("msslno", ["msslno"], {})
@Index("sslno", ["sslno"], {})
@Entity("spares001mb", { schema: "trims" })
export class Spares001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "msslno" })
  msslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("varchar", { name: "spares", length: 50 })
  spares: string;

  @Column("int", { name: "sparescost", nullable: true })
  sparescost: number | null;

  @Column("varchar", { name: "specification", length: 50 })
  specification: string;

  @Column("varchar", { name: "leadtime", nullable: true, length: 255 })
  leadtime: string | null;

  @Column("int", {
    name: "minimumstocklevel",
    nullable: true,
    default: () => "'0'",
  })
  minimumstocklevel: number | null;

  @Column("int", { name: "reorderlevel", nullable: true, default: () => "'0'" })
  reorderlevel: number | null;

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
    (breakdownreg001wb) => breakdownreg001wb.sslno2
  )
  breakdownreg001wbs: Breakdownreg001wb[];

  @ManyToOne(() => Machine001mb, (machine001mb) => machine001mb.spares001mbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "msslno", referencedColumnName: "slNo" }])
  msslno2: Machine001mb;

  @ManyToOne(() => Status001mb, (status001mb) => status001mb.spares001mbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Status001mb;

  @OneToMany(
    () => Materialreqslip001wb,
    (materialreqslip001wb) => materialreqslip001wb.spareSlno2
  )
  materialreqslip001wbs: Materialreqslip001wb[];

  setProperties(sparesDTO: SparesDTO) {
    this.slNo = sparesDTO.slNo;
    this.unitslno = sparesDTO.unitslno;
    this.msslno = sparesDTO.msslno;
    this.sslno = sparesDTO.sslno;
    this.spares = sparesDTO.spares;
    this.sparescost = sparesDTO.sparescost;
    this.specification = sparesDTO.specification;
    this.leadtime = sparesDTO.leadtime;
    this.minimumstocklevel = sparesDTO.minimumstocklevel;
    this.reorderlevel = sparesDTO.reorderlevel;
    this.insertUser = sparesDTO.insertUser;
    this.insertDatetime = sparesDTO.insertDatetime;
    this.updatedUser = sparesDTO.updatedUser;
    this.updatedDatetime = sparesDTO.updatedDatetime;
  }
}
