import { SalesOrderDTO } from "src/dto/salesOrder.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payment001wb } from "./Payment001wb";
import { Purchaseorder001wb } from "./Purchaseorder001wb";

@Index("porder_slno", ["porderSlno"], {})
@Entity("salesorder001wb", { schema: "trims" })
export class Salesorder001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "porder_slno" })
  porderSlno: number;

  @Column("varchar", { name: "invoice_no", length: 50 })
  invoiceNo: string;

  @Column({ name: "date", type: "date" })
  date: Date;

  @Column("varchar", { name: "delivery_note", length: 100 })
  deliveryNote: string;

  @Column("varchar", { name: "mode_pay", length: 50 })
  modePay: string;

  @Column("varchar", { name: "Ref_no_date", length: 50 })
  refNoDate: string;

  @Column("varchar", { name: "other_ref", length: 50 })
  otherRef: string;

  @Column("varchar", { name: "buyer_order_no", length: 50 })
  buyerOrderNo: string;

  @Column({ name: "buyer_date" , type: "date" })
  buyerDate: Date;

  @Column("varchar", { name: "dispatch_doc_no", length: 50 })
  dispatchDocNo: string;

  @Column("varchar", { name: "delivery_note_date", length: 50 })
  deliveryNoteDate: string;

  @Column("varchar", { name: "dispatch_through", length: 50 })
  dispatchThrough: string;

  @Column("varchar", { name: "destination", length: 50 })
  destination: string;

  @Column("varchar", { name: "bill_of_lading", length: 50 })
  billOfLading: string;

  @Column("varchar", { name: "motorvehicle_no", length: 50 })
  motorvehicleNo: string;

  @Column("varchar", { name: "terms_delivery", length: 100 })
  termsDelivery: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  

  // @ManyToOne(
  //   () => Purchaseorder001wb,
  //   (purchaseorder001wb) => purchaseorder001wb.salesorder001wbs,
  //   { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  // )
  // @JoinColumn([{ name: "porder_slno", referencedColumnName: "slNo" }])
  // porderSlno2: Purchaseorder001wb;

  setProperties(salesOrderDTO: SalesOrderDTO) {
    this.slNo = salesOrderDTO.slNo;
    this.unitslno = salesOrderDTO.unitslno;
    this.porderSlno = salesOrderDTO.porderSlno;
    this.invoiceNo = salesOrderDTO.invoiceNo;
    this.date = new Date(salesOrderDTO.date);
    this.deliveryNote = salesOrderDTO.deliveryNote;
    this.modePay = salesOrderDTO.modePay;
    this.refNoDate = salesOrderDTO.refNoDate;
    this.otherRef = salesOrderDTO.otherRef;
    this.buyerOrderNo = salesOrderDTO.buyerOrderNo;
    this.buyerDate = new Date(salesOrderDTO.buyerDate);
    this.dispatchDocNo = salesOrderDTO.dispatchDocNo;
    this.deliveryNoteDate = salesOrderDTO.deliveryNoteDate;
    this.dispatchThrough = salesOrderDTO.dispatchThrough;
    this.destination = salesOrderDTO.destination;
    this.billOfLading = salesOrderDTO.billOfLading;
    this.motorvehicleNo = salesOrderDTO.motorvehicleNo;
    this.termsDelivery = salesOrderDTO.termsDelivery;
    this.insertUser = salesOrderDTO.insertUser;
    this.insertDatetime = salesOrderDTO.insertDatetime;
    this.updatedUser = salesOrderDTO.updatedUser;
    this.updatedDatetime = salesOrderDTO.updatedDatetime;
}
}
