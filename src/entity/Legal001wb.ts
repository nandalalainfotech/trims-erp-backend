import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Legal001mb } from "./Legal001mb";
import { File001mb } from "./File001mb";
import { LegalwbDTO } from "src/dto/legal.dto";


@Index("cslno", ["cslno"], {})
@Index("fslno", ["fslno"], {})
@Entity("legal001wb", { schema: "trims" })
export class Legal001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;
  
  @Column("int", { name: "cslno" })
  cslno: number;

  @Column("int", { name: "fslno" })
  fslno: number;

  @Column("int", { name: "cno" })
  cno: number;

  @Column({ name: "date", type:"date" })
  date: Date;

  @Column({ name: "date1", type:"date" })
  date1: Date;

  @Column("varchar", { name: "filename", length: 200 })
  filename: string;

  @Column("varchar", { name: "filepath", length: 50 })
  filepath: string;

  @Column("varchar", { name: "originalfilename", length: 50 })
  originalfilename: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(() => Legal001mb, (legal001mb) => legal001mb.legal001wbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "cslno", referencedColumnName: "slNo" }])
  cslno2: Legal001mb;

  @ManyToOne(() => File001mb, (file001mb) => file001mb.legal001wbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "fslno", referencedColumnName: "slNo" }])
  fslno2: File001mb;






  setProperties(legalwbDTO : LegalwbDTO ) {
        
    this.slNo = legalwbDTO.slNo;
    this.unitslno = legalwbDTO.unitslno;
    this.cslno = legalwbDTO.cslno;
    this.fslno = legalwbDTO.fslno;
    this.cno=legalwbDTO.cno;
    this.date=new Date(legalwbDTO.date);
    this.date1=new Date(legalwbDTO.date1);
    this.filename = legalwbDTO.filename;
    this.filepath = legalwbDTO.filepath;
    this.originalfilename = legalwbDTO.originalfilename;
    this.insertUser = legalwbDTO.insertUser;
    this.insertDatetime = legalwbDTO.insertDatetime;
    this.updatedUser = legalwbDTO.updatedUser;
    this.updatedDatetime = legalwbDTO.updatedDatetime;
}

}
