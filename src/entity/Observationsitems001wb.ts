import { ObservationsitemsDTO } from "src/dto/Observationsitems.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rawmaterialinspection001wb } from "./Rawmaterialinspection001wb";

@Index("observationslno", ["observationslno"], {})
@Entity("observationsitems001wb", { schema: "trims" })
export class Observationsitems001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "observationslno", nullable: true, unsigned: true })
  observationslno: number | null;

  @Column("varchar", { name: "ordernumber", nullable: true, length: 200 })
  ordernumber: string | null;

  @Column("varchar", { name: "orderparameter", nullable: true, length: 200 })
  orderparameter: string | null;

  @Column("varchar", {
    name: "orderspecification",
    nullable: true,
    length: 200,
  })
  orderspecification: string | null;

  @Column("varchar", { name: "orderinspection", nullable: true, length: 200 })
  orderinspection: string | null;

  @Column("varchar", { name: "orderobservartion", nullable: true, length: 200 })
  orderobservartion: string | null;

  @Column("varchar", {
    name: "orderobservartion1",
    nullable: true,
    length: 200,
  })
  orderobservartion1: string | null;

  @Column("varchar", {
    name: "orderobservartion2",
    nullable: true,
    length: 200,
  })
  orderobservartion2: string | null;

  @Column("varchar", {
    name: "orderobservartion3",
    nullable: true,
    length: 200,
  })
  orderobservartion3: string | null;

  @Column("varchar", {
    name: "orderobservartion4",
    nullable: true,
    length: 200,
  })
  orderobservartion4: string | null;

  @Column("varchar", {
    name: "orderobservartion5",
    nullable: true,
    length: 200,
  })
  orderobservartion5: string | null;

  @Column("varchar", {
    name: "orderobservartion6",
    nullable: true,
    length: 200,
  })
  orderobservartion6: string | null;

  @Column("varchar", {
    name: "orderobservartion7",
    nullable: true,
    length: 200,
  })
  orderobservartion7: string | null;

  @Column("varchar", {
    name: "orderobservartion8",
    nullable: true,
    length: 200,
  })
  orderobservartion8: string | null;

  @Column("varchar", {
    name: "orderobservartion9",
    nullable: true,
    length: 200,
  })
  orderobservartion9: string | null;

  @Column("varchar", { name: "consumnumber", nullable: true, length: 200 })
  consumnumber: string | null;

  @Column("varchar", { name: "consumparameter", nullable: true, length: 200 })
  consumparameter: string | null;

  @Column("varchar", {
    name: "consumspecification",
    nullable: true,
    length: 200,
  })
  consumspecification: string | null;

  @Column("varchar", { name: "consuminspection", nullable: true, length: 200 })
  consuminspection: string | null;

  @Column("varchar", {
    name: "consumobservartion",
    nullable: true,
    length: 200,
  })
  consumobservartion: string | null;

  @Column("varchar", {
    name: "consumobservartion1",
    nullable: true,
    length: 200,
  })
  consumobservartion1: string | null;

  @Column("varchar", {
    name: "consumobservartion2",
    nullable: true,
    length: 200,
  })
  consumobservartion2: string | null;

  @Column("varchar", {
    name: "consumobservartion3",
    nullable: true,
    length: 200,
  })
  consumobservartion3: string | null;

  @Column("varchar", {
    name: "consumobservartion4",
    nullable: true,
    length: 200,
  })
  consumobservartion4: string | null;

  @Column("varchar", {
    name: "consumobservartion5",
    nullable: true,
    length: 200,
  })
  consumobservartion5: string | null;

  @Column("varchar", {
    name: "consumobservartion6",
    nullable: true,
    length: 200,
  })
  consumobservartion6: string | null;

  @Column("varchar", {
    name: "consumobservartion7",
    nullable: true,
    length: 200,
  })
  consumobservartion7: string | null;

  @Column("varchar", {
    name: "consumobservartion8",
    nullable: true,
    length: 200,
  })
  consumobservartion8: string | null;

  @Column("varchar", {
    name: "consumobservartion9",
    nullable: true,
    length: 200,
  })
  consumobservartion9: string | null;

  @Column("varchar", { name: "childnumber", nullable: true, length: 200 })
  childnumber: string | null;

  @Column("varchar", { name: "childparameter", nullable: true, length: 200 })
  childparameter: string | null;

  @Column("varchar", {
    name: "childspecification",
    nullable: true,
    length: 200,
  })
  childspecification: string | null;

  @Column("varchar", { name: "childinspection", nullable: true, length: 200 })
  childinspection: string | null;

  @Column("varchar", { name: "childobservartion", nullable: true, length: 200 })
  childobservartion: string | null;

  @Column("varchar", {
    name: "childobservartion1",
    nullable: true,
    length: 200,
  })
  childobservartion1: string | null;

  @Column("varchar", {
    name: "childobservartion2",
    nullable: true,
    length: 200,
  })
  childobservartion2: string | null;

  @Column("varchar", {
    name: "childobservartion3",
    nullable: true,
    length: 200,
  })
  childobservartion3: string | null;

  @Column("varchar", {
    name: "childobservartion4",
    nullable: true,
    length: 200,
  })
  childobservartion4: string | null;

  @Column("varchar", {
    name: "childobservartion5",
    nullable: true,
    length: 200,
  })
  childobservartion5: string | null;

  @Column("varchar", {
    name: "childobservartion6",
    nullable: true,
    length: 200,
  })
  childobservartion6: string | null;

  @Column("varchar", {
    name: "childobservartion7",
    nullable: true,
    length: 200,
  })
  childobservartion7: string | null;

  @Column("varchar", {
    name: "childobservartion8",
    nullable: true,
    length: 200,
  })
  childobservartion8: string | null;

  @Column("varchar", {
    name: "childobservartion9",
    nullable: true,
    length: 200,
  })
  childobservartion9: string | null;

  @Column("varchar", { name: "partnumber", nullable: true, length: 200 })
  partnumber: string | null;

  @Column("varchar", { name: "partparameter", nullable: true, length: 200 })
  partparameter: string | null;

  @Column("varchar", { name: "partspecification", nullable: true, length: 200 })
  partspecification: string | null;

  @Column("varchar", { name: "partinspection", nullable: true, length: 200 })
  partinspection: string | null;

  @Column("varchar", { name: "partobservartion", nullable: true, length: 200 })
  partobservartion: string | null;

  @Column("varchar", { name: "partobservartion1", nullable: true, length: 200 })
  partobservartion1: string | null;

  @Column("varchar", { name: "partobservartion2", nullable: true, length: 200 })
  partobservartion2: string | null;

  @Column("varchar", { name: "partobservartion3", nullable: true, length: 200 })
  partobservartion3: string | null;

  @Column("varchar", { name: "partobservartion4", nullable: true, length: 200 })
  partobservartion4: string | null;

  @Column("varchar", { name: "partobservartion5", nullable: true, length: 200 })
  partobservartion5: string | null;

  @Column("varchar", { name: "partobservartion6", nullable: true, length: 200 })
  partobservartion6: string | null;

  @Column("varchar", { name: "partobservartion7", nullable: true, length: 200 })
  partobservartion7: string | null;

  @Column("varchar", { name: "partobservartion8", nullable: true, length: 200 })
  partobservartion8: string | null;

  @Column("varchar", { name: "partobservartion9", nullable: true, length: 200 })
  partobservartion9: string | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Rawmaterialinspection001wb,
    (rawmaterialinspection001wb) =>
      rawmaterialinspection001wb.observationsitems001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "observationslno", referencedColumnName: "slNo" }])
  observationslno2: Rawmaterialinspection001wb;





  setProperties(observationsitemsDTO: ObservationsitemsDTO) {
    this.slNo = observationsitemsDTO.slNo;
    this.unitslno = observationsitemsDTO.unitslno;
    this.observationslno = observationsitemsDTO.observationslno;
    this.ordernumber = observationsitemsDTO.ordernumber;
    this.consumnumber = observationsitemsDTO.consumnumber;
    this.partnumber = observationsitemsDTO.partnumber;
    this.childnumber = observationsitemsDTO.childnumber;
    this.orderparameter = observationsitemsDTO.orderparameter;
    this.orderspecification = observationsitemsDTO.orderspecification;
    this.orderinspection = observationsitemsDTO.orderinspection;
    this.consumparameter = observationsitemsDTO.consumparameter;
    this.consumspecification = observationsitemsDTO.consumspecification;
    this.consuminspection = observationsitemsDTO.consuminspection;
    this.childparameter = observationsitemsDTO.childparameter;
    this.childspecification = observationsitemsDTO.childspecification;
    this.childinspection = observationsitemsDTO.childinspection;

    this.partobservartion = observationsitemsDTO.partobservartion;
    this.partobservartion1 = observationsitemsDTO.partobservartion1;
    this.partobservartion2 = observationsitemsDTO.partobservartion2;
    this.partobservartion3 = observationsitemsDTO.partobservartion3;
    this.partobservartion4 = observationsitemsDTO.partobservartion4;
    this.partobservartion5 = observationsitemsDTO.partobservartion5;
    this.partobservartion6 = observationsitemsDTO.partobservartion6;
    this.partobservartion7 = observationsitemsDTO.partobservartion7;
    this.partobservartion8 = observationsitemsDTO.partobservartion8;
    this.partobservartion9 = observationsitemsDTO.partobservartion9;

    this.childobservartion = observationsitemsDTO.childobservartion;
    this.childobservartion1 = observationsitemsDTO.childobservartion1;
    this.childobservartion2 = observationsitemsDTO.childobservartion2;
    this.childobservartion3 = observationsitemsDTO.childobservartion3;
    this.childobservartion4 = observationsitemsDTO.childobservartion4;
    this.childobservartion5 = observationsitemsDTO.childobservartion5;
    this.childobservartion6 = observationsitemsDTO.childobservartion6;
    this.childobservartion7 = observationsitemsDTO.childobservartion7;
    this.childobservartion8 = observationsitemsDTO.childobservartion8;
    this.childobservartion9 = observationsitemsDTO.childobservartion9;

    this.consumobservartion = observationsitemsDTO.consumobservartion;
    this.consumobservartion1 = observationsitemsDTO.consumobservartion1;
    this.consumobservartion2 = observationsitemsDTO.consumobservartion2;
    this.consumobservartion3 = observationsitemsDTO.consumobservartion3;
    this.consumobservartion4 = observationsitemsDTO.consumobservartion4;
    this.consumobservartion5 = observationsitemsDTO.consumobservartion5;
    this.consumobservartion6 = observationsitemsDTO.consumobservartion6;
    this.consumobservartion7 = observationsitemsDTO.consumobservartion7;
    this.consumobservartion8 = observationsitemsDTO.consumobservartion8;
    this.consumobservartion9 = observationsitemsDTO.consumobservartion9;

    this.orderobservartion = observationsitemsDTO.orderobservartion;
    this.orderobservartion1 = observationsitemsDTO.orderobservartion1;
    this.orderobservartion2 = observationsitemsDTO.orderobservartion2;
    this.orderobservartion3 = observationsitemsDTO.orderobservartion3;
    this.orderobservartion4 = observationsitemsDTO.orderobservartion4;
    this.orderobservartion5 = observationsitemsDTO.orderobservartion5;
    this.orderobservartion6 = observationsitemsDTO.orderobservartion6;
    this.orderobservartion7 = observationsitemsDTO.orderobservartion7;
    this.orderobservartion8 = observationsitemsDTO.orderobservartion8;
    this.orderobservartion9 = observationsitemsDTO.orderobservartion9;



    this.insertUser = observationsitemsDTO.insertUser;
    this.insertDatetime = observationsitemsDTO.insertDatetime;
    this.updatedUser = observationsitemsDTO.updatedUser;
    this.updatedDatetime = observationsitemsDTO.updatedDatetime;


  }
}
