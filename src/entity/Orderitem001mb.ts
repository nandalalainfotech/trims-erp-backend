import { OrderItemMbDTO } from "src/dto/orderitems.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Materialreceiveditem001wb } from "./Materialreceiveditem001wb";
import { Orderitemspecification001wb } from "./Orderitemspecification001wb";
import { Purchasereqitem001wb } from "./Purchasereqitem001wb";
import { Rawmaterialinspection001wb } from "./Rawmaterialinspection001wb";
import { Returnstock001wb } from "./Returnstock001wb";

@Entity("orderitem001mb", { schema: "trims" })
export class Orderitem001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "itemcode", length: 250 })
  itemcode: string;

  @Column("varchar", { name: "itemname", length: 250 })
  itemname: string;

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
    () => Orderitemspecification001wb,
    (orderitemspecification001wb) => orderitemspecification001wb.itemslno2
  )
  orderitemspecification001wbs: Orderitemspecification001wb[];

  @OneToMany(
    () => Purchasereqitem001wb,
    (purchasereqitem001wb) => purchasereqitem001wb.orderslno2
  )
  purchasereqitem001wbs: Purchasereqitem001wb[];

  @OneToMany(
    () => Rawmaterialinspection001wb,
    (rawmaterialinspection001wb) => rawmaterialinspection001wb.itemcode2
  )
  rawmaterialinspection001wbs: Rawmaterialinspection001wb[];


  @OneToMany(
    () => Materialreceiveditem001wb,
    (materialreceiveditem001wb) => materialreceiveditem001wb.itemcode2
  )
  materialreceiveditem001wbs: Materialreceiveditem001wb[];





  setProperties(orderItemMbDTO: OrderItemMbDTO) {
    this.slNo = orderItemMbDTO.slNo;
    this.unitslno = orderItemMbDTO.unitslno;
    this.itemcode = orderItemMbDTO.itemcode;
    this.itemname = orderItemMbDTO.itemname;
    this.descrip = orderItemMbDTO.descrip;
    this.unitamount = orderItemMbDTO.unitamount;
    this.uom = orderItemMbDTO.uom;
    this.gst = orderItemMbDTO.gst;
    this.hsn = orderItemMbDTO.hsn;
    this.location = orderItemMbDTO.location;
    this.mslevel = orderItemMbDTO.mslevel;
    this.orderlevel = orderItemMbDTO.orderlevel;
    this.leadtime = orderItemMbDTO.leadtime;
    this.qunty = orderItemMbDTO.qunty;
    this.insertUser = orderItemMbDTO.insertUser;
    this.insertDatetime = orderItemMbDTO.insertDatetime;
    this.updatedUser = orderItemMbDTO.updatedUser;
    this.updatedDatetime = orderItemMbDTO.updatedDatetime;


  }
}
