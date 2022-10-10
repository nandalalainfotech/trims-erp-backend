import { CustomerpoitemDTO } from "src/dto/Customerpoitem.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customerpomaster001mb } from "./Customerpomaster001mb";

@Index("customerpoSlno", ["customerpoSlno"], {})
@Entity("customerpoitem001wb", { schema: "trims" })
export class Customerpoitem001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "customerpoSlno", nullable: true })
  customerpoSlno: number | null;

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

  @Column("varchar", { name: "drawingNo", nullable: true, length: 250 })
  drawingNo: string | null;

  @Column("varchar", { name: "revisionNo", nullable: true, length: 250 })
  revisionNo: string | null;

  @Column({ name: "revisionDate", type:"date" })
  revisionDate: Date | null;

  @Column("varchar", { name: "hsn", nullable: true, length: 250 })
  hsn: string | null;

  @Column("varchar", { name: "gst", nullable: true, length: 250 })
  gst: string | null;

  @Column("varchar", { name: "insert_user", nullable: true, length: 40 })
  insertUser: string | null;

  @Column("datetime", { name: "insert_datetime", nullable: true })
  insertDatetime: Date | null;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Customerpomaster001mb,
    (customerpomaster001mb) => customerpomaster001mb.customerpoitem001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "customerpoSlno", referencedColumnName: "slNo" }])
  customerpoSlno2: Customerpomaster001mb;

  setProperties(customerpoitemDTO: CustomerpoitemDTO) {
    this.slNo=customerpoitemDTO.slNo;
    this.unitslno=customerpoitemDTO.unitslno;
    this.customerpoSlno=customerpoitemDTO.customerpoSlno;
    this.prtcode=customerpoitemDTO.prtcode;
    this.prtmname=customerpoitemDTO.prtmname;
    this.prtdescrip=customerpoitemDTO.prtdescrip;
    this.prtqunty=customerpoitemDTO.prtqunty;
    this.prtuom=customerpoitemDTO.prtuom;
    this.prthsn = customerpoitemDTO.prthsn;
    this.prtunitrate=customerpoitemDTO.prtunitrate;
    this.prttotalamount=customerpoitemDTO.prttotalamount;
    this.drawingNo=customerpoitemDTO.drawingNo;
    this.revisionNo=customerpoitemDTO.revisionNo;
    this.revisionDate = new Date(customerpoitemDTO.revisionDate);
    this.hsn=customerpoitemDTO.hsn;
    this.gst=customerpoitemDTO.gst;

    this.insertUser = customerpoitemDTO.insertUser;
    this.insertDatetime = customerpoitemDTO.insertDatetime;
    this.updatedUser = customerpoitemDTO.updatedUser;
    this.updatedDatetime = customerpoitemDTO.updatedDatetime;
}
}
