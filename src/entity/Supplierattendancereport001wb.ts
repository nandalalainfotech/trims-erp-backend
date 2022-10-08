import { SupplierattendancereportDTO } from "src/dto/Supplierattendancereport.dto";
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
@Entity("supplierattendancereport001wb", { schema: "trims" })
export class Supplierattendancereport001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "supregsl_no" })
  supregslNo: number;

  @Column("int", { name: "trainingsl_no" })
  trainingslNo: number;

  @Column("varchar", { name: "trainer_name", length: 150 })
  trainerName: string;

  @Column("varchar", { name: "trainee_name", length: 150 })
  traineeName: string;

  @Column("varchar", { name: "trainee_role", length: 150 })
  traineeRole: string;

  @Column("char", { name: "attendancestatus", length: 1 })
  attendancestatus: string;

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
      supplierregistration001mb.supplierattendancereport001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "supregsl_no", referencedColumnName: "slNo" }])
  supregslNo2: Supplierregistration001mb;

  @ManyToOne(
    () => Trainingplan001mb,
    (trainingplan001mb) => trainingplan001mb.supplierattendancereport001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "trainingsl_no", referencedColumnName: "slNo" }])
  trainingslNo2: Trainingplan001mb;

  setProperties(supplierattendancereportDTO: SupplierattendancereportDTO) {
    this.slNo = supplierattendancereportDTO.slNo;
    this.unitslno = supplierattendancereportDTO.unitslno;
    this.supregslNo = supplierattendancereportDTO.supregslNo;
    this.trainingslNo = supplierattendancereportDTO.trainingslNo;
    this.trainerName = supplierattendancereportDTO.trainerName;
    this.traineeName = supplierattendancereportDTO.traineeName;
    this.traineeRole = supplierattendancereportDTO.traineeRole;
    this.attendancestatus = supplierattendancereportDTO.attendancestatus;
    this.date = new Date( supplierattendancereportDTO.date);
    this.insertUser = supplierattendancereportDTO.insertUser;
    this.insertDatetime = supplierattendancereportDTO.insertDatetime;
    this.updatedUser = supplierattendancereportDTO.updatedUser;
    this.updatedDatetime = supplierattendancereportDTO.updatedDatetime;
}
}
