import { TrainingplanDTO } from "src/dto/Trainingplan.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supplierattendancereport001wb } from "./Supplierattendancereport001wb";
import { Suppliertrainingplan001wb } from "./Suppliertrainingplan001wb";

@Entity("trainingplan001mb", { schema: "trims" })
export class Trainingplan001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "trainingname", length: 150 })
  trainingname: string;

  @Column("char", { name: "status", length: 1 })
  status: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(
    () => Suppliertrainingplan001wb,
    (suppliertrainingplan001wb) => suppliertrainingplan001wb.trainingslNo2
  )
  suppliertrainingplan001wbs: Suppliertrainingplan001wb[];
  
  @OneToMany(
    () => Supplierattendancereport001wb,
    (supplierattendancereport001wb) =>
      supplierattendancereport001wb.trainingslNo2
  )
  supplierattendancereport001wbs: Supplierattendancereport001wb[];

  setProperties(trainingplanDTO: TrainingplanDTO) {
    this.slNo = trainingplanDTO.slNo;
    this.unitslno = trainingplanDTO.unitslno;
    this.trainingname = trainingplanDTO.trainingname;
    this.status = trainingplanDTO.status;
    this.insertUser = trainingplanDTO.insertUser;
    this.insertDatetime = trainingplanDTO.insertDatetime;
    this.updatedUser = trainingplanDTO.updatedUser;
    this.updatedDatetime = trainingplanDTO.updatedDatetime;
  }
}
