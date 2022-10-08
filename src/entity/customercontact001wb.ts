import { CustomerContactDTO } from "src/dto/customer-contact.dto";
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Custemerregistration001mb } from "./Custemerregistration001mb";
  
  @Index("customersl_no", ["customerslNo"], {})
  @Entity("customercontact001wb", { schema: "trims" })
  export class Customercontact001wb {
    @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
    slNo: number;

    @Column("int", { name: "unitslno" })
  unitslno: number;
  
    @Column("int", { name: "customersl_no", nullable: true })
    customerslNo: number | null;
  
    @Column("varchar", { name: "pname", length: 200 })
    pname: string;
  
    @Column("varchar", { name: "designation", length: 200 })
    designation: string;
  
    @Column("varchar", { name: "department", length: 200 })
    department: string;
  
    @Column("varchar", { name: "level", length: 200 })
    level: string;
  
    @Column("int", { name: "mnumber" })
    mnumber: number;
  
    @Column("int", { name: "altmnumber" })
    altmnumber: number;
  
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
      () => Custemerregistration001mb,
      (custemerregistration001mb) =>
        custemerregistration001mb.customercontact001wbs,
      { onDelete: "CASCADE", onUpdate: "RESTRICT" }
    )
    @JoinColumn([{ name: "customersl_no", referencedColumnName: "slNo" }])
    customerslNo2: Custemerregistration001mb;

    setProperties(customerContactDTO: CustomerContactDTO) {
        this.slNo = customerContactDTO.slNo;
        this.unitslno = customerContactDTO.unitslno;
        this.customerslNo = customerContactDTO.customerslNo;
        this.pname = customerContactDTO.pname;
        this.designation = customerContactDTO.designation;
        this.department = customerContactDTO.department;
        this.level = customerContactDTO.level;
        this.mnumber = customerContactDTO.mnumber;
        this.altmnumber = customerContactDTO.altmnumber;
        this.mailid = customerContactDTO.mailid;
        this.insertUser = customerContactDTO.insertUser;
        this.insertDatetime = customerContactDTO.insertDatetime;
        this.updatedUser = customerContactDTO.updatedUser;
        this.updatedDatetime = customerContactDTO.updatedDatetime;
      }
  }
  