import { SuppliertrainingplanDTO } from "src/dto/Suppliertraningplan.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Supplierregistration001mb } from "./Supplierregistration001mb";
import { Trainingplan001mb } from "./Trainingplan001mb";

@Index("supregsl_no", ["supregslNo"], {})
@Index("trainingsl_no", ["trainingslNo"], {})
@Entity("suppliertrainingplan001wb", { schema: "trims" })
export class Suppliertrainingplan001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "supregsl_no" })
  supregslNo: number;

  @Column("int", { name: "trainingsl_no" })
  trainingslNo: number;

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
      supplierregistration001mb.suppliertrainingplan001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "supregsl_no", referencedColumnName: "slNo" }])
  supregslNo2: Supplierregistration001mb;

  @ManyToOne(
    () => Trainingplan001mb,
    (trainingplan001mb) => trainingplan001mb.suppliertrainingplan001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "trainingsl_no", referencedColumnName: "slNo" }])
  trainingslNo2: Trainingplan001mb;

  setProperties(suppliertrainingplanDTO: SuppliertrainingplanDTO) {
    this.slNo = suppliertrainingplanDTO.slNo;
    this.unitslno = suppliertrainingplanDTO.unitslno;
    this.supregslNo = suppliertrainingplanDTO.supregslNo;
    this.trainingslNo = suppliertrainingplanDTO.trainingslNo;
    this.status = suppliertrainingplanDTO.status;
    this.date = new Date( suppliertrainingplanDTO.date);
    this.insertUser = suppliertrainingplanDTO.insertUser;
    this.insertDatetime = suppliertrainingplanDTO.insertDatetime;
    this.updatedUser = suppliertrainingplanDTO.updatedUser;
    this.updatedDatetime = suppliertrainingplanDTO.updatedDatetime;
  }
}
