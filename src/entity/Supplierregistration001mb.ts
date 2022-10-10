import { SupplierRegistrationDTO } from "src/dto/supplier-registration.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Purchaseorder001wb } from "./Purchaseorder001wb";
import { Supplierassessment001wb } from "./Supplierassessment001wb";
import { Supplierattendancereport001wb } from "./Supplierattendancereport001wb";
import { Supplieraudit001wb } from "./Supplieraudit001wb";
import { Suppliercontact001wb } from "./Suppliercontact001wb";
import { Supplierquotation001wb } from "./Supplierquotation001wb";
import { Supplierreport001wb } from "./Supplierreport001wb";
import { Suppliertrainingplan001wb } from "./Suppliertrainingplan001wb";

@Entity("supplierregistration001mb", { schema: "trims" })
export class Supplierregistration001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "supplier_name", length: 40 })
  supplierName: string;

  @Column("varchar", { name: "supplier_code", length: 40 })
  supplierCode: string;

  @Column("varchar", { name: "address", length: 200 })
  address: string;

  @Column("varchar", { name: "contact", length: 40 })
  contact: string;

  @Column("varchar", { name: "gstin", length: 30 })
  gstin: string;

  @Column("varchar", { name: "certification", length: 50 })
  certification: string;

  @Column("varchar", { name: "nature", length: 50 })
  nature: string;

  @Column("varchar", { name: "supcategory", nullable: true, length: 255 })
  supcategory: string | null;

  @Column("varchar", { name: "product_desc", length: 100 })
  productDesc: string;

  @Column("varchar", { name: "reputed_cust", length: 50 })
  reputedCust: string;

  @Column("varchar", { name: "concern", length: 100 })
  concern: string;

  @Column("varchar", { name: "other_Info", length: 100 })
  otherInfo: string;

  @Column("varchar", { name: "ac_name", nullable: true, length: 40 })
  acName: string | null;

  @Column("varchar", { name: "bank_name", nullable: true, length: 100 })
  bankName: string | null;

  @Column("varchar", { name: "branch", nullable: true, length: 100 })
  branch: string | null;

  @Column("varchar", { name: "ac_no", length: 20})
  acNo: string | null;

  @Column("varchar", { name: "ifsc_code", nullable: true, length: 100 })
  ifscCode: string | null;

  @Column("varchar", { name: "filename", nullable: true, length: 100 })
  filename: string | null;

  @Column("varchar", { name: "originalfilename", nullable: true, length: 200 })
  originalfilename: string | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @Column("varchar", { name: "website", nullable: true, length: 250 })
  website: string | null;

  @OneToMany(
    () => Supplierassessment001wb,
    (supplierassessment001wb) => supplierassessment001wb.suppSlno2
  )
  supplierassessment001wbs: Supplierassessment001wb[];

  @OneToMany(
    () => Supplierattendancereport001wb,
    (supplierattendancereport001wb) => supplierattendancereport001wb.supregslNo2
  )
  supplierattendancereport001wbs: Supplierattendancereport001wb[];

  @OneToMany(
    () => Supplieraudit001wb,
    (supplieraudit001wb) => supplieraudit001wb.supregslno2
  )
  supplieraudit001wbs: Supplieraudit001wb[];

  @OneToMany(
    () => Suppliercontact001wb,
    (suppliercontact001wb) => suppliercontact001wb.supplierslNo2
  )
  suppliercontact001wbs: Suppliercontact001wb[];

  @OneToMany(
    () => Supplierquotation001wb,
    (supplierquotation001wb) => supplierquotation001wb.supplierSlno2
  )
  supplierquotation001wbs: Supplierquotation001wb[];

  @OneToMany(
    () => Supplierreport001wb,
    (supplierreport001wb) => supplierreport001wb.supregslNo2
  )
  supplierreport001wbs: Supplierreport001wb[];

  @OneToMany(
    () => Suppliertrainingplan001wb,
    (suppliertrainingplan001wb) => suppliertrainingplan001wb.supregslNo2
  )
  suppliertrainingplan001wbs: Suppliertrainingplan001wb[];

  setProperties(supplierRegistrationDTO: SupplierRegistrationDTO) {
    this.slNo = supplierRegistrationDTO.slNo;
    this.unitslno = supplierRegistrationDTO.unitslno;
    this.supplierName = supplierRegistrationDTO.supplierName;
    this.supplierCode = supplierRegistrationDTO.supplierCode;
    this.address = supplierRegistrationDTO.address;
    this.contact = supplierRegistrationDTO.contact;
    this.gstin = supplierRegistrationDTO.gstin;
    this.certification = supplierRegistrationDTO.certification;
    this.nature = supplierRegistrationDTO.nature;
    this.supcategory = supplierRegistrationDTO.supcategory;
    this.productDesc = supplierRegistrationDTO.productDesc;
    this.reputedCust = supplierRegistrationDTO.reputedCust;
    this.concern = supplierRegistrationDTO.concern;
    this.otherInfo = supplierRegistrationDTO.otherInfo;
   this.website = supplierRegistrationDTO.website;
   this.acName = supplierRegistrationDTO.acName;
   this.bankName = supplierRegistrationDTO.bankName;
   this.branch = supplierRegistrationDTO.branch;
   this.acNo = supplierRegistrationDTO.acNo;
   this.ifscCode = supplierRegistrationDTO.ifscCode;
   this.filename = supplierRegistrationDTO.filename;
   this.originalfilename = supplierRegistrationDTO.originalfilename;
    this.insertUser = supplierRegistrationDTO.insertUser;
    this.insertDatetime = supplierRegistrationDTO.insertDatetime;
    this.updatedUser = supplierRegistrationDTO.updatedUser;
    this.updatedDatetime = supplierRegistrationDTO.updatedDatetime;
}
}
