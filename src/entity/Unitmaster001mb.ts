import { UnitMasterDTO } from "src/dto/usermaster.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Department001mb } from "./Department001mb";
import { Unitdeptmaster001mb } from "./Unitdeptmaster001mb";
import { User001mb } from "./User001mb";

@Entity("unitmaster001mb", { schema: "trims" })
export class Unitmaster001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("varchar", { name: "unit_name", length: 100 })
  unitName: string;

  @Column("varchar", { name: "unit_describtion", length: 200 })
  unitDescribtion: string;

  @Column("char", { name: "status", length: 1 })
  status: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;


  @OneToMany(
    () => Unitdeptmaster001mb,
    (unitdeptmaster001mb) => unitdeptmaster001mb.unitslNo2
  )
  unitdeptmaster001mbs: Unitdeptmaster001mb[];

  @OneToMany(() => User001mb, (user001mb) => user001mb.unitslno2)
  user001mbs: User001mb[];


  setProperties(unitMasterDTO: UnitMasterDTO) {
    this.slNo = unitMasterDTO.slNo;
    this.unitName = unitMasterDTO.unitName;
    this.status = unitMasterDTO.status;
    this.unitDescribtion = unitMasterDTO.unitDescribtion;
    this.insertUser = unitMasterDTO.insertUser;
    this.insertDatetime = unitMasterDTO.insertDatetime;
    this.updatedUser = unitMasterDTO.updatedUser;
    this.updatedDatetime = unitMasterDTO.updatedDatetime;
}
}
