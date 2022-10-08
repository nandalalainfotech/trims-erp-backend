import { OrderitemSpecificationDTO } from "src/dto/orderitemspecification.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orderitem001mb } from "./Orderitem001mb";

@Index("itemslno", ["itemslno"], {})
@Entity("orderitemspecification001wb", { schema: "trims" })
export class Orderitemspecification001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "itemslno", nullable: true  })
  itemslno: number | null;

  @Column("varchar", { name: "parameter", length: 200 })
  parameter: string;

  @Column("varchar", { name: "specification", length: 200 })
  specification: string;

  @Column("varchar", { name: "inspecmethod", length: 200 })
  inspecmethod: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Orderitem001mb,
    (orderitem001mb) => orderitem001mb.orderitemspecification001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "itemslno", referencedColumnName: "slNo" }])
  itemslno2: Orderitem001mb;


  setProperties(orderitemspecificationDTO: OrderitemSpecificationDTO) {
    this.slNo = orderitemspecificationDTO.slNo;
    this.unitslno = orderitemspecificationDTO.unitslno;
    this.itemslno = orderitemspecificationDTO.itemslno;
    this.parameter = orderitemspecificationDTO.parameter;
    this.specification = orderitemspecificationDTO.specification;
    this.inspecmethod = orderitemspecificationDTO.inspecmethod;
    this.insertUser = orderitemspecificationDTO.insertUser;
    this.insertDatetime = orderitemspecificationDTO.insertDatetime;
    this.updatedUser = orderitemspecificationDTO.updatedUser;
    this.updatedDatetime = orderitemspecificationDTO.updatedDatetime;
  }
}
