import { SpecificationDTO } from "src/dto/Specification.dto";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Partspecification001wb } from "./Partspecification001wb";

@Entity("specification001wb", { schema: "trims" })
export class Specification001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

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

  @ManyToMany(
    () => Partspecification001wb,
    (partspecification001wb) => partspecification001wb.specification001wbs
  )
  @JoinTable({
    name: "itemspecification001mb",
    joinColumns: [{ name: "specification001wb", referencedColumnName: "slNo" }],
    inverseJoinColumns: [
      { name: "partspecification001wb", referencedColumnName: "slNo" },
    ],
    schema: "trims",
  })
  partspecification001wbs: Partspecification001wb[];





    setProperties(specificationDTO: SpecificationDTO) {
        this.slNo = specificationDTO.slNo;
        this.unitslno = specificationDTO.unitslno;
        this.parameter = specificationDTO.parameter;
        this.specification = specificationDTO.specification;
        this.inspecmethod = specificationDTO.inspecmethod;
        this.insertUser = specificationDTO.insertUser;
        this.insertDatetime = specificationDTO.insertDatetime;
        this.updatedUser = specificationDTO.updatedUser;
        this.updatedDatetime = specificationDTO.updatedDatetime;
    }
}
  