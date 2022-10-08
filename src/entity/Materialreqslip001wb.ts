import { MaterialRequisitionSlipDTO } from "src/dto/material-req-slip.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Spares001mb } from "./Spares001mb";

@Index("spare_slno", ["spareSlno"], {})
@Entity("materialreqslip001wb", { schema: "trims" })
export class Materialreqslip001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "spare_slno" })
  spareSlno: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "mrs_no", length: 100 })
  mrsNo: string;

  @Column({ name: "date", type:"date" })
  date: Date;

  @Column("varchar", { name: "requestor_name", length: 50 })
  requestorName: string;

  @Column("varchar", { name: "department", length: 50 })
  department: string;

  @Column("varchar", { name: "description", length: 100 })
  description: string;

  @Column("int", { name: "qty" })
  qty: number;

  @Column("varchar", { name: "remarks", length: 100 })
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
    () => Spares001mb,
    (spares001mb) => spares001mb.materialreqslip001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "spare_slno", referencedColumnName: "slNo" }])
  spareSlno2: Spares001mb;

  setProperties(materialRequisitionDTO: MaterialRequisitionSlipDTO) {
    this.slNo = materialRequisitionDTO.slNo;
    this.unitslno = materialRequisitionDTO.unitslno;
    this.spareSlno = materialRequisitionDTO.spareSlno;
    this.mrsNo = materialRequisitionDTO.mrsNo;
    this.date =new Date( materialRequisitionDTO.date);
    this.requestorName = materialRequisitionDTO.requestorName;
    this.department = materialRequisitionDTO.department;
    this.description = materialRequisitionDTO.description;
    this.qty = materialRequisitionDTO.qty;
    this.remarks = materialRequisitionDTO.remarks;
    this.insertUser = materialRequisitionDTO.insertUser;
    this.insertDatetime = materialRequisitionDTO.insertDatetime;
    this.updatedUser = materialRequisitionDTO.updatedUser;
    this.updatedDatetime = materialRequisitionDTO.updatedDatetime;
  }
}
