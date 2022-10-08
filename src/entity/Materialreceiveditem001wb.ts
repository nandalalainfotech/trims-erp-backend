import { MaterialreceiveditemDTO } from "src/dto/materialreceiveditem.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Childpart001mb } from "./ChildPart001mb";
import { Consumble001mb } from "./Consumble001mb";
import { Materialinward001wb } from "./Materialinward001wb";
import { Orderitem001mb } from "./Orderitem001mb";
import { Part001mb } from "./Part001mb";


@Index("material_slno", ["materialSlno"], {})
@Index("itemcode", ["itemcode"], {})
@Index("cucode", ["cucode"], {})
@Index("cptcode", ["cptcode"], {})
@Index("prtcode", ["prtcode"], {})
@Entity("materialreceiveditem001wb", { schema: "trims" })
export class Materialreceiveditem001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "material_slno", nullable: true })
  materialSlno: number | null;

  @Column("int", { name: "itemcode", nullable: true })
  itemcode: number | null;

  @Column("varchar", { name: "itemname", nullable: true, length: 250 })
  itemname: string | null;

  @Column("varchar", { name: "descrip", nullable: true, length: 250 })
  descrip: string | null;

  @Column("int", { name: "qunty", nullable: true })
  qunty: number | null;

  @Column("varchar", { name: "unitrate", nullable: true, length: 250 })
  unitrate: string | null;

  @Column("int", { name: "totalamount", nullable: true })
  totalamount: number | null;

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

  @Column("varchar", { name: "cunitrate", nullable: true, length: 250 })
  cunitrate: string | null;

  @Column("int", { name: "cutotalamount", nullable: true })
  cutotalamount: number | null;

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

  @Column("varchar", { name: "cptunitrate", nullable: true, length: 250 })
  cptunitrate: string | null;

  @Column("int", { name: "cpttotalamount", nullable: true })
  cpttotalamount: number | null;

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

  @Column("varchar", { name: "prtmname", nullable: true, length: 250 })
  prtmname: string | null;

  @Column("varchar", { name: "prtdescrip", nullable: true, length: 250 })
  prtdescrip: string | null;

  @Column("int", { name: "prtqunty", nullable: true })
  prtqunty: number | null;

  @Column("varchar", { name: "prtunitrate", nullable: true, length: 250 })
  prtunitrate: string | null;

  @Column("int", { name: "prttotalamount", nullable: true })
  prttotalamount: number | null;

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
    () => Materialinward001wb,
    (materialinward001wb) => materialinward001wb.materialreceiveditem001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "material_slno", referencedColumnName: "slNo" }])
  materialSlno2: Materialinward001wb;

  @ManyToOne(
    () => Orderitem001mb,
    (orderitem001mb) => orderitem001mb.materialreceiveditem001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "itemcode", referencedColumnName: "slNo" }])
  itemcode2: Orderitem001mb;

  @ManyToOne(
    () => Consumble001mb,
    (consumble001mb) => consumble001mb.materialreceiveditem001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "cucode", referencedColumnName: "slNo" }])
  cucode2: Consumble001mb;

  @ManyToOne(
    () => Childpart001mb,
    (childpart001mb) => childpart001mb.materialreceiveditem001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "cptcode", referencedColumnName: "slNo" }])
  cptcode2: Childpart001mb;

  @ManyToOne(
    () => Part001mb,
    (part001mb) => part001mb.materialreceiveditem001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "prtcode", referencedColumnName: "slNo" }])
  prtcode2: Part001mb;



  setProperties(materialreceiveditemDTO: MaterialreceiveditemDTO) {
    this.slNo = materialreceiveditemDTO.slNo;
    this.unitslno = materialreceiveditemDTO.unitslno;
     this.materialSlno = materialreceiveditemDTO. materialSlno;
    this.itemcode = materialreceiveditemDTO.itemcode;
    this.itemname = materialreceiveditemDTO.itemname;
    this.descrip = materialreceiveditemDTO.descrip;
    this.qunty = materialreceiveditemDTO.qunty;
    this.unitrate = materialreceiveditemDTO.unitrate;
    this.totalamount = materialreceiveditemDTO.totalamount;

    this.receivedQty = materialreceiveditemDTO.receivedQty;
    this.acceptedQty = materialreceiveditemDTO.acceptedQty;
    this.rejectedQty = materialreceiveditemDTO.rejectedQty;
    this.outstanding = materialreceiveditemDTO.outstanding;

    this.cucode = materialreceiveditemDTO.cucode;
    this.cuname = materialreceiveditemDTO.cuname;
    this.cudescrip = materialreceiveditemDTO.cudescrip;
    this.cuqunty = materialreceiveditemDTO.cuqunty;
    this.cunitrate = materialreceiveditemDTO.cunitrate;
    this.cutotalamount = materialreceiveditemDTO.cutotalamount;

    this.cptcode = materialreceiveditemDTO.cptcode;
    this.cptname = materialreceiveditemDTO.cptname;
    this.cptdescrip = materialreceiveditemDTO.cptdescrip;
    this.cptqunty = materialreceiveditemDTO.cptqunty;
    this.cptunitrate = materialreceiveditemDTO.cptunitrate;
    this.cpttotalamount = materialreceiveditemDTO.cpttotalamount;

    this.prtcode = materialreceiveditemDTO.prtcode;
    this.prtmname = materialreceiveditemDTO.prtmname;
    this.prtdescrip = materialreceiveditemDTO.prtdescrip;
    this.prtqunty = materialreceiveditemDTO.prtqunty;
    this.prtunitrate = materialreceiveditemDTO.prtunitrate;

    this.cureceivedQty = materialreceiveditemDTO.cureceivedQty;
    this.cuacceptedQty = materialreceiveditemDTO.cuacceptedQty;
    this.curejectedQty = materialreceiveditemDTO.curejectedQty;
    this.cuoutstanding = materialreceiveditemDTO.cuoutstanding;

    this.cptreceivedQty = materialreceiveditemDTO.cptreceivedQty;
    this.cptacceptedQty = materialreceiveditemDTO.cptacceptedQty;
    this.cptrejectedQty = materialreceiveditemDTO.cptrejectedQty;
    this.cptoutstanding = materialreceiveditemDTO.cptoutstanding;

    this.prttotalamount = materialreceiveditemDTO.prttotalamount;
    this.prtreceivedQty = materialreceiveditemDTO.prtreceivedQty;
    this.prtacceptedQty = materialreceiveditemDTO.prtacceptedQty;
    this.prtrejectedQty = materialreceiveditemDTO.prtrejectedQty;
    this.prtoutstanding = materialreceiveditemDTO.prtoutstanding;

    this.insertUser = materialreceiveditemDTO.insertUser;
    this.insertDatetime = materialreceiveditemDTO.insertDatetime;
    this.updatedUser = materialreceiveditemDTO.updatedUser;
    this.updatedDatetime = materialreceiveditemDTO.updatedDatetime;


  }
}
