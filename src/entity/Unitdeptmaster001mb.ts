import { UnitDepartMasterDTO } from "src/dto/unitdepartmaster.dto";
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
import { Unitmaster001mb } from "./Unitmaster001mb";
import { User001mb } from "./User001mb";

@Index("departsl_no", ["departslNo"], {})
@Index("unitsl_no", ["unitslNo"], {})
@Entity("unitdeptmaster001mb", { schema: "trims" })
export class Unitdeptmaster001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "departsl_no" })
  departslNo: number;

  @Column("int", { name: "unitsl_no" })
  unitslNo: number;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Department001mb,
    (department001mb) => department001mb.unitdeptmaster001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "departsl_no", referencedColumnName: "slNo" }])
  departslNo2: Department001mb;

  @ManyToOne(
    () => Unitmaster001mb,
    (unitmaster001mb) => unitmaster001mb.unitdeptmaster001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "unitsl_no", referencedColumnName: "slNo" }])
  unitslNo2: Unitmaster001mb;

  
  setProperties(unitDepartMasterDTO: UnitDepartMasterDTO) {
    this.slNo = unitDepartMasterDTO.slNo;
    this.departslNo = unitDepartMasterDTO.departslNo;
    this.unitslNo = unitDepartMasterDTO.unitslNo;
    this.insertUser = unitDepartMasterDTO.insertUser;
    this.insertDatetime = unitDepartMasterDTO.insertDatetime;
    this.updatedUser = unitDepartMasterDTO.updatedUser;
    this.updatedDatetime = unitDepartMasterDTO.updatedDatetime;
}
}
