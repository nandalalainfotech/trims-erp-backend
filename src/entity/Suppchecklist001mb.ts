import { SuppChecklistDTO } from "src/dto/Suppchecklist.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Activity001mb } from "./Activity001mb";
import { Supplierreport001wb } from "./Supplierreport001wb";

@Index("activitysl_no", ["activityslNo"], {})
@Entity("suppchecklist001mb", { schema: "trims" })
export class Suppchecklist001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "activitysl_no" })
  activityslNo: number;

  @Column("varchar", { name: "checkpoints_name", length: 250 })
  checkpointsName: string;

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

  @ManyToOne(
    () => Activity001mb,
    (activity001mb) => activity001mb.suppchecklist001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "activitysl_no", referencedColumnName: "slNo" }])
  activityslNo2: Activity001mb;

  @OneToMany(
    () => Supplierreport001wb,
    (supplierreport001wb) => supplierreport001wb.supcheckslNo2
  )
  supplierreport001wbs: Supplierreport001wb[];

  setProperties(suppChecklistDTO: SuppChecklistDTO) {
    this.slNo = suppChecklistDTO.slNo;
    this.unitslno = suppChecklistDTO.unitslno;
    this.activityslNo = suppChecklistDTO.activityslNo;
    this.checkpointsName = suppChecklistDTO.checkpointsName;
    this.status = suppChecklistDTO.status;
    this.insertUser = suppChecklistDTO.insertUser;
    this.insertDatetime = suppChecklistDTO.insertDatetime;
    this.updatedUser = suppChecklistDTO.updatedUser;
    this.updatedDatetime = suppChecklistDTO.updatedDatetime;
  }
}
