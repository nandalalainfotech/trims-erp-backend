import { ConsigneeDTO } from "src/dto/Consignee.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Companydetails001mb } from "./Companydetails001mb";
import { Purchaseorder001wb } from "./Purchaseorder001wb";

@Index("company_slno", ["companySlno"], {})
@Entity("consignee001mb", { schema: "trims" })
export class Consignee001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "company_slno" })
  companySlno: number;

  @Column("varchar", { name: "consignee", length: 150 })
  consignee: string;

  @Column("varchar", { name: "address1", nullable: true, length: 150 })
  address1: string | null;

  @Column("varchar", { name: "address2", nullable: true, length: 150 })
  address2: string | null;

  @Column("varchar", { name: "address3", nullable: true, length: 150 })
  address3: string | null;

  @Column("varchar", { name: "gst_in", nullable: true, length: 50 })
  gstIn: string | null;

  @Column("varchar", { name: "city", nullable: true, length: 30 })
  city: string | null;

  @Column("varchar", { name: "state", nullable: true, length: 30 })
  state: string | null;

  @Column("varchar", { name: "country", nullable: true, length: 30 })
  country: string | null;

  @Column("int", { name: "pin_code", nullable: true })
  pinCode: number | null;

  @Column("varchar", { name: "email_id", nullable: true, length: 30 })
  emailId: string | null;

  @Column("bigint", { name: "contact_no", nullable: true })
  contactNo: string | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Companydetails001mb,
    (companydetails001mb) => companydetails001mb.consignee001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "company_slno", referencedColumnName: "slNo" }])
  companySlno2: Companydetails001mb;

 


  setProperties(consigneeDTO: ConsigneeDTO) {
    this.slNo = consigneeDTO.slNo;
    this.unitslno = consigneeDTO.unitslno;
    this.companySlno = consigneeDTO.companySlno;
    this.consignee = consigneeDTO.consignee;
    this.address1 = consigneeDTO.address1;
    this.address2 = consigneeDTO.address2;
    this.address3 = consigneeDTO.address3;
    this.gstIn = consigneeDTO.gstIn;
    this.city = consigneeDTO.city;
    this.state = consigneeDTO.state;
    this.country = consigneeDTO.country;
    this.pinCode = consigneeDTO.pinCode;
    this.emailId = consigneeDTO.emailId;
    this.contactNo = consigneeDTO.contactNo;
    this.insertUser = consigneeDTO.insertUser;
    this.insertDatetime = consigneeDTO.insertDatetime;
    this.updatedUser = consigneeDTO.updatedUser;
    this.updatedDatetime = consigneeDTO.updatedDatetime;
  }

}
