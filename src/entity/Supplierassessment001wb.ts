import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Supplierregistration001mb } from "./Supplierregistration001mb";
import { Assessmentcriteria001mb } from "./Assessmentcriteria001mb";
import { SupplierAssessmentDTO } from "src/dto/supplierAssessment.dto";

@Index("supp_slno", ["suppSlno"], {})
@Index("assess_slno", ["assessSlno"], {})
@Entity("supplierassessment001wb", { schema: "trims" })
export class Supplierassessment001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "supp_slno" })
  suppSlno: number;

  @Column("int", { name: "assess_slno" })
  assessSlno: number;

  @Column("int", { name: "score" })
  score: number;

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
      supplierregistration001mb.supplierassessment001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "supp_slno", referencedColumnName: "slNo" }])
  suppSlno2: Supplierregistration001mb;

  @ManyToOne(
    () => Assessmentcriteria001mb,
    (assessmentcriteria001mb) =>
      assessmentcriteria001mb.supplierassessment001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "assess_slno", referencedColumnName: "slNo" }])
  assessSlno2: Assessmentcriteria001mb;
 


  setProperties(supplierAssessmentDTO: SupplierAssessmentDTO) {
    this.slNo = supplierAssessmentDTO.slNo;
    this.unitslno = supplierAssessmentDTO.unitslno;
    this.suppSlno = supplierAssessmentDTO.suppSlno;
    this.assessSlno = supplierAssessmentDTO.assessSlno;
    this.score = supplierAssessmentDTO.score;
    this.insertUser = supplierAssessmentDTO.insertUser;
    this.insertDatetime = supplierAssessmentDTO.insertDatetime;
    this.updatedUser = supplierAssessmentDTO.updatedUser;
    this.updatedDatetime = supplierAssessmentDTO.updatedDatetime;
}
}
