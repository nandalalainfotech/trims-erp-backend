import { ActivityDTO } from "src/dto/Activity.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Suppchecklist001mb } from "./Suppchecklist001mb";
import { Supplierreport001wb } from "./Supplierreport001wb";

@Entity("activity001mb", { schema: "trims" })
export class Activity001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;
  
  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "activity", length: 200 })
  activity: string;

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
    () => Suppchecklist001mb,
    (suppchecklist001mb) => suppchecklist001mb.activityslNo2
  )
  suppchecklist001mbs: Suppchecklist001mb[];

  @OneToMany(
    () => Supplierreport001wb,
    (supplierreport001wb) => supplierreport001wb.activeslNo2
  )
  supplierreport001wbs: Supplierreport001wb[];

  setProperties(activityDTO: ActivityDTO) {
    this.slNo = activityDTO.slNo;
    this.unitslno = activityDTO.unitslno;
    this.activity = activityDTO.activity;
    this.status = activityDTO.status;
    this.insertUser = activityDTO.insertUser;
    this.insertDatetime = activityDTO.insertDatetime;
    this.updatedUser = activityDTO.updatedUser;
    this.updatedDatetime = activityDTO.updatedDatetime;
}
}
