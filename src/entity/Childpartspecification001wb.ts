import { ChildpartspecificationDTO } from "src/dto/childpartspecification.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Childpart001mb } from "./ChildPart001mb";

@Index("cprtslno", ["cprtslno"], {})
@Entity("childpartspecification001wb", { schema: "trims" })
export class Childpartspecification001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;
  
  @Column("int", { name: "cprtslno", nullable: true })
  cprtslno: number | null;


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
    () => Childpart001mb,
    (childpart001mb) => childpart001mb.childpartspecification001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "cprtslno", referencedColumnName: "slNo" }])
  cprtslno2: Childpart001mb;


  setProperties(childpartspecificationDTO: ChildpartspecificationDTO) {
    this.slNo = childpartspecificationDTO.slNo;
    this.unitslno = childpartspecificationDTO.unitslno;
    this. cprtslno = childpartspecificationDTO. cprtslno;
    this.parameter = childpartspecificationDTO.parameter;
    this.specification = childpartspecificationDTO.specification;
    this.inspecmethod = childpartspecificationDTO.inspecmethod;
    this.insertUser = childpartspecificationDTO.insertUser;
    this.insertDatetime = childpartspecificationDTO.insertDatetime;
    this.updatedUser = childpartspecificationDTO.updatedUser;
    this.updatedDatetime = childpartspecificationDTO.updatedDatetime;
  }

}
