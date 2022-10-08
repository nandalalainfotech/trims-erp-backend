import { ChildPartDTO } from "src/dto/Childpart.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Childpartspecification001wb } from "./Childpartspecification001wb";
import { Materialreceiveditem001wb } from "./Materialreceiveditem001wb";
import { Purchasereqitem001wb } from "./Purchasereqitem001wb";
import { Rawmaterialinspection001wb } from "./Rawmaterialinspection001wb";
import { Returnstock001wb } from "./Returnstock001wb";

@Entity("childpart001mb", { schema: "trims" })
export class Childpart001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "cpartno", length: 200 })
  cpartno: string;

  @Column("varchar", { name: "cpartname", length: 200 })
  cpartname: string;

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
    () => Childpartspecification001wb,
    (childpartspecification001wb) => childpartspecification001wb.cprtslno2
  )
  childpartspecification001wbs: Childpartspecification001wb[];

  
  @OneToMany(
    () => Purchasereqitem001wb,
    (purchasereqitem001wb) => purchasereqitem001wb.cptcode2
  )
  purchasereqitem001wbs: Purchasereqitem001wb[];
  
  @OneToMany(
    () => Rawmaterialinspection001wb,
    (rawmaterialinspection001wb) => rawmaterialinspection001wb.cptcode2
  )
  rawmaterialinspection001wbs: Rawmaterialinspection001wb[];

  @OneToMany(
    () => Materialreceiveditem001wb,
    (materialreceiveditem001wb) => materialreceiveditem001wb.cptcode2
  )
  materialreceiveditem001wbs: Materialreceiveditem001wb[];



  setProperties(childPartDTO: ChildPartDTO) {
    this.slNo = childPartDTO.slNo;
    this.unitslno = childPartDTO.unitslno;
    this.cpartno = childPartDTO.cpartno;
    this.cpartname = childPartDTO.cpartname;
    this.splan = childPartDTO.splan;
    this.descrip=childPartDTO.descrip;
    this.unitamount=childPartDTO.unitamount;
    this.uom=childPartDTO.uom;
    this.gst=childPartDTO.gst;
    this.hsn=childPartDTO.hsn;
    this.qunty=childPartDTO.qunty;
    this.location = childPartDTO.location;
    this.mslevel = childPartDTO.mslevel;
    this.orderlevel = childPartDTO.orderlevel;
    this.leadtime = childPartDTO.leadtime;
    this.insertUser = childPartDTO.insertUser;
    this.insertDatetime = childPartDTO.insertDatetime;
    this.updatedUser = childPartDTO.updatedUser;
    this.updatedDatetime = childPartDTO.updatedDatetime;
  }
}
