import { CustemerwbDTO } from "src/dto/Custemerwb.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Part001mb } from "./Part001mb";
import { Salesinvoice001wb } from "./Salesinvoice001wb";

@Index("salespart_slno", ["salespartSlno"], {})
@Entity("custemer001wb", { schema: "trims" })
export class Custemer001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("smallint", {name: "salespart_slno",nullable: true,unsigned: true,})
  salespartSlno: number | null;

  @Column("int", { name: "prtcode", nullable: true })
  prtcode: number | null;

  @Column("varchar", { name: "prtmname", nullable: true, length: 250 })
  prtmname: string | null;

  @Column("varchar", { name: "prtdescrip", nullable: true, length: 250 })
  prtdescrip: string | null;

  @Column("varchar", { name: "prtqunty", nullable: true, length: 250 })
  prtqunty: string | null;

  @Column("varchar", { name: "prtuom", nullable: true, length: 250 })
  prtuom: string | null;

  @Column("varchar", { name: "prthsn", nullable: true, length: 250 })
  prthsn: string | null;

  @Column("varchar", { name: "prtunitrate", nullable: true, length: 250 })
  prtunitrate: string | null;

  @Column("int", { name: "prttotalamount", nullable: true })
  prttotalamount: number | null;

  @Column("varchar", { name: "insert_user", nullable: true, length: 40 })
  insertUser: string | null;

  @Column("datetime", { name: "insert_datetime", nullable: true })
  insertDatetime: Date | null;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Salesinvoice001wb,
    (salesinvoice001wb) => salesinvoice001wb.custemer001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "salespart_slno", referencedColumnName: "slNo" }])
  salespartSlno2: Salesinvoice001wb;

  @ManyToOne(() => Part001mb, (part001mb) => part001mb.custemer001wbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "prtcode", referencedColumnName: "slNo" }])
  prtcode2: Part001mb;

  setProperties(custemerwbDTO: CustemerwbDTO) {
    this.slNo = custemerwbDTO.slNo;
    this.unitslno = custemerwbDTO.unitslno;
    this.salespartSlno = custemerwbDTO.salespartSlno;
    this.prtcode = custemerwbDTO.prtcode;
    this.prtmname = custemerwbDTO.prtmname;
    this.prtdescrip = custemerwbDTO.prtdescrip;
    this.prtqunty = custemerwbDTO.prtqunty;
    this.prtuom = custemerwbDTO.prtuom;
    this.prthsn = custemerwbDTO.prthsn;
    this.prtunitrate = custemerwbDTO.prtunitrate;
    this.prttotalamount = custemerwbDTO.prttotalamount;
    this.insertUser = custemerwbDTO.insertUser;
    this.insertDatetime = custemerwbDTO.insertDatetime;
    this.updatedUser = custemerwbDTO.updatedUser;
    this.updatedDatetime = custemerwbDTO.updatedDatetime;


  }


}