import { MaterialinspectionDTO } from "src/dto/Materialinspection.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rawmaterialinspection001wb } from "./Rawmaterialinspection001wb";

@Entity("materialinspection001wb", { schema: "trims" })
export class Materialinspection001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "iirno", length: 250 })
  iirno: string;

  @Column({ name: "cdate", type:"date" })
  cdate: Date | null;

  @Column("varchar", { name: "scname", length: 250 })
  scname: string;

  @Column("varchar", { name: "dcno", length: 250 })
  dcno: string;

  @Column("varchar", { name: "refno", length: 250 })
  refno: string;

  @Column({ name: "pdate", type:"date" })
  pdate: Date | null;

  @Column("varchar", { name: "cponumber", length: 250 })
  cponumber: string;

  @Column("varchar", { name: "sponumber", length: 250 })
  sponumber: string;

  @Column("int", { name: "grnumber", nullable: true })
  grnumber: number | null;

  @Column("varchar", { name: "remark", length: 150 })
  remark: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(
    () => Rawmaterialinspection001wb,
    (rawmaterialinspection001wb) => rawmaterialinspection001wb.rawmaterialslno2
  )
  rawmaterialinspection001wbs: Rawmaterialinspection001wb[];


  setProperties(materialinspectionDTO: MaterialinspectionDTO) {
    this.slNo = materialinspectionDTO.slNo;
    this.unitslno = materialinspectionDTO.unitslno;
    this.iirno = materialinspectionDTO.iirno;
    this.cdate =new Date(materialinspectionDTO.cdate);
    this.scname = materialinspectionDTO.scname;
    this.dcno = materialinspectionDTO.dcno;
    this.refno = materialinspectionDTO.refno;
    this.pdate = new Date(materialinspectionDTO.pdate);
    this.cponumber = materialinspectionDTO.cponumber;
    this.sponumber = materialinspectionDTO.sponumber;
    this.grnumber = materialinspectionDTO.grnumber;
    this.remark = materialinspectionDTO.remark;
    this.insertUser = materialinspectionDTO.insertUser;
    this.insertDatetime = materialinspectionDTO.insertDatetime;
    this.updatedUser = materialinspectionDTO.updatedUser;
    this.updatedDatetime = materialinspectionDTO.updatedDatetime;
  }
}
