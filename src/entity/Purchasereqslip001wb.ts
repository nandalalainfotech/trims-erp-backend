import { PurchasereqslipDTO } from "src/dto/Purchasereqslip.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Purchasereqitem001wb } from "./Purchasereqitem001wb";
import { Supplierquotation001wb } from "./Supplierquotation001wb";

@Entity("purchasereqslip001wb", { schema: "trims" })
export class Purchasereqslip001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column({ name: "date", type:"date" })
  
  date: Date;

  @Column("varchar", { name: "prs_no", length: 30 })
  prsNo: string;

  @Column("datetime", { name: "po_date" })
  poDate: Date;

  @Column("datetime", { name: "req_date" })
  reqDate: Date;

  @Column("varchar", { name: "po_no", length: 30 })
  poNo: string;

  @Column("varchar", { name: "remarks", length: 100 })
  remarks: string;
  
  @Column("varchar", { name: "suppliertype", length: 100 })
  suppliertype: string;

  @Column("varchar", { name: "status", nullable: true, length: 255 })
  status: string | null;

  @Column("int", { name: "tAmount", nullable: true })
  tAmount: number | null;

  @Column("varchar", { name: "tWords", length: 200 })
  tWords: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(
    () => Purchasereqitem001wb,
    (purchasereqitem001wb) => purchasereqitem001wb.prslno2
  )
  purchasereqitem001wbs: Purchasereqitem001wb[];

  @OneToMany(
    () => Supplierquotation001wb,
    (supplierquotation001wb) => supplierquotation001wb.prsno2
  )
  supplierquotation001wbs: Supplierquotation001wb[];

  setProperties(purchasereqslipDTO: PurchasereqslipDTO) {
    this.slNo = purchasereqslipDTO.slNo;
    this.unitslno = purchasereqslipDTO.unitslno;
    this.date =new Date( purchasereqslipDTO.date);
    this.prsNo = purchasereqslipDTO.prsNo;
    this.poDate = purchasereqslipDTO.poDate;
    this.reqDate = purchasereqslipDTO.reqDate;
    this.poNo = purchasereqslipDTO.poNo;
    this.remarks = purchasereqslipDTO.remarks;
    this.suppliertype = purchasereqslipDTO.suppliertype;
    this.status = purchasereqslipDTO.status;
    this.tAmount = purchasereqslipDTO.tAmount;
    this.tWords = purchasereqslipDTO.tWords;
    this.insertUser = purchasereqslipDTO.insertUser;
    this.insertDatetime = purchasereqslipDTO.insertDatetime;
    this.updatedUser = purchasereqslipDTO.updatedUser;
    this.updatedDatetime = purchasereqslipDTO.updatedDatetime;
}
}
