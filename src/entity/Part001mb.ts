import { PartDTO } from "src/dto/Part.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Materialreceiveditem001wb } from "./Materialreceiveditem001wb";
import { Partitem001wb } from "./Partitem001wb";
import { Partspecific001wb } from "./Partspecific001wb";
import { Purchasereqitem001wb } from "./Purchasereqitem001wb";
import { Rawmaterialinspection001wb } from "./Rawmaterialinspection001wb";
import { Returnstock001wb } from "./Returnstock001wb";

@Entity("part001mb", { schema: "trims" })
export class Part001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "partno", length: 200 })
  partno: string;

  @Column("varchar", { name: "partname", length: 200 })
  partname: string;

  @Column("varchar", { name: "splan", length: 200 })
  splan: string;

  @Column("varchar", { name: "descrip", length: 250 })
  descrip: string;

  @Column("varchar", { name: "qunty", length: 250 })
  qunty: string;

  @Column("int", { name: "unitamount" })
  unitamount: number;

  @Column("varchar", { name: "uom", length: 250 })
  uom: string;

  @Column("int", { name: "gst" })
  gst: number;

  @Column("varchar", { name: "hsn", length: 250 })
  hsn: string;

  @Column("varchar", { name: "location", length: 250 })
  location: string;

  @Column("varchar", { name: "mslevel", length: 250 })
  mslevel: string;

  @Column("varchar", { name: "orderlevel", length: 250 })
  orderlevel: string;

  @Column("varchar", { name: "leadtime", length: 250 })
  leadtime: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(
    () => Partspecific001wb,
    (partspecific001wb) => partspecific001wb.partslno2
  )
  partspecific001wbs: Partspecific001wb[];

  @OneToMany(
    () => Purchasereqitem001wb,
    (purchasereqitem001wb) => purchasereqitem001wb.prtcode2
  )
  purchasereqitem001wbs: Purchasereqitem001wb[];

  @OneToMany(
    () => Rawmaterialinspection001wb,
    (rawmaterialinspection001wb) => rawmaterialinspection001wb.prtcode2
  )
  rawmaterialinspection001wbs: Rawmaterialinspection001wb[];

  @OneToMany(
    () => Materialreceiveditem001wb,
    (materialreceiveditem001wb) => materialreceiveditem001wb.prtcode2
  )
  materialreceiveditem001wbs: Materialreceiveditem001wb[];



  @OneToMany(() => Partitem001wb, (partitem001wb) => partitem001wb.prtcode2)
  partitem001wbs: Partitem001wb[];

  setProperties(partDTO: PartDTO) {
    this.slNo = partDTO.slNo;
    this.unitslno = partDTO.unitslno;
    this.partno = partDTO.partno;
    this.partname = partDTO.partname;
    this.hsn = partDTO.hsn;
    this.splan = partDTO.splan;
    this.descrip=partDTO.descrip;
    this.unitamount=partDTO.unitamount;
    this.uom=partDTO.uom;
    this.gst=partDTO.gst;
    this.qunty=partDTO.qunty;
    this.location = partDTO.location;
    this.mslevel = partDTO.mslevel;
    this.orderlevel = partDTO.orderlevel;
    this.leadtime = partDTO.leadtime;
    this.insertUser = partDTO.insertUser;
    this.insertDatetime = partDTO.insertDatetime;
    this.updatedUser = partDTO.updatedUser;
    this.updatedDatetime = partDTO.updatedDatetime;
  }
}