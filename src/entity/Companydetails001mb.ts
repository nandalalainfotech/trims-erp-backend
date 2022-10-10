import { CompanydetailsDTO } from "src/dto/Companydetails.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consignee001mb } from "./Consignee001mb";
import { Purchaseorder001wb } from "./Purchaseorder001wb";

@Entity("companydetails001mb", { schema: "trims" })
export class Companydetails001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "company", length: 150 })
  company: string;

  @Column("varchar", { name: "address1", length: 150 })
  address1: string;

  @Column("varchar", { name: "address2", length: 150 })
  address2: string;

  @Column("varchar", { name: "address3", length: 150 })
  address3: string;

  @Column("varchar", { name: "gst_in", nullable: true, length: 50 })
  gstIn: string | null;

  @Column("varchar", { name: "city", length: 30 })
  city: string;

  @Column("varchar", { name: "state", length: 30 })
  state: string;

  @Column("varchar", { name: "country", length: 30 })
  country: string;

  @Column("int", { name: "pin_code" })
  pinCode: number;

  @Column("varchar", { name: "email_id", length: 30 })
  emailId: string;

  @Column("bigint", { name: "contact_no" })
  contactNo: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(
    () => Consignee001mb,
    (consignee001mb) => consignee001mb.companySlno2
  )
  consignee001mbs: Consignee001mb[];

 

  setProperties(companydetailsDTO: CompanydetailsDTO) {
    this.slNo = companydetailsDTO.slNo;
    this.unitslno = companydetailsDTO.unitslno;
    this.company = companydetailsDTO.company;
    this.address1 = companydetailsDTO.address1;
    this.address2 = companydetailsDTO.address2;
    this.address3 = companydetailsDTO.address3;
    this.gstIn = companydetailsDTO.gstIn;
    this.city = companydetailsDTO.city;
    this.state = companydetailsDTO.state;
    this.country = companydetailsDTO.country;
    this.pinCode = companydetailsDTO.pinCode;
    this.emailId = companydetailsDTO.emailId;
    this.contactNo = companydetailsDTO.contactNo;
    this.insertUser = companydetailsDTO.insertUser;
    this.insertDatetime = companydetailsDTO.insertDatetime;
    this.updatedUser = companydetailsDTO.updatedUser;
    this.updatedDatetime = companydetailsDTO.updatedDatetime;
  }
}
