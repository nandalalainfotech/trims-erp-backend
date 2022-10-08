import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Supplierregistration001mb } from "./Supplierregistration001mb";
import { Activity001mb } from "./Activity001mb";
import { Suppchecklist001mb } from "./Suppchecklist001mb";
import { SupplierreportDTO } from "src/dto/Supplierreport.dto";

@Index("supregsl_no", ["supregslNo"], {})
@Index("activesl_no", ["activeslNo"], {})
@Index("supchecksl_no", ["supcheckslNo"], {})
@Entity("supplierreport001wb", { schema: "trims" })
export class Supplierreport001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "supregsl_no" })
  supregslNo: number;

  @Column("int", { name: "activesl_no" })
  activeslNo: number;

  @Column("int", { name: "supchecksl_no" })
  supcheckslNo: number;

  @Column("varchar", { name: "observation", length: 250 })
  observation: string;

  @Column("int", { name: "audit_score" })
  auditScore: number;

  @Column("int", { name: "NCR_ref" })
  ncrRef: number;

  @Column("varchar", { name: "remarks", length: 250 })
  remarks: string;

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
      supplierregistration001mb.supplierreport001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "supregsl_no", referencedColumnName: "slNo" }])
  supregslNo2: Supplierregistration001mb;

  @ManyToOne(
    () => Activity001mb,
    (activity001mb) => activity001mb.supplierreport001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "activesl_no", referencedColumnName: "slNo" }])
  activeslNo2: Activity001mb;

  @ManyToOne(
    () => Suppchecklist001mb,
    (suppchecklist001mb) => suppchecklist001mb.supplierreport001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "supchecksl_no", referencedColumnName: "slNo" }])
  supcheckslNo2: Suppchecklist001mb;

  setProperties(supplierreportDTO: SupplierreportDTO) {
    this.slNo = supplierreportDTO.slNo;
    this.unitslno = supplierreportDTO.unitslno;
    this.supregslNo = supplierreportDTO.supregslNo;
    this.activeslNo = supplierreportDTO.activeslNo;
    this.supcheckslNo = supplierreportDTO.supcheckslNo;
    this.observation = supplierreportDTO.observation;
    this.auditScore = supplierreportDTO.auditScore;
    this.ncrRef = supplierreportDTO.ncrRef;
    this.remarks = supplierreportDTO.remarks;
    this.insertUser = supplierreportDTO.insertUser;
    this.insertDatetime = supplierreportDTO.insertDatetime;
    this.updatedUser = supplierreportDTO.updatedUser;
    this.updatedDatetime = supplierreportDTO.updatedDatetime;
  }
}
