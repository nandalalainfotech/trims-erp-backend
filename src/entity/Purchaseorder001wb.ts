import { PurchaseorderDTO } from "src/dto/Purchaseorder.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Materialinward001wb } from "./Materialinward001wb";
import { Orderitem001wb } from "./Orderitem001wb";
import { Purchaseinvoicepay001wb } from "./Purchaseinvoicepay001wb";
import { Supplierquotation001wb } from "./Supplierquotation001wb";

@Index("suplier_slno", ["suplierSlno"], {})
@Entity("purchaseorder001wb", { schema: "trims" })
export class Purchaseorder001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "suplier_slno" })
  suplierSlno: number;

  @Column("varchar", { name: "suplierName", length: 50 })
  suplierName: string;

  @Column("varchar", { name: "suplieraddress", length: 50 })
  suplieraddress: string;

  @Column("varchar", { name: "pono", length: 50 })
  pono: string;

  @Column({ name: "date", type:"date" })
  date: Date;

  @Column("int", { name: "prsno", nullable: true })
  prsno: number | null;

  @Column("varchar", { name: "qno", length: 50 })
  qno: string;

  @Column("varchar", { name: "dispatch_through", nullable: true, length: 50 })
  dispatchThrough: string | null;

  @Column("varchar", { name: "destination", length: 50 })
  destination: string;

  @Column("varchar", { name: "terms_delivery", length: 100 })
  termsDelivery: string;

  @Column("varchar", { name: "supplier_from", length: 150 })
  supplierFrom: string;

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

  @Column("varchar", { name: "status", nullable: true, length: 200 })
  status: string | null;

  @OneToMany(
    () => Orderitem001wb,
    (orderitem001wb) => orderitem001wb.purchaseslno2
  )
  orderitem001wbs: Orderitem001wb[];

  @ManyToOne(
    () => Supplierquotation001wb,
    (supplierquotation001wb) => supplierquotation001wb.purchaseorder001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "suplier_slno", referencedColumnName: "slNo" }])
  suplierSlno2: Supplierquotation001wb;

  @OneToMany(
    () => Materialinward001wb,
    (materialinward001wb) => materialinward001wb.purchseSlno2
  )
  materialinward001wbs: Materialinward001wb[];


  @OneToMany(
    () => Purchaseinvoicepay001wb,
    (purchaseinvoicepay001wb) => purchaseinvoicepay001wb.poSlno2
  )
  purchaseinvoicepay001wbs: Purchaseinvoicepay001wb[];

  
 setProperties(purchaseorderDTO: PurchaseorderDTO) {
    this.slNo = purchaseorderDTO.slNo;
    this.unitslno = purchaseorderDTO.unitslno;
    this.suplierSlno = purchaseorderDTO.suplierSlno;
    this.suplierName = purchaseorderDTO.suplierName;
    this.suplieraddress = purchaseorderDTO.suplieraddress;
    this.date = new Date(purchaseorderDTO.date);
    this.prsno = purchaseorderDTO.prsno;
    this.pono = purchaseorderDTO.pono;
    this.remarks=purchaseorderDTO.remarks;
    this.tAmount = purchaseorderDTO.tAmount;
    this.tWords = purchaseorderDTO.tWords;
    this.statusSlno=purchaseorderDTO.statusSlno;
    this.qno = purchaseorderDTO.qno;
    this.dispatchThrough = purchaseorderDTO.dispatchThrough;
    this.destination = purchaseorderDTO.destination;
    this.termsDelivery = purchaseorderDTO.termsDelivery;
    this.supplierFrom = purchaseorderDTO.supplierFrom;
    this.dueOn = new Date(purchaseorderDTO.dueOn);
    this.insertUser = purchaseorderDTO.insertUser;
    this.insertDatetime = purchaseorderDTO.insertDatetime;
    this.updatedUser = purchaseorderDTO.updatedUser;
    this.updatedDatetime = purchaseorderDTO.updatedDatetime;
    this.status = purchaseorderDTO.status;
  }
}
