import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { RawmaterialinspectionDTO } from "src/dto/Rawmaterialinspection.dto";
import { Materialinspection001wb } from "./MaterialInspection001wb";
import { Orderitem001mb } from "./Orderitem001mb";
import { Consumble001mb } from "./Consumble001mb";
import { Childpart001mb } from "./ChildPart001mb";
import { Part001mb } from "./Part001mb";
import { Observationsitems001wb } from "./Observationsitems001wb";

@Index("rawmaterialslno", ["rawmaterialslno"], {})
@Index("itemcode", ["itemcode"], {})
@Index("cucode", ["cucode"], {})
@Index("cptcode", ["cptcode"], {})
@Index("prtcode", ["prtcode"], {})
@Entity("rawmaterialinspection001wb", { schema: "trims" })
export class Rawmaterialinspection001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "rawmaterialslno", nullable: true })
  rawmaterialslno: number | null;

  @Column("int", { name: "itemcode", nullable: true })
  itemcode: number | null;

  @Column("varchar", { name: "itemname", nullable: true, length: 250 })
  itemname: string | null;

  @Column("varchar", { name: "descrip", nullable: true, length: 250 })
  descrip: string | null;

  @Column("int", { name: "qunty", nullable: true })
  qunty: number | null;

  @Column("int", { name: "received_qty", nullable: true })
  receivedQty: number | null;

  @Column("int", { name: "accepted_qty", nullable: true })
  acceptedQty: number | null;

  @Column("int", { name: "rejected_qty", nullable: true })
  rejectedQty: number | null;

  @Column("int", { name: "outstanding", nullable: true })
  outstanding: number | null;

  @Column("int", { name: "cucode", nullable: true })
  cucode: number | null;

  @Column("varchar", { name: "cuname", nullable: true, length: 250 })
  cuname: string | null;

  @Column("varchar", { name: "cudescrip", nullable: true, length: 250 })
  cudescrip: string | null;

  @Column("int", { name: "cuqunty", nullable: true })
  cuqunty: number | null;

  @Column("int", { name: "cureceived_qty", nullable: true })
  cureceivedQty: number | null;

  @Column("int", { name: "cuaccepted_qty", nullable: true })
  cuacceptedQty: number | null;

  @Column("int", { name: "curejected_qty", nullable: true })
  curejectedQty: number | null;

  @Column("int", { name: "cuoutstanding", nullable: true })
  cuoutstanding: number | null;

  @Column("int", { name: "cptcode", nullable: true })
  cptcode: number | null;

  @Column("varchar", { name: "cptname", nullable: true, length: 250 })
  cptname: string | null;

  @Column("varchar", { name: "cptdescrip", nullable: true, length: 250 })
  cptdescrip: string | null;

  @Column("int", { name: "cptqunty", nullable: true })
  cptqunty: number | null;

  @Column("int", { name: "cptreceived_qty", nullable: true })
  cptreceivedQty: number | null;

  @Column("int", { name: "cptaccepted_qty", nullable: true })
  cptacceptedQty: number | null;

  @Column("int", { name: "cptrejected_qty", nullable: true })
  cptrejectedQty: number | null;

  @Column("int", { name: "cptoutstanding", nullable: true })
  cptoutstanding: number | null;

  @Column("int", { name: "prtcode", nullable: true })
  prtcode: number | null;

  @Column("varchar", { name: "prtname", nullable: true, length: 250 })
  prtname: string | null;

  @Column("varchar", { name: "prtdescrip", nullable: true, length: 250 })
  prtdescrip: string | null;

  @Column("int", { name: "prtqunty", nullable: true })
  prtqunty: number | null;

  @Column("int", { name: "prtreceived_qty", nullable: true })
  prtreceivedQty: number | null;

  @Column("int", { name: "prtaccepted_qty", nullable: true })
  prtacceptedQty: number | null;

  @Column("int", { name: "prtrejected_qty", nullable: true })
  prtrejectedQty: number | null;

  @Column("int", { name: "prtoutstanding", nullable: true })
  prtoutstanding: number | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Materialinspection001wb,
    (materialinspection001wb) =>
      materialinspection001wb.rawmaterialinspection001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "rawmaterialslno", referencedColumnName: "slNo" }])
  rawmaterialslno2: Materialinspection001wb;

  @ManyToOne(
    () => Orderitem001mb,
    (orderitem001mb) => orderitem001mb.rawmaterialinspection001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "itemcode", referencedColumnName: "slNo" }])
  itemcode2: Orderitem001mb;

  @ManyToOne(
    () => Consumble001mb,
    (consumble001mb) => consumble001mb.rawmaterialinspection001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "cucode", referencedColumnName: "slNo" }])
  cucode2: Consumble001mb;

  @ManyToOne(
    () => Childpart001mb,
    (childpart001mb) => childpart001mb.rawmaterialinspection001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "cptcode", referencedColumnName: "slNo" }])
  cptcode2: Childpart001mb;

  @ManyToOne(
    () => Part001mb,
    (part001mb) => part001mb.rawmaterialinspection001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "prtcode", referencedColumnName: "slNo" }])
  prtcode2: Part001mb;

  @OneToMany(
    () => Observationsitems001wb,
    (observationsitems001wb) => observationsitems001wb.observationslno2
  )
  observationsitems001wbs: Observationsitems001wb[];


  setProperties(rawmaterialinspectionDTO: RawmaterialinspectionDTO) {
    this.slNo = rawmaterialinspectionDTO.slNo;
    this.unitslno = rawmaterialinspectionDTO.unitslno;
    this.rawmaterialslno = rawmaterialinspectionDTO.rawmaterialslno;
    this.itemcode = rawmaterialinspectionDTO.itemcode;
    this.itemname = rawmaterialinspectionDTO.itemname;
    this.descrip = rawmaterialinspectionDTO.descrip;
    this.cucode = rawmaterialinspectionDTO.cucode;
    this.cuname = rawmaterialinspectionDTO.cuname;
    this.cudescrip = rawmaterialinspectionDTO.cudescrip;
    this.cptcode = rawmaterialinspectionDTO.cptcode;
    this.cptname = rawmaterialinspectionDTO.cptname;
    this.cptdescrip = rawmaterialinspectionDTO.cptdescrip;
    this.prtcode = rawmaterialinspectionDTO.prtcode;
    this.prtname = rawmaterialinspectionDTO.prtname;
    this.prtdescrip = rawmaterialinspectionDTO.prtdescrip;

    this.prtqunty = rawmaterialinspectionDTO.prtqunty;
    this.cuqunty = rawmaterialinspectionDTO.cuqunty;
    this.cptqunty = rawmaterialinspectionDTO.cptqunty;
    this.qunty = rawmaterialinspectionDTO.qunty;

    this.cptreceivedQty = rawmaterialinspectionDTO.cptreceivedQty;
    this.cptacceptedQty = rawmaterialinspectionDTO.cptacceptedQty;
    this.cptrejectedQty = rawmaterialinspectionDTO.cptrejectedQty;
    this.cptoutstanding = rawmaterialinspectionDTO.cptoutstanding;
    
    this.prtreceivedQty = rawmaterialinspectionDTO.prtreceivedQty;
    this.prtacceptedQty = rawmaterialinspectionDTO.prtacceptedQty;
    this.prtrejectedQty = rawmaterialinspectionDTO.prtrejectedQty;
    this.prtoutstanding = rawmaterialinspectionDTO.prtoutstanding;

    this.receivedQty = rawmaterialinspectionDTO.receivedQty;
    this.acceptedQty = rawmaterialinspectionDTO.acceptedQty;
    this.rejectedQty = rawmaterialinspectionDTO.rejectedQty;
    this.outstanding = rawmaterialinspectionDTO.outstanding;

    this.cureceivedQty = rawmaterialinspectionDTO.cureceivedQty;
    this.cuacceptedQty = rawmaterialinspectionDTO.cuacceptedQty;
    this.curejectedQty = rawmaterialinspectionDTO.curejectedQty;
    this.cuoutstanding = rawmaterialinspectionDTO.cuoutstanding;

    this.insertUser = rawmaterialinspectionDTO.insertUser;
    this.insertDatetime = rawmaterialinspectionDTO.insertDatetime;
    this.updatedUser = rawmaterialinspectionDTO.updatedUser;
    this.updatedDatetime = rawmaterialinspectionDTO.updatedDatetime;


  }
}
