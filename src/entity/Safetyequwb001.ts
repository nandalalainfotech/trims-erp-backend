import { SafetyEquipmentsDTO } from "src/dto/safetyequipments.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("safetyequwb001", { schema: "trims" })
export class Safetyequwb001 {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "seNo", length: 200 })
  seNo: string;

  @Column("varchar", { name: "pur", length: 100 })
  pur: string;

  @Column("varchar", { name: "stock", length: 100 })
  stock: string;

  @Column("varchar", { name: "remark", length: 100 })
  remark: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;
  setProperties(safetyEquipmentsDTO: SafetyEquipmentsDTO) {
    this.seNo = safetyEquipmentsDTO.seNo;
    this.unitslno = safetyEquipmentsDTO.unitslno;
    this.pur = safetyEquipmentsDTO.pur;
    this.stock = safetyEquipmentsDTO.stock;
    this.remark = safetyEquipmentsDTO.remark;
    this.insertUser = safetyEquipmentsDTO.insertUser;
    this.insertDatetime = safetyEquipmentsDTO.insertDatetime;
    this.updatedUser = safetyEquipmentsDTO.updatedUser;
    this.updatedDatetime = safetyEquipmentsDTO.updatedDatetime;
  }
}
