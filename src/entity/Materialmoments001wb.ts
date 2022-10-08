import { MaterialmomentsDTO } from "src/dto/Materialmoments.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("materialmoments001wb", { schema: "trims" })
export class Materialmoments001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "itemslno", nullable: true })
  itemslno: number | null;

  @Column("int", { name: "qunty", nullable: true })
  qunty: number | null;

  @Column("varchar", { name: "department", nullable: true, length: 50 })
  department: string | null;

  @Column("varchar", { name: "shift", nullable: true, length: 50 })
  shift: string | null;

  @Column( { name: "date", type:"date" })
  date: Date | null;

  @Column("varchar", { name: "time", nullable: true, length: 50 })
  time: string | null;

  @Column("int", { name: "consumslno", nullable: true })
  consumslno: number | null;

  @Column("int", { name: "cuqunty", nullable: true })
  cuqunty: number | null;

  @Column("varchar", { name: "cudepartment", nullable: true, length: 50 })
  cudepartment: string | null;

  @Column("varchar", { name: "cushift", nullable: true, length: 50 })
  cushift: string | null;

  @Column( { name: "cudate", type:"date" })
  cudate: Date | null;

  @Column("varchar", { name: "cutime", nullable: true, length: 50 })
  cutime: string | null;

  @Column("int", { name: "childslno", nullable: true })
  childslno: number | null;

  @Column("int", { name: "cptqunty", nullable: true })
  cptqunty: number | null;

  @Column("varchar", { name: "cptdepartment", nullable: true, length: 50 })
  cptdepartment: string | null;

  @Column("varchar", { name: "cptshift", nullable: true, length: 50 })
  cptshift: string | null;

  @Column( { name: "cptdate", type:"date" })
  cptdate: Date | null;

  @Column("varchar", { name: "cpttime", nullable: true, length: 50 })
  cpttime: string | null;

  @Column("int", { name: "prtslno", nullable: true })
  prtslno: number | null;

  @Column("int", { name: "prtqunty", nullable: true })
  prtqunty: number | null;

  @Column("varchar", { name: "prtdepartment", nullable: true, length: 50 })
  prtdepartment: string | null;

  @Column("varchar", { name: "prtshift", nullable: true, length: 50 })
  prtshift: string | null;

  @Column( { name: "prtdate", type:"date" })
  prtdate: Date | null;

  @Column("varchar", { name: "prttime", nullable: true, length: 50 })
  prttime: string | null;

  @Column("varchar", { name: "insert_user", nullable: true, length: 40 })
  insertUser: string | null;

  @Column("datetime", { name: "insert_datetime", nullable: true })
  insertDatetime: Date | null;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  setProperties( materialmomentsDTO:  MaterialmomentsDTO) {
    this.slNo = materialmomentsDTO.slNo;
    this.unitslno = materialmomentsDTO.unitslno;
 
    this.itemslno = materialmomentsDTO.itemslno;
    this.childslno = materialmomentsDTO.childslno;
    this.prtslno = materialmomentsDTO.prtslno;
    this.consumslno = materialmomentsDTO.consumslno;
    this.date = new Date( materialmomentsDTO.date);
    this.cudate = new Date( materialmomentsDTO.cptdate);
    this.cptdate = new Date( materialmomentsDTO.prtdate);
    this.prtdate = new Date( materialmomentsDTO.prtdate);
    this.qunty = materialmomentsDTO.qunty;
    this.cuqunty = materialmomentsDTO.cuqunty;
    this.cptqunty = materialmomentsDTO.cptqunty;
    this.prtqunty = materialmomentsDTO.prtqunty;
    this.department = materialmomentsDTO.department;
    this.cudepartment = materialmomentsDTO.cudepartment;
    this.cptdepartment = materialmomentsDTO.cptdepartment;
    this.prtdepartment = materialmomentsDTO.prtdepartment;
    this.time = materialmomentsDTO.time;
    this.cutime = materialmomentsDTO.cutime;
    this.cpttime = materialmomentsDTO.cpttime;
    this.prttime = materialmomentsDTO.prttime;
    this.shift = materialmomentsDTO.shift;
    this.cushift = materialmomentsDTO.cushift;
    this.cptshift = materialmomentsDTO.cptshift;
    this.prtshift = materialmomentsDTO.prtshift;
    this.insertUser = materialmomentsDTO.insertUser;
    this.insertDatetime = materialmomentsDTO.insertDatetime;
    this.updatedUser = materialmomentsDTO.updatedUser;
    this.updatedDatetime = materialmomentsDTO.updatedDatetime;
  }
}
