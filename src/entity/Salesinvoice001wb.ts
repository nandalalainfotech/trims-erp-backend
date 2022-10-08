import { SalesInvoiceDTO } from "src/dto/salesInvoice.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Custemer001wb } from "./Custemer001wb";
import { Custemerregistration001mb } from "./Custemerregistration001mb";


@Index("custmr_slno", ["custmrSlno"], {})
@Entity("salesinvoice001wb", { schema: "trims" })
export class Salesinvoice001wb {
  @PrimaryGeneratedColumn({ type: "smallint", name: "sl_no", unsigned: true })
  slNo: number;
  
   @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "custemer_code", length: 100 })
  custemerCode: string;

  @Column("varchar", { name: "sInvoice", length: 100 })
  sInvoice: string;

  @Column({ name: "cDate", type:"date" })
  cDate: Date;

  @Column("int", { name: "custmr_slno" })
  custmrSlno: number;

  @Column("varchar", { name: "consignee", length: 50 })
  consignee: string;

  @Column({ name: "date", type:"date" })
  date: Date;

  @Column("varchar", { name: "pono", length: 50 })
  pono: string;

  @Column("varchar", { name: "refno", nullable: true, length: 50 })
  refno: string | null;

  @Column("varchar", { name: "other_ref", length: 50 })
  otherRef: string;

  @Column("varchar", { name: "dispatch_through", length: 50 })
  dispatchThrough: string;

  @Column("varchar", { name: "destination", length: 50 })
  destination: string;

  @Column("varchar", { name: "terms_delivery", length: 100 })
  termsDelivery: string;

  @Column("varchar", { name: "supplier_from", length: 150 })
  supplierFrom: string;

  @Column("varchar", { name: "HSN", length: 50 })
  hsn: string;

  @Column({ name: "due_on", type:"date" })
  dueOn: Date;

  @Column("int", { name: "status_slno", nullable: true })
  statusSlno: number | null;

  @Column("varchar", { name: "remarks", nullable: true, length: 200 })
  remarks: string | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToMany(
    () => Custemer001wb,
    (custemer001wb) => custemer001wb.salesinvoice001wbs
  )
  custemer001wbs: Custemer001wb[];

  @ManyToOne(
    () => Custemerregistration001mb,
    (custemerregistration001mb) => custemerregistration001mb.salesinvoice001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "custmr_slno", referencedColumnName: "slNo" }])
  custmrSlno2: Custemerregistration001mb;


  setProperties(salesInvoiceDTO: SalesInvoiceDTO) {
    this.slNo = salesInvoiceDTO.slNo;
    this.unitslno = salesInvoiceDTO.unitslno; 
    this.custmrSlno = salesInvoiceDTO.custmrSlno;
    this.custemerCode = salesInvoiceDTO.custemerCode;
    this.sInvoice = salesInvoiceDTO.sInvoice;
    this.cDate = new Date(salesInvoiceDTO.cDate);
    this.consignee = salesInvoiceDTO.consignee;
    this.date = new Date(salesInvoiceDTO.date);
    this.refno = salesInvoiceDTO.refno;
    this.pono = salesInvoiceDTO.pono;
    this.remarks=salesInvoiceDTO.remarks;
    this.statusSlno=salesInvoiceDTO.statusSlno;
    this.otherRef = salesInvoiceDTO.otherRef;
    this.dispatchThrough = salesInvoiceDTO.dispatchThrough;
    this.destination = salesInvoiceDTO.destination;
    this.termsDelivery = salesInvoiceDTO.termsDelivery;
    this.supplierFrom = salesInvoiceDTO.supplierFrom;
    this.hsn = salesInvoiceDTO.hsn;
    this.dueOn = new Date(salesInvoiceDTO.dueOn);
    this.insertUser = salesInvoiceDTO.insertUser;
    this.insertDatetime = salesInvoiceDTO.insertDatetime;
    this.updatedUser = salesInvoiceDTO.updatedUser;
    this.updatedDatetime = salesInvoiceDTO.updatedDatetime;
  }
}
