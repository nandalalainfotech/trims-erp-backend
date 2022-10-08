import { ConsumbleDTO } from "src/dto/comsumble.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consumerspecification001wb } from "./Consumerspecification001wb";
import { Materialreceiveditem001wb } from "./Materialreceiveditem001wb";
import { Purchasereqitem001wb } from "./Purchasereqitem001wb";
import { Rawmaterialinspection001wb } from "./Rawmaterialinspection001wb";
import { Returnstock001wb } from "./Returnstock001wb";

@Entity("consumble001mb", { schema: "trims" })
export class Consumble001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "consmno", length: 200 })
  consmno: string;

  @Column("varchar", { name: "consname", length: 200 })
  consname: string;

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
    () => Consumerspecification001wb,
    (consumerspecification001wb) => consumerspecification001wb.consumslno2
  )
  consumerspecification001wbs: Consumerspecification001wb[];

  @OneToMany(
    () => Purchasereqitem001wb,
    (purchasereqitem001wb) => purchasereqitem001wb.cucode2
  )
  purchasereqitem001wbs: Purchasereqitem001wb[];

  @OneToMany(
    () => Rawmaterialinspection001wb,
    (rawmaterialinspection001wb) => rawmaterialinspection001wb.cucode2
  )
  rawmaterialinspection001wbs: Rawmaterialinspection001wb[];

  @OneToMany(
    () => Materialreceiveditem001wb,
    (materialreceiveditem001wb) => materialreceiveditem001wb.cucode2
  )
  materialreceiveditem001wbs: Materialreceiveditem001wb[];

  @OneToMany(
    () => Returnstock001wb,
    (returnstock001wb) => returnstock001wb.cuordernumber2
  )
  returnstock001wbs: Returnstock001wb[];

  setProperties(consumbleDTO: ConsumbleDTO) {
    this.slNo = consumbleDTO.slNo;
    this.unitslno = consumbleDTO.unitslno;
    this.consmno = consumbleDTO.consmno;
    this.consname = consumbleDTO.consname;
    this.splan = consumbleDTO.splan;
    this.descrip=consumbleDTO.descrip;
    this.unitamount=consumbleDTO.unitamount;
    this.uom=consumbleDTO.uom;
    this.gst=consumbleDTO.gst;
    this.qunty=consumbleDTO.qunty;
    this.hsn = consumbleDTO.hsn;
    this.location = consumbleDTO.location;
    this.mslevel = consumbleDTO.mslevel;
    this.orderlevel = consumbleDTO.orderlevel;
    this.leadtime = consumbleDTO.leadtime;
    this.insertUser = consumbleDTO.insertUser;
    this.insertDatetime = consumbleDTO.insertDatetime;
    this.updatedUser = consumbleDTO.updatedUser;
    this.updatedDatetime = consumbleDTO.updatedDatetime;


  }
}
