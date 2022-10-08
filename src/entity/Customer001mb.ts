import { CustomerDTO } from "src/dto/Customer.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer001mb", { schema: "trims" })
export class Customer001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "customer_name", length: 200 })
  customerName: string;

  @Column("varchar", { name: "major_product", length: 200 })
  majorProduct: string;

  @Column("varchar", { name: "vendor_code", length: 50 })
  vendorCode: string;

  @Column("varchar", { name: "address", length: 200 })
  address: string;

  @Column("varchar", { name: "gstin", length: 50 })
  gstin: string;

  @Column("bigint", { name: "customer_phone" })
  customerPhone: string;

  @Column("varchar", { name: "customer_email", length: 50 })
  customerEmail: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @Column("varchar", {
    name: "contact_person_name",
    nullable: true,
    length: 255,
  })
  contactPersonName: string | null;
  setProperties(customerDTO: CustomerDTO) {
    this.slNo = customerDTO.slNo
    this.unitslno = customerDTO.unitslno;
    this.customerName = customerDTO.customerName;
    this.majorProduct = customerDTO.majorProduct;
    this.vendorCode = customerDTO.vendorCode;
    this.address = customerDTO.address;
    this.gstin = customerDTO.gstin;
    this.customerPhone = customerDTO.customerPhone;
    this.customerEmail = customerDTO.customerEmail;
    this.contactPersonName = customerDTO.contactPersonName;
    this.insertUser = customerDTO.insertUser;
    this.insertDatetime = customerDTO.insertDatetime;
    this.updatedUser = customerDTO.updatedUser;
    this.updatedDatetime = customerDTO.updatedDatetime;
  }


}
