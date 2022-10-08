import { PurchasereqslipitemDTO } from "src/dto/Purchasereqslipitem.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchasereqslip001wb } from "./Purchasereqslip001wb";
import { Orderitem001mb } from "./Orderitem001mb";
import { Consumble001mb } from "./Consumble001mb";
import { Part001mb } from "./Part001mb";
import { Childpart001mb } from "./ChildPart001mb";

@Index("prslno", ["prslno"], {})
@Index("orderslno", ["orderslno"], {})
@Index("cucode", ["cucode"], {})
@Index("cptcode", ["cptcode"], {})
@Index("prtcode", ["prtcode"], {})
@Entity("purchasereqitem001wb", { schema: "trims" })
export class Purchasereqitem001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;
    @Column("int", { name: "prslno", nullable: true })
  prslno: number | null;

  @Column("int", { name: "orderslno", nullable: true })
  orderslno: number | null;

  @Column("varchar", { name: "itemname", nullable: true, length: 250 })
  itemname: string | null;

  @Column("varchar", { name: "descrip", nullable: true, length: 250 })
  descrip: string | null;

  @Column("varchar", { name: "qunty", nullable: true, length: 250 })
  qunty: string | null;

  @Column("varchar", { name: "uom", nullable: true, length: 250 })
  uom: string | null;

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

  @Column("varchar", { name: "prtunitrate", nullable: true, length: 250 })
  prtunitrate: string | null;

  @Column("int", { name: "prttotalamount", nullable: true })
  prttotalamount: number | null;

  @Column("varchar", { name: "hsn", nullable: true, length: 250 })
  hsn: string | null;

  @Column("varchar", { name: "chsn", nullable: true, length: 250 })
  chsn: string | null;

  @Column("varchar", { name: "cpthsn", nullable: true, length: 250 })
  cpthsn: string | null;

  @Column("varchar", { name: "prthsn", nullable: true, length: 250 })
  prthsn: string | null;

  @Column("varchar", { name: "insert_user", nullable: true, length: 40 })
  insertUser: string | null;

  @Column("datetime", { name: "insert_datetime", nullable: true })
  insertDatetime: Date | null;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Purchasereqslip001wb,
    (purchasereqslip001wb) => purchasereqslip001wb.purchasereqitem001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "prslno", referencedColumnName: "slNo" }])
  prslno2: Purchasereqslip001wb;

  @ManyToOne(
    () => Orderitem001mb,
    (orderitem001mb) => orderitem001mb.purchasereqitem001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "orderslno", referencedColumnName: "slNo" }])
  orderslno2: Orderitem001mb;

  @ManyToOne(
    () => Consumble001mb,
    (consumble001mb) => consumble001mb.purchasereqitem001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "cucode", referencedColumnName: "slNo" }])
  cucode2: Consumble001mb;

  @ManyToOne(
    () => Childpart001mb,
    (childpart001mb) => childpart001mb.purchasereqitem001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "cptcode", referencedColumnName: "slNo" }])
  cptcode2: Childpart001mb;

  @ManyToOne(() => Part001mb, (part001mb) => part001mb.purchasereqitem001wbs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "prtcode", referencedColumnName: "slNo" }])
  prtcode2: Part001mb;

  
  setProperties(purchasereqslipitemDTO: PurchasereqslipitemDTO) {
    this.slNo = purchasereqslipitemDTO.slNo;
    this.unitslno=purchasereqslipitemDTO.unitslno;
    this.prslno = purchasereqslipitemDTO.prslno;
    this.orderslno = purchasereqslipitemDTO.orderslno;
    this.itemname = purchasereqslipitemDTO.itemname;
    this.descrip = purchasereqslipitemDTO.descrip;
    this.qunty = purchasereqslipitemDTO.qunty;
    this.uom = purchasereqslipitemDTO.uom;
    this.unitrate = purchasereqslipitemDTO.unitrate;
    this.totalamount = purchasereqslipitemDTO.totalamount;

    this.hsn = purchasereqslipitemDTO.hsn;
    this.chsn = purchasereqslipitemDTO.chsn;
    this.cpthsn = purchasereqslipitemDTO.cpthsn;
    this.prthsn = purchasereqslipitemDTO.prthsn;


    this.cucode = purchasereqslipitemDTO.cucode;
    this.cuname = purchasereqslipitemDTO.cuname;
    this.cudescrip = purchasereqslipitemDTO.cudescrip;
    this.cuqunty = purchasereqslipitemDTO.cuqunty;
    this.cuom = purchasereqslipitemDTO.cuom;
    this.cunitrate = purchasereqslipitemDTO.cunitrate;
    this.cutotalamount = purchasereqslipitemDTO.cutotalamount;


    this.cptcode = purchasereqslipitemDTO.cptcode;
    this.cptname = purchasereqslipitemDTO.cptname;
    this.cptdescrip = purchasereqslipitemDTO.cptdescrip;
    this.cptqunty = purchasereqslipitemDTO.cptqunty;
    this.cptuom = purchasereqslipitemDTO.cptuom;
    this.cptunitrate = purchasereqslipitemDTO.cptunitrate;
    this.cpttotalamount = purchasereqslipitemDTO.cpttotalamount;


    this.prtcode = purchasereqslipitemDTO.prtcode;
    this.prtmname = purchasereqslipitemDTO.prtmname;
    this.prtdescrip = purchasereqslipitemDTO.prtdescrip;
    this.prtqunty = purchasereqslipitemDTO.prtqunty;
    this.prtuom = purchasereqslipitemDTO.prtuom;
    this.prtunitrate = purchasereqslipitemDTO.prtunitrate;
    this.prttotalamount = purchasereqslipitemDTO.prttotalamount;



    this.insertUser = purchasereqslipitemDTO.insertUser;
    this.insertDatetime = purchasereqslipitemDTO.insertDatetime;
    this.updatedUser = purchasereqslipitemDTO.updatedUser;
    this.updatedDatetime = purchasereqslipitemDTO.updatedDatetime;


  }
}
