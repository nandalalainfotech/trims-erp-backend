import { CustomerpomasterDTO } from "src/dto/Customerpomaster.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customerpoitem001wb } from "./Customerpoitem001wb";

@Entity("customerpomaster001mb", { schema: "trims" })
export class Customerpomaster001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "custemercode" })
  custemercode: number;

  @Column("varchar", { name: "custemername", length: 40 })
  custemername: string;

  @Column("varchar", { name: "custemerPONo", length: 200 })
  custemerPONo: string;

  @Column({ name: "poDate", type:"date" })
  poDate: Date;

  @Column({ name: "deliveryDate", type:"date" })
  deliveryDate: Date;

  @Column("varchar", { name: "packing", length: 100 })
  packing: string;

  @Column("varchar", { name: "logistic", length: 50 })
  logistic: string;

  @Column("varchar", { name: "inspection", length: 100 })
  inspection: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(
    () => Customerpoitem001wb,
    (customerpoitem001wb) => customerpoitem001wb.customerpoSlno2
  )
  customerpoitem001wbs: Customerpoitem001wb[];


  setProperties(customerpomasterDTO:  CustomerpomasterDTO) {
    this.slNo = customerpomasterDTO.slNo;
    this.unitslno = customerpomasterDTO.unitslno;
    this.custemername = customerpomasterDTO.custemername;
    this.custemercode = customerpomasterDTO.custemercode
    this.custemerPONo = customerpomasterDTO.custemerPONo;
    this.poDate = new Date(customerpomasterDTO.poDate);
    this.deliveryDate = new Date(customerpomasterDTO.deliveryDate);
    this.packing = customerpomasterDTO.packing;
    this.logistic = customerpomasterDTO.logistic;
    this.inspection = customerpomasterDTO.inspection;
    this.insertUser = customerpomasterDTO.insertUser;
    this.insertDatetime = customerpomasterDTO.insertDatetime;
    this.updatedUser = customerpomasterDTO.updatedUser;
    this.updatedDatetime = customerpomasterDTO.updatedDatetime;
}
}
