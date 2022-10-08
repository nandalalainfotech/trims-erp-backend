import { SupplierquotationsItemDTO } from "src/dto/supplierQuotationsitem.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Supplierquotation001wb } from "./Supplierquotation001wb";

@Index("suplierslno", ["suplierslno"], {})
@Entity("supplierquotationitems001wb", { schema: "trims" })
export class Supplierquotationitems001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "suplierslno", nullable: true })
  suplierslno: number | null;

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
    () => Supplierquotation001wb,
    (supplierquotation001wb) =>
      supplierquotation001wb.supplierquotationitems001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "suplierslno", referencedColumnName: "slNo" }])
  suplierslno2: Supplierquotation001wb;


  setProperties(supplierquotationsItemDTO: SupplierquotationsItemDTO) {
    this.slNo = supplierquotationsItemDTO.slNo;
    this.unitslno=supplierquotationsItemDTO.unitslno;
    this.suplierslno = supplierquotationsItemDTO.suplierslno;
    this.itemcode = supplierquotationsItemDTO.itemcode;
    this.itemname = supplierquotationsItemDTO.itemname;
    this.descrip = supplierquotationsItemDTO.descrip;
    this.qunty = supplierquotationsItemDTO.qunty;
    this.uom = supplierquotationsItemDTO.uom;
    this.unitrate = supplierquotationsItemDTO.unitrate;
    this.totalamount = supplierquotationsItemDTO.totalamount;


    this.hsn = supplierquotationsItemDTO.hsn;
    this.chsn = supplierquotationsItemDTO.chsn;
    this.cpthsn = supplierquotationsItemDTO.cpthsn;
    this.prthsn = supplierquotationsItemDTO.prthsn;

    this.cucode = supplierquotationsItemDTO.cucode;
    this.cuname = supplierquotationsItemDTO.cuname;
    this.cudescrip = supplierquotationsItemDTO.cudescrip;
    this.cuqunty = supplierquotationsItemDTO.cuqunty;
    this.cuom = supplierquotationsItemDTO.cuom;
    this.cunitrate = supplierquotationsItemDTO.cunitrate;
    this.cutotalamount = supplierquotationsItemDTO.cutotalamount;


    this.cptcode = supplierquotationsItemDTO.cptcode;
    this.cptname = supplierquotationsItemDTO.cptname;
    this.cptdescrip = supplierquotationsItemDTO.cptdescrip;
    this.cptqunty = supplierquotationsItemDTO.cptqunty;
    this.cptuom = supplierquotationsItemDTO.cptuom;
    this.cptunitrate = supplierquotationsItemDTO.cptunitrate;
    this.cpttotalamount = supplierquotationsItemDTO.cpttotalamount;


    this.prtcode = supplierquotationsItemDTO.prtcode;
    this.prtmname = supplierquotationsItemDTO.prtmname;
    this.prtdescrip = supplierquotationsItemDTO.prtdescrip;
    this.prtqunty = supplierquotationsItemDTO.prtqunty;
    this.prtuom = supplierquotationsItemDTO.prtuom;
    this.prtunitrate = supplierquotationsItemDTO.prtunitrate;
    this.prttotalamount = supplierquotationsItemDTO.prttotalamount;



    this.insertUser = supplierquotationsItemDTO.insertUser;
    this.insertDatetime = supplierquotationsItemDTO.insertDatetime;
    this.updatedUser = supplierquotationsItemDTO.updatedUser;
    this.updatedDatetime = supplierquotationsItemDTO.updatedDatetime;


  }
}

