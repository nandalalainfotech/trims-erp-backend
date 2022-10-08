import { CustomerConsigneeDTO } from "src/dto/customer-consignee.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Custemerregistration001mb } from "./Custemerregistration001mb";

@Index("consignee_slno", ["consigneeSlno"], {})
@Entity("customerconsignee001mb", { schema: "trims" })
export class Customerconsignee001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "consignee_slno" })
  consigneeSlno: number;

  @Column("varchar", { name: "companyName", length: 150 })
  companyName: string;

  @Column("varchar", { name: "consignee", length: 150 })
  consignee: string;

  @Column("varchar", { name: "address1", nullable: true, length: 150 })
  address1: string | null;

  @Column("varchar", { name: "address2", nullable: true, length: 150 })
  address2: string | null;

  @Column("varchar", { name: "address3", nullable: true, length: 150 })
  address3: string | null;

  @Column("int", { name: "gst_in", nullable: true })
  gstIn: number | null;

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
    () => Custemerregistration001mb,
    (custemerregistration001mb) =>
      custemerregistration001mb.customerconsignee001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "consignee_slno", referencedColumnName: "slNo" }])
  consigneeSlno2: Custemerregistration001mb;

  setProperties(customerConsigneeDTO: CustomerConsigneeDTO) {
    this.slNo = customerConsigneeDTO.slNo;
    this.unitslno = customerConsigneeDTO.unitslno;
    this.consigneeSlno = customerConsigneeDTO.consigneeSlno;
    this.companyName = customerConsigneeDTO.companyName;
    this.consignee = customerConsigneeDTO.consignee;
    this.address1 = customerConsigneeDTO.address1;
    this.address2 = customerConsigneeDTO.address2;
    this.address3 = customerConsigneeDTO.address3;
    this.gstIn = customerConsigneeDTO.gstIn;
    this.city = customerConsigneeDTO.city;
    this.state = customerConsigneeDTO.state;
    this.country = customerConsigneeDTO.country;
    this.pinCode = customerConsigneeDTO.pinCode;
    this.emailId = customerConsigneeDTO.emailId;
    this.contactNo = customerConsigneeDTO.contactNo;
    this.insertUser = customerConsigneeDTO.insertUser;
    this.insertDatetime = customerConsigneeDTO.insertDatetime;
    this.updatedUser = customerConsigneeDTO.updatedUser;
    this.updatedDatetime = customerConsigneeDTO.updatedDatetime;
  }
}
