import { PurchaseInvoiceItemDTO } from "src/dto/PurchaseInvoiceItem.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchaseinvoicepay001wb } from "./Purchaseinvoicepay001wb";

@Index("purchaseslno", ["purchaseslno"], {})
@Entity("purchaseinvoiceitems001wb", { schema: "trims" })
export class Purchaseinvoiceitems001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "purchaseslno", nullable: true })
  purchaseslno: number | null;

  @Column("int", { name: "itemcode", nullable: true })
  itemcode: number | null;

  @Column("varchar", { name: "itemname", nullable: true, length: 250 })
  itemname: string | null;

  @Column("varchar", { name: "descrip", nullable: true, length: 250 })
  descrip: string | null;

  @Column("varchar", { name: "qunty", nullable: true, length: 250 })
  qunty: string | null;

  @Column("varchar", { name: "uom", nullable: true, length: 250 })
  uom: string | null;

  @Column("varchar", { name: "hsn", nullable: true, length: 250 })
  hsn: string | null;

  @Column("varchar", { name: "unitrate", nullable: true, length: 250 })
  unitrate: string | null;

  @Column("int", { name: "totalamount", nullable: true })
  totalamount: number | null;

  @Column("int", { name: "cucode", nullable: true })
  cucode: number | null;

  @Column("varchar", { name: "cuname", nullable: true, length: 250 })
  cuname: string | null;

  @Column("varchar", { name: "cudescrip", nullable: true, length: 250 })
  cudescrip: string | null;

  @Column("varchar", { name: "cuqunty", nullable: true, length: 250 })
  cuqunty: string | null;

  @Column("varchar", { name: "cuom", nullable: true, length: 250 })
  cuom: string | null;

  @Column("varchar", { name: "chsn", nullable: true, length: 250 })
  chsn: string | null;

  @Column("varchar", { name: "cunitrate", nullable: true, length: 250 })
  cunitrate: string | null;

  @Column("int", { name: "cutotalamount", nullable: true })
  cutotalamount: number | null;

  @Column("int", { name: "cptcode", nullable: true })
  cptcode: number | null;

  @Column("varchar", { name: "cptname", nullable: true, length: 250 })
  cptname: string | null;

  @Column("varchar", { name: "cptdescrip", nullable: true, length: 250 })
  cptdescrip: string | null;

  @Column("varchar", { name: "cptqunty", nullable: true, length: 250 })
  cptqunty: string | null;

  @Column("varchar", { name: "cptuom", nullable: true, length: 250 })
  cptuom: string | null;

  @Column("varchar", { name: "cpthsn", nullable: true, length: 250 })
  cpthsn: string | null;

  @Column("varchar", { name: "cptunitrate", nullable: true, length: 250 })
  cptunitrate: string | null;

  @Column("int", { name: "cpttotalamount", nullable: true })
  cpttotalamount: number | null;

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
    () => Purchaseinvoicepay001wb,
    (purchaseinvoicepay001wb) =>
      purchaseinvoicepay001wb.purchaseinvoiceitems001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "purchaseslno", referencedColumnName: "slNo" }])
  purchaseslno2: Purchaseinvoicepay001wb;



  setProperties(purchaseInvoiceItemDTO: PurchaseInvoiceItemDTO) {
    this.slNo = purchaseInvoiceItemDTO.slNo;
    this.unitslno=purchaseInvoiceItemDTO.unitslno;
    this.purchaseslno = purchaseInvoiceItemDTO.purchaseslno;
    this.itemcode = purchaseInvoiceItemDTO.itemcode;
    this.itemname = purchaseInvoiceItemDTO.itemname;
    this.descrip = purchaseInvoiceItemDTO.descrip;
    this.qunty = purchaseInvoiceItemDTO.qunty;
    this.uom = purchaseInvoiceItemDTO.uom;
    this.unitrate = purchaseInvoiceItemDTO.unitrate;
    this.totalamount = purchaseInvoiceItemDTO.totalamount;


    this.hsn = purchaseInvoiceItemDTO.hsn;
    this.chsn = purchaseInvoiceItemDTO.chsn;
    this.cpthsn = purchaseInvoiceItemDTO.cpthsn;
    this.prthsn = purchaseInvoiceItemDTO.prthsn;

    this.cucode = purchaseInvoiceItemDTO.cucode;
    this.cuname = purchaseInvoiceItemDTO.cuname;
    this.cudescrip = purchaseInvoiceItemDTO.cudescrip;
    this.cuqunty = purchaseInvoiceItemDTO.cuqunty;
    this.cuom = purchaseInvoiceItemDTO.cuom;
    this.cunitrate = purchaseInvoiceItemDTO.cunitrate;
    this.cutotalamount = purchaseInvoiceItemDTO.cutotalamount;


    this.cptcode = purchaseInvoiceItemDTO.cptcode;
    this.cptname = purchaseInvoiceItemDTO.cptname;
    this.cptdescrip = purchaseInvoiceItemDTO.cptdescrip;
    this.cptqunty = purchaseInvoiceItemDTO.cptqunty;
    this.cptuom = purchaseInvoiceItemDTO.cptuom;
    this.cptunitrate = purchaseInvoiceItemDTO.cptunitrate;
    this.cpttotalamount = purchaseInvoiceItemDTO.cpttotalamount;


    this.prtcode = purchaseInvoiceItemDTO.prtcode;
    this.prtmname = purchaseInvoiceItemDTO.prtmname;
    this.prtdescrip = purchaseInvoiceItemDTO.prtdescrip;
    this.prtqunty = purchaseInvoiceItemDTO.prtqunty;
    this.prtuom = purchaseInvoiceItemDTO.prtuom;
    this.prtunitrate = purchaseInvoiceItemDTO.prtunitrate;
    this.prttotalamount = purchaseInvoiceItemDTO.prttotalamount;



    this.insertUser = purchaseInvoiceItemDTO.insertUser;
    this.insertDatetime = purchaseInvoiceItemDTO.insertDatetime;
    this.updatedUser = purchaseInvoiceItemDTO.updatedUser;
    this.updatedDatetime = purchaseInvoiceItemDTO.updatedDatetime;


  }
}
