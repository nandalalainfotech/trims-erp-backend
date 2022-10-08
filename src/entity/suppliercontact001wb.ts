import { SupplierContactDTO } from "src/dto/Suppliercontact.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Supplierregistration001mb } from "./Supplierregistration001mb";

@Index("suppliersl_no", ["supplierslNo"], {})
@Entity("suppliercontact001wb", { schema: "trims" })
export class Suppliercontact001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "suppliersl_no", nullable: true })
  supplierslNo: number | null;

  @Column("varchar", { name: "pname", length: 200 })
  pname: string;

  @Column("varchar", { name: "designation", length: 200 })
  designation: string;

  @Column("varchar", { name: "department", length: 200 })
  department: string;

  @Column("varchar", { name: "level", length: 200 })
  level: string;

  @Column("varchar", { name: "mnumber",  length: 10})
  mnumber: string;

  @Column("varchar", { name: "altmnumber",  length: 15 })
  altmnumber: string;

  @Column("varchar", { name: "mailid", length: 200 })
  mailid: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Supplierregistration001mb,
    (supplierregistration001mb) =>
      supplierregistration001mb.suppliercontact001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "suppliersl_no", referencedColumnName: "slNo" }])
  supplierslNo2: Supplierregistration001mb;
 
  
  setProperties(suppliercontactDTO: SupplierContactDTO) {
    this.slNo = suppliercontactDTO.slNo;
    this.unitslno = suppliercontactDTO.unitslno;
    this.supplierslNo = suppliercontactDTO.supplierslNo;
    this.pname = suppliercontactDTO.pname;
    this.designation = suppliercontactDTO.designation;
    this.department = suppliercontactDTO.department;
    this.level = suppliercontactDTO.level;
    this.mnumber = suppliercontactDTO.mnumber;
    this.altmnumber = suppliercontactDTO.altmnumber;
    this.mailid = suppliercontactDTO.mailid;
    this.insertUser = suppliercontactDTO.insertUser;
    this.insertDatetime = suppliercontactDTO.insertDatetime;
    this.updatedUser = suppliercontactDTO.updatedUser;
    this.updatedDatetime = suppliercontactDTO.updatedDatetime;
  }
}
