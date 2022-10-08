import { StatutoryPlanDTO } from "src/dto/statutory.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bank001mb } from "./Bank001mb";

@Index("bslno", ["bslno"], {})
@Entity("statutory001wb", { schema: "trims" })
export class Statutory001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "bslno" })
  bslno: number;

  @Column("varchar", { name: "ecode", length: 50 })
  ecode: string;

  @Column("varchar", { name: "ename", length: 50 })
  ename: string;

  @Column("varchar", { name: "escheckbox", length: 200 })
  escheckbox: string;

  @Column("varchar", { name: "esno", length: 100 })
  esno: string;

  @Column("varchar", { name: "escheme", length: 100 })
  escheme: string;

  @Column({ name: "esstartdate", type:"date" })
  esstartdate: Date;

  @Column({ name: "esenddate", type:"date" })
  esenddate: Date;

  @Column("varchar", { name: "pfcheckbox", length: 200 })
  pfcheckbox: string;

  @Column("varchar", { name: "pfno", length: 100 })
  pfno: string;

  @Column("varchar", { name: "pscheme", length: 100 })
  pscheme: string;

  @Column({ name: "pfstartdate", type:"date" })
  pfstartdate: Date;

  @Column({ name: "pfenddate", type:"date" })
  pfenddate: Date;

  @Column("varchar", { name: "inscheckbox", length: 200 })
  inscheckbox: string;

  @Column("varchar", { name: "insurno", length: 100 })
  insurno: string;

  @Column("varchar", { name: "inscheme", length: 100 })
  inscheme: string;

  @Column({ name: "instartdate", type:"date" })
  instartdate: Date;

  @Column({ name: "insenddate", type:"date" })
  insenddate: Date;

  @Column("varchar", { name: "medicheckbox", length: 200 })
  medicheckbox: string;

  @Column("varchar", { name: "mediclno", length: 100 })
  mediclno: string;

  @Column("varchar", { name: "mscheme", length: 100 })
  mscheme: string;

  @Column({ name: "mstartdate", type:"date" })
  mstartdate: Date;

  @Column({ name: "menddate", type:"date" })
  menddate: Date;

  @Column("varchar", { name: "bankcheckbox", length: 200 })
  bankcheckbox: string;

  @Column("varchar", { name: "acholdername", length: 100 })
  acholdername: string;

  @Column("varchar", { name: "accno", length: 100 })
  accno: string;

  @Column("varchar", { name: "ifsccode", length: 100 })
  ifsccode: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(() => Bank001mb, (bank001mb) => bank001mb.statutory001wbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "bslno", referencedColumnName: "slNo" }])
  bslno2: Bank001mb;

  setProperties(statutoryPlanDTO: StatutoryPlanDTO) {
    this.slNo = statutoryPlanDTO.slNo;
    this.unitslno = statutoryPlanDTO.unitslno;
    this.bslno = statutoryPlanDTO.bslno;
    this.ecode = statutoryPlanDTO.ecode;
    this.ename = statutoryPlanDTO.ename;
    this.escheckbox = statutoryPlanDTO.escheckbox;
    this.inscheckbox = statutoryPlanDTO.inscheckbox;
    this.pfcheckbox = statutoryPlanDTO.pfcheckbox;
    this.esno = statutoryPlanDTO.esno;
    this.pfno = statutoryPlanDTO.pfno;
    this.insurno = statutoryPlanDTO.insurno;
    this.mediclno = statutoryPlanDTO.mediclno;
    this.escheme = statutoryPlanDTO.escheme;
    this.pscheme = statutoryPlanDTO.pscheme;
    this.inscheme = statutoryPlanDTO.inscheme;
    this.mscheme = statutoryPlanDTO.mscheme;
    this.esstartdate =new Date( statutoryPlanDTO.esstartdate);
    this.esenddate = new Date( statutoryPlanDTO.esenddate);
    this.pfstartdate = new Date( statutoryPlanDTO.pfstartdate);
    this.pfenddate = new Date( statutoryPlanDTO.pfenddate);
    this.instartdate =new Date( statutoryPlanDTO.instartdate);
    this.insenddate =new Date( statutoryPlanDTO.insenddate);
    this.medicheckbox = statutoryPlanDTO.medicheckbox;
    this.mstartdate =new Date( statutoryPlanDTO.mstartdate);
    this.menddate =new Date( statutoryPlanDTO.menddate);
    this.bankcheckbox = statutoryPlanDTO.bankcheckbox;
    this.acholdername = statutoryPlanDTO.acholdername;
    this.accno = statutoryPlanDTO.accno;
    this.ifsccode = statutoryPlanDTO.ifsccode;
    this.insertUser = statutoryPlanDTO.insertUser;
    this.insertDatetime = statutoryPlanDTO.insertDatetime;
    this.updatedUser = statutoryPlanDTO.updatedUser;
    this.updatedDatetime = statutoryPlanDTO.updatedDatetime;
  }
}
