import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Salesitem001mb } from "./Salesitem001mb";
import { Salesinvoice001wb } from "./Salesinvoice001wb";
import { CustemerwbDTO } from "src/dto/Custemerwb.dto";

@Index("custemer_slno", ["custemerSlno"], {})
@Entity("custemer001wb", { schema: "trims" })
export class Custemer001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "custemer_slno" })
  custemerSlno: number;

  @Column("varchar", { name: "custemername", length: 250 })
  custemername: string;

  @Column("varchar", { name: "prodescrip", length: 250 })
  prodescrip: string;

  @Column("varchar", { name: "qunty", length: 250 })
  qunty: string;

  @Column("varchar", { name: "uom", length: 250 })
  uom: string;

  @Column("varchar", { name: "unitrate", length: 250 })
  unitrate: string;

  @Column("int", { name: "totalamount" })
  totalamount: number;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Salesitem001mb,
    (salesitem001mb) => salesitem001mb.custemer001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "custemer_slno", referencedColumnName: "slNo" }])
  custemerSlno2: Salesitem001mb;

  @ManyToMany(
    () => Salesinvoice001wb,
    (salesinvoice001wb) => salesinvoice001wb.custemer001wbs
  )
  @JoinTable({
    name: "custemersalesinvoice001mb",
    joinColumns: [{ name: "custemer001wb", referencedColumnName: "slNo" }],
    inverseJoinColumns: [
      { name: "salesinvoice001wb", referencedColumnName: "slNo" },
    ],
    schema: "trims",
  })
  salesinvoice001wbs: Salesinvoice001wb[];



  setProperties(custemerwbDTO: CustemerwbDTO) {
    this.slNo = custemerwbDTO.slNo;
    this.unitslno = custemerwbDTO.unitslno;
    this.custemerSlno = custemerwbDTO.custemerSlno;
    this.custemername = custemerwbDTO.custemername;
    this.prodescrip = custemerwbDTO.prodescrip;
    this.qunty = custemerwbDTO.qunty;
    this.uom = custemerwbDTO.uom;
    this.unitrate = custemerwbDTO.unitrate;
    this.totalamount = custemerwbDTO.totalamount;
    this.insertUser = custemerwbDTO.insertUser;
    this.insertDatetime = custemerwbDTO.insertDatetime;
    this.updatedUser = custemerwbDTO.updatedUser;
    this.updatedDatetime = custemerwbDTO.updatedDatetime;


  }


}
