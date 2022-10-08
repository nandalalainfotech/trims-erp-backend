import { ConsumerspecificationDTO } from "src/dto/consumablespecification.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Consumble001mb } from "./Consumble001mb";

@Index("consumslno", ["consumslno"], {})
@Entity("consumerspecification001wb", { schema: "trims" })
export class Consumerspecification001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "consumslno", nullable: true })
  consumslno: number | null;

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
    () => Consumble001mb,
    (consumble001mb) => consumble001mb.consumerspecification001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "consumslno", referencedColumnName: "slNo" }])
  consumslno2: Consumble001mb;


  setProperties(consumerspecificationDTO: ConsumerspecificationDTO) {
    this.slNo = consumerspecificationDTO.slNo;
    this.unitslno = consumerspecificationDTO.unitslno;
    this.consumslno = consumerspecificationDTO.consumslno;
    this.parameter = consumerspecificationDTO.parameter;
    this.specification = consumerspecificationDTO.specification;
    this.inspecmethod = consumerspecificationDTO.inspecmethod;
    this.insertUser = consumerspecificationDTO.insertUser;
    this.insertDatetime = consumerspecificationDTO.insertDatetime;
    this.updatedUser = consumerspecificationDTO.updatedUser;
    this.updatedDatetime = consumerspecificationDTO.updatedDatetime;
  }

}
