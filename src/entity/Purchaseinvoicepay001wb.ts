import { PurchaseInvoicePayDTO } from "src/dto/PurchaseInvoicePay.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchaseinvoiceitems001wb } from "./Purchaseinvoiceitems001wb";
import { Purchaseorder001wb } from "./Purchaseorder001wb";

@Index("po_slno", ["poSlno"], {})
@Entity("purchaseinvoicepay001wb", { schema: "trims" })
export class Purchaseinvoicepay001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column({ name: "cDate", type:"date" })
  cDate: Date;

  @Column("int", { name: "po_slno" })
  poSlno: number;

  @Column("int", { name: "prsNo", nullable: true })
  prsNo: number | null;

  @Column("int", { name: "grnNo", nullable: true })
  grnNo: number | null;

  @Column("int", { name: "suppliercode", nullable: true })
  suppliercode: number | null;

  @Column("varchar", { name: "suppliername", nullable: true, length: 50 })
  suppliername: string | null;

  @Column("varchar", { name: "purchaseInvoice", nullable: true, length: 50 })
  purchaseInvoice: string | null;

  @Column("datetime", { name: "reqDate" })
  reqDate: Date;

  @Column("varchar", { name: "incomingNo", nullable: true, length: 50 })
  incomingNo: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 200 })
  status: string | null;

  @Column("varchar", { name: "remarks", nullable: true, length: 200 })
  remarks: string | null;

  @Column("varchar", { name: "filename", nullable: true, length: 200 })
  filename: string | null;

  @Column("varchar", { name: "originalfilename", nullable: true, length: 200 })
  originalfilename: string | null;

  @Column("varchar", { name: "filepath", nullable: true, length: 200 })
  filepath: string | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(
    () => Purchaseinvoiceitems001wb,
    (purchaseinvoiceitems001wb) => purchaseinvoiceitems001wb.purchaseslno2
  )
  purchaseinvoiceitems001wbs: Purchaseinvoiceitems001wb[];

  @ManyToOne(
    () => Purchaseorder001wb,
    (purchaseorder001wb) => purchaseorder001wb.purchaseinvoicepay001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "po_slno", referencedColumnName: "slNo" }])
  poSlno2: Purchaseorder001wb;


  setProperties(purchaseInvoicePayDTO: PurchaseInvoicePayDTO) {
    this.slNo = purchaseInvoicePayDTO.slNo;
    this.unitslno = purchaseInvoicePayDTO.unitslno;
    this.cDate = new Date(purchaseInvoicePayDTO.cDate);
    this.poSlno = purchaseInvoicePayDTO.poSlno;
    this.prsNo = purchaseInvoicePayDTO.prsNo;
    this.grnNo = purchaseInvoicePayDTO.grnNo;
    this.suppliercode = purchaseInvoicePayDTO.suppliercode;
    this.suppliername = purchaseInvoicePayDTO.suppliername;
    this.purchaseInvoice = purchaseInvoicePayDTO.purchaseInvoice;
    this.reqDate = new Date(purchaseInvoicePayDTO.reqDate);
    this.incomingNo = purchaseInvoicePayDTO.incomingNo;
    this.filename = purchaseInvoicePayDTO.filename;
    this.filepath = purchaseInvoicePayDTO.filepath;
    this.originalfilename = purchaseInvoicePayDTO.originalfilename;
    this.status = purchaseInvoicePayDTO.status;
    this.remarks = purchaseInvoicePayDTO.remarks;
    this.insertUser = purchaseInvoicePayDTO.insertUser;
    this.insertDatetime = purchaseInvoicePayDTO.insertDatetime;
    this.updatedUser = purchaseInvoicePayDTO.updatedUser;
    this.updatedDatetime = purchaseInvoicePayDTO.updatedDatetime;
   
  }


}
