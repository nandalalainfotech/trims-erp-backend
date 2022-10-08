import { SupplierauditDTO } from "src/dto/supplieraudit.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Supplierregistration001mb } from "./Supplierregistration001mb";

@Index("supregslno", ["supregslno"], {})
@Entity("supplieraudit001wb", { schema: "trims" })
export class Supplieraudit001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "supregslno" })
  supregslno: number;

  @Column("char", { name: "status", length: 1 })
  status: string;

  @Column({ name: "date", type:"date" })
  date: Date;

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
      supplierregistration001mb.supplieraudit001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "supregslno", referencedColumnName: "slNo" }])
  supregslno2: Supplierregistration001mb;

  setProperties(supplierauditDTO: SupplierauditDTO) {
    this.slNo = supplierauditDTO.slNo;
    this.unitslno = supplierauditDTO.unitslno;
    this.supregslno = supplierauditDTO.supregslno;
    this.status = supplierauditDTO.status;
    this.date =new Date( supplierauditDTO.date);
    this.insertUser = supplierauditDTO.insertUser;
    this.insertDatetime = supplierauditDTO.insertDatetime;
    this.updatedUser = supplierauditDTO.updatedUser;
    this.updatedDatetime = supplierauditDTO.updatedDatetime;
  }
}
