import { CustemerRegistrationDTO } from "src/dto/custemerRegistration.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customerconsignee001mb } from "./Customerconsignee001mb";
import { Customercontact001wb } from "./customercontact001wb";
import { Salesinvoice001wb } from "./Salesinvoice001wb";
import { Salesquotation001wb } from "./SalesQuotation001wb";


@Entity("custemerregistration001mb", { schema: "trims" })
export class Custemerregistration001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "custemername", length: 40 })
  custemername: string;

  @Column("varchar", { name: "custemercode", length: 40 })
  custemercode: string;

  @Column("varchar", { name: "address", length: 200 })
  address: string;

  @Column("varchar", { name: "gstin", length: 30 })
  gstin: string;

  @Column("varchar", { name: "certification", length: 50 })
  certification: string;

  @Column("varchar", { name: "product_desc", length: 100 })
  productDesc: string;

  @Column("varchar", { name: "reputed_cust", length: 50 })
  reputedCust: string;

  @Column("varchar", { name: "concern", length: 100 })
  concern: string;

  @Column("varchar", { name: "other_Info", length: 100 })
  otherInfo: string;

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
    () => Customerconsignee001mb,
    (customerconsignee001mb) => customerconsignee001mb.consigneeSlno2
  )
  customerconsignee001mbs: Customerconsignee001mb[];

  @OneToMany(
    () => Customercontact001wb,
    (customercontact001wb) => customercontact001wb.customerslNo2
  )
  customercontact001wbs: Customercontact001wb[];

  @OneToMany(
    () => Salesinvoice001wb,
    (salesinvoice001wb) => salesinvoice001wb.custmrSlno2
  )
  salesinvoice001wbs: Salesinvoice001wb[];

  @OneToMany(
    () => Salesquotation001wb,
    (salesquotation001wb) => salesquotation001wb.custmrSlno2
  )
  salesquotation001wbs: Salesquotation001wb[];



  setProperties(custemerRegistrationDTO: CustemerRegistrationDTO) {
    this.slNo = custemerRegistrationDTO.slNo;
    this.unitslno = custemerRegistrationDTO.unitslno;
    this.custemername = custemerRegistrationDTO.custemername;
    this.custemercode = custemerRegistrationDTO.custemercode;
    this.address = custemerRegistrationDTO.address;
    this.gstin = custemerRegistrationDTO.gstin;
    this.certification = custemerRegistrationDTO.certification;
    this.productDesc = custemerRegistrationDTO.productDesc;
    this.reputedCust = custemerRegistrationDTO.reputedCust;
    this.concern = custemerRegistrationDTO.concern;
    this.otherInfo = custemerRegistrationDTO.otherInfo;
    this.website = custemerRegistrationDTO.website;
    this.insertUser = custemerRegistrationDTO.insertUser;
    this.insertDatetime = custemerRegistrationDTO.insertDatetime;
    this.updatedUser = custemerRegistrationDTO.updatedUser;
    this.updatedDatetime = custemerRegistrationDTO.updatedDatetime;
  }
}
