import { AssessmentCriteriaDTO } from "src/dto/assessmentCriteria.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supplierassessment001wb } from "./Supplierassessment001wb";

@Entity("assessmentcriteria001mb", { schema: "trims" })
export class Assessmentcriteria001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "criteria", length: 40 })
  criteria: string;

  @Column("varchar", { name: "details", length: 250 })
  details: string;

  @Column("int", { name: "max" })
  max: number;

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
    () => Supplierassessment001wb,
    (supplierassessment001wb) => supplierassessment001wb.assessSlno2
  )
  supplierassessment001wbs: Supplierassessment001wb[];

  setProperties(assessmentCriteriaDTO: AssessmentCriteriaDTO) {
    this.slNo = assessmentCriteriaDTO.slNo;
    this.unitslno = assessmentCriteriaDTO.unitslno;
    this.criteria = assessmentCriteriaDTO.criteria;
    this.details = assessmentCriteriaDTO.details;
    this.max = assessmentCriteriaDTO.max;
    this.status = assessmentCriteriaDTO.status;
    this.insertUser = assessmentCriteriaDTO.insertUser;
    this.insertDatetime = assessmentCriteriaDTO.insertDatetime;
    this.updatedUser = assessmentCriteriaDTO.updatedUser;
    this.updatedDatetime = assessmentCriteriaDTO.updatedDatetime;
  }
}
