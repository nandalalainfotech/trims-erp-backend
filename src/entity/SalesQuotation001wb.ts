import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Custemerregistration001mb } from "./Custemerregistration001mb";
import { SalesQuotationDTO } from "src/dto/salesQuotation.dto";
import { Partitem001wb } from "./Partitem001wb";

@Index("custmr_slno", ["custmrSlno"], {})
@Entity("salesquotation001wb", { schema: "trims" })
export class Salesquotation001wb {
  @PrimaryGeneratedColumn({ type: "smallint", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "custmr_slno" })
  custmrSlno: number;

  @Column("varchar", { name: "sInvoice", length: 100 })
  sInvoice: string;

  @Column({ name: "cDate", type:"date" })
  cDate: Date;

  @Column("varchar", { name: "custemer_code", length: 100 })
  custemerCode: string;

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
    () => Partitem001wb,
    (partitem001wb) => partitem001wb.partitemslNo2
  )
  partitem001wbs: Partitem001wb[];

  @ManyToOne(
    () => Custemerregistration001mb,
    (custemerregistration001mb) =>
      custemerregistration001mb.salesquotation001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "custmr_slno", referencedColumnName: "slNo" }])
  custmrSlno2: Custemerregistration001mb;



    setProperties(salesQuotationDTO: SalesQuotationDTO) {
        this.slNo = salesQuotationDTO.slNo;
        this.unitslno = salesQuotationDTO.unitslno; 
        this.custmrSlno = salesQuotationDTO.custmrSlno;
        this.custemerCode = salesQuotationDTO.custemerCode;
        this.sInvoice = salesQuotationDTO.sInvoice;
        this.cDate = new Date(salesQuotationDTO.cDate);
        this.consignee = salesQuotationDTO.consignee;
        this.date = new Date(salesQuotationDTO.date);
        this.refno = salesQuotationDTO.refno;
        this.pono = salesQuotationDTO.pono;
        this.remarks=salesQuotationDTO.remarks;
        this.statusSlno=salesQuotationDTO.statusSlno;
        this.otherRef = salesQuotationDTO.otherRef;
        this.dispatchThrough = salesQuotationDTO.dispatchThrough;
        this.destination = salesQuotationDTO.destination;
        this.termsDelivery = salesQuotationDTO.termsDelivery;
        this.supplierFrom = salesQuotationDTO.supplierFrom;
        this.hsn = salesQuotationDTO.hsn;
        this.dueOn = new Date(salesQuotationDTO.dueOn);
        this.tAmount = salesQuotationDTO.tAmount;
        this.tWords = salesQuotationDTO.tWords;
        this.insertUser = salesQuotationDTO.insertUser;
        this.insertDatetime = salesQuotationDTO.insertDatetime;
        this.updatedUser = salesQuotationDTO.updatedUser;
        this.updatedDatetime = salesQuotationDTO.updatedDatetime;
      }
  }