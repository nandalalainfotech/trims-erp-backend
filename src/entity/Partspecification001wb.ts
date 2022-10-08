import { PartspecificationDTO } from "src/dto/Partspecification.dto";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orderitem001mb } from "./Orderitem001mb";
import { Specification001wb } from "./Specification001wb";

@Entity("partspecification001wb", { schema: "trims" })
export class Partspecification001wb {
  @PrimaryGeneratedColumn({ type: "smallint", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "pslno" })
  pslno: number;

  @Column("varchar", { name: "itemname", length: 200 })
  itemname: string;

  @Column("varchar", { name: "splan", length: 200 })
  splan: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToMany(
    () => Specification001wb,
    (specification001wb) => specification001wb.partspecification001wbs
  )
  specification001wbs: Specification001wb[];


  setProperties(partspecificationDTO: PartspecificationDTO) {
    this.slNo = partspecificationDTO.slNo;
    this.unitslno = partspecificationDTO.unitslno;
    this.pslno = partspecificationDTO.pslno;
    this.itemname = partspecificationDTO.itemname;
    this.splan = partspecificationDTO.splan;
    this.insertUser = partspecificationDTO.insertUser;
    this.insertDatetime = partspecificationDTO.insertDatetime;
    this.updatedUser = partspecificationDTO.updatedUser;
    this.updatedDatetime = partspecificationDTO.updatedDatetime;
  }
}
