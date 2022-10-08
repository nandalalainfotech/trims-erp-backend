import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchaseorder001wb } from "./Purchaseorder001wb";
import { Materialreceiveditem001wb } from "./Materialreceiveditem001wb";
import { MaterialinwardDTO } from "src/dto/Materialinward.dto";

@Index("purchse_slno", ["purchseSlno"], {})
@Entity("materialinward001wb", { schema: "trims" })
export class Materialinward001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "purchse_slno" })
  purchseSlno: number;

  @Column("datetime", { name: "date" })
  date: Date;

  @Column("varchar", { name: "dc_no", length: 30 })
  dcNo: string;

  @Column("varchar", { name: "invoiceno", length: 100 })
  invoiceno: string;

  @Column({ name: "dc_date", type:"date" })
  dcDate: Date;

  @Column("varchar", { name: "supliername", length: 100 })
  supliername: string;

  @Column("varchar", { name: "grn", length: 100 })
  grn: string;

  @Column("varchar", { name: "vehicleno", length: 100 })
  vehicleno: string;

  @Column("varchar", { name: "drivername", length: 100 })
  drivername: string;

  @Column("varchar", { name: "driverno", length: 10 })
  driverno: string;

  @Column("varchar", { name: "remark", length: 100 })
  remark: string;

  @Column("varchar", { name: "remarks", nullable: true, length: 200 })
  remarks: string | null;

  @Column("varchar", { name: "status", nullable: true, length: 200 })
  status: string | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Purchaseorder001wb,
    (purchaseorder001wb) => purchaseorder001wb.materialinward001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "purchse_slno", referencedColumnName: "slNo" }])
  purchseSlno2: Purchaseorder001wb;

  @OneToMany(
    () => Materialreceiveditem001wb,
    (materialreceiveditem001wb) => materialreceiveditem001wb.materialSlno2
  )
  materialreceiveditem001wbs: Materialreceiveditem001wb[];

  
  setProperties(materialinwardDTO: MaterialinwardDTO) {
    this.slNo = materialinwardDTO.slNo;
    this.unitslno = materialinwardDTO.unitslno;
    this.purchseSlno = materialinwardDTO.purchseSlno;
    this.date = new Date(materialinwardDTO.date);
    this.dcNo = materialinwardDTO.dcNo;
    this.invoiceno = materialinwardDTO.invoiceno;
    this.dcDate = new Date(materialinwardDTO.dcDate);
    this.supliername = materialinwardDTO.supliername;
    this.grn = materialinwardDTO.grn;
    this.vehicleno=materialinwardDTO.vehicleno;
    this.drivername=materialinwardDTO.drivername;
    this.driverno=materialinwardDTO.driverno;
    this.remark=materialinwardDTO.remark;
    this.remarks=materialinwardDTO.remarks;
    this.status = materialinwardDTO.status;
    this.insertUser = materialinwardDTO.insertUser;
    this.insertDatetime = materialinwardDTO.insertDatetime;
    this.updatedUser = materialinwardDTO.updatedUser;
    this.updatedDatetime = materialinwardDTO.updatedDatetime;
  }
}
