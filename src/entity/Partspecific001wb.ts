import { PartSpecificDTO } from "src/dto/partspecific.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Part001mb } from "./Part001mb";

@Index("partslno", ["partslno"], {})
@Entity("partspecific001wb", { schema: "trims" })
export class Partspecific001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "partslno", nullable: true })
  partslno: number | null;

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

  @ManyToOne(() => Part001mb, (part001mb) => part001mb.partspecific001wbs, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "partslno", referencedColumnName: "slNo" }])
  partslno2: Part001mb;


  setProperties(partSpecificDTO: PartSpecificDTO) {
    this.slNo = partSpecificDTO.slNo;
    this.unitslno = partSpecificDTO.unitslno;
    this.partslno = partSpecificDTO.partslno;
    this.parameter = partSpecificDTO.parameter;
    this.specification = partSpecificDTO.specification;
    this.inspecmethod = partSpecificDTO.inspecmethod;
    this.insertUser = partSpecificDTO.insertUser;
    this.insertDatetime = partSpecificDTO.insertDatetime;
    this.updatedUser = partSpecificDTO.updatedUser;
    this.updatedDatetime = partSpecificDTO.updatedDatetime;
  }

}
