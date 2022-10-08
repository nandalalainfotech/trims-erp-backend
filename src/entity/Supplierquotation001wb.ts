import { SupplierQuotationDTO } from "src/dto/supplierquotation.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchaseorder001wb } from "./Purchaseorder001wb";
import { Supplierregistration001mb } from "./Supplierregistration001mb";
import { Purchasereqslip001wb } from "./Purchasereqslip001wb";
import { Supplierquotationitems001wb } from "./Supplierquotationitems001wb";

@Index("supplier_slno", ["supplierSlno"], {})
@Index("prsno", ["prsno"], {})
@Entity("supplierquotation001wb", { schema: "trims" })
export class Supplierquotation001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "supplier_slno" })
  supplierSlno: number;

  @Column("varchar", { name: "supliername", length: 150 })
  supliername: string;

  @Column("varchar", { name: "supliertype", length: 150 })
  supliertype: string;

  @Column("varchar", { name: "address", length: 150 })
  address: string;

  @Column("varchar", { name: "quotation_no", length: 150 })
  quotationNo: string;

  @Column({ name: "quotation_date", type:"date" })
  quotationDate: Date;

  @Column({ name: "validity", type:"date" })
  validity: Date;

  @Column("int", { name: "prsno", nullable: true })
  prsno: number | null;

  @Column("int", { name: "person_name", nullable: true })
  personName: number | null;

  @Column("varchar", { name: "desgnation", length: 100 })
  desgnation: string;

  @Column("varchar", { name: "mnumber", length: 10 })
  mnumber: string;

  @Column("varchar", { name: "mobile", length: 15 })
  mobile: string;

  @Column("varchar", { name: "level", length: 30 })
  level: string;

  @Column("varchar", { name: "department", length: 30 })
  department: string;

  @Column("varchar", { name: "mailid", length: 30 })
  mailid: string;

  @Column("int", { name: "tAmount", nullable: true })
  tAmount: number | null;

  @Column("varchar", { name: "tWords", length: 200 })
  tWords: string;

  @Column("varchar", { name: "terms_condition", length: 100 })
  termsCondition: string;

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

  @Column("varchar", { name: "remarks", nullable: true, length: 200 })
  remarks: string | null;

  @Column("varchar", { name: "filename", nullable: true, length: 200 })
  filename: string | null;

  @Column("varchar", { name: "originalfilename", nullable: true, length: 200 })
  originalfilename: string | null;

  @Column("varchar", { name: "filepath", nullable: true, length: 200 })
  filepath: string | null;

  @OneToMany(
    () => Purchaseorder001wb,
    (purchaseorder001wb) => purchaseorder001wb.suplierSlno2
  )
  purchaseorder001wbs: Purchaseorder001wb[];

  @ManyToOne(
    () => Supplierregistration001mb,
    (supplierregistration001mb) =>
      supplierregistration001mb.supplierquotation001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "supplier_slno", referencedColumnName: "slNo" }])
  supplierSlno2: Supplierregistration001mb;

  @ManyToOne(
    () => Purchasereqslip001wb,
    (purchasereqslip001wb) => purchasereqslip001wb.supplierquotation001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "prsno", referencedColumnName: "slNo" }])
  prsno2: Purchasereqslip001wb;

  @OneToMany(
    () => Supplierquotationitems001wb,
    (supplierquotationitems001wb) => supplierquotationitems001wb.suplierslno2
  )
  supplierquotationitems001wbs: Supplierquotationitems001wb[];


  setProperties(supplierQuotationDTO: SupplierQuotationDTO) {
    this.slNo = supplierQuotationDTO.slNo;
    this.unitslno = supplierQuotationDTO.unitslno;
    this.supplierSlno = supplierQuotationDTO.supplierSlno;
    this.supliername = supplierQuotationDTO.supliername;
    this.supliertype = supplierQuotationDTO.supliertype;
    this.quotationNo = supplierQuotationDTO.quotationNo;
    this.address = supplierQuotationDTO.address;
    this.quotationDate = new Date(supplierQuotationDTO.quotationDate);
    this.validity = new Date(supplierQuotationDTO.validity);
    this.personName = supplierQuotationDTO.personName;
    this.desgnation = supplierQuotationDTO.desgnation;
    this.mnumber = supplierQuotationDTO.mnumber;
    this.mobile = supplierQuotationDTO.mobile;
    this.level = supplierQuotationDTO.level;
    this.department = supplierQuotationDTO.department;
    this.mailid = supplierQuotationDTO.mailid;
    this.tAmount = supplierQuotationDTO.tAmount;
    this.tWords = supplierQuotationDTO.tWords;
    this.prsno = supplierQuotationDTO.prsno;
    this.termsCondition = supplierQuotationDTO.termsCondition;

    this.filename = supplierQuotationDTO.filename;
    this.filepath = supplierQuotationDTO.filepath;
    this.originalfilename = supplierQuotationDTO.originalfilename;
    this.insertUser = supplierQuotationDTO.insertUser;
    this.insertDatetime = supplierQuotationDTO.insertDatetime;
    this.updatedUser = supplierQuotationDTO.updatedUser;
    this.updatedDatetime = supplierQuotationDTO.updatedDatetime;
    this.status = supplierQuotationDTO.status;
    this.remarks = supplierQuotationDTO.remarks;
  }
}
