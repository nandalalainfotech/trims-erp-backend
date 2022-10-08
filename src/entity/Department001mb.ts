import { DepartmentDTO } from "src/dto/Department.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Status001mb } from "./Status001mb";
import { Unitdeptmaster001mb } from "./Unitdeptmaster001mb";
import { Unitmaster001mb } from "./Unitmaster001mb";
import { User001mb } from "./User001mb";

@Index("sslno", ["sslno"], {})
@Entity("department001mb", { schema: "trims" })
export class Department001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("varchar", { name: "department", length: 50 })
  department: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(() => Status001mb, (status001mb) => status001mb.department001mbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Status001mb;

  @OneToMany(() => User001mb, (user001mb) => user001mb.dpslno2)
  user001mbs: User001mb[];

  @OneToMany(
    () => Unitdeptmaster001mb,
    (unitdeptmaster001mb) => unitdeptmaster001mb.departslNo2
  )
  unitdeptmaster001mbs: Unitdeptmaster001mb[];

  setProperties(departmentDTO: DepartmentDTO) {
    this.slNo = departmentDTO.slNo;
    this.sslno = departmentDTO.sslno;
    this.department = departmentDTO.department;
    this.insertUser = departmentDTO.insertUser;
    this.insertDatetime = departmentDTO.insertDatetime;
    this.updatedUser = departmentDTO.updatedUser;
    this.updatedDatetime = departmentDTO.updatedDatetime;
}
}
