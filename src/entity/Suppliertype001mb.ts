import { SuppliertypeDTO } from "src/dto/Suppliertype.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Status001mb } from "./Status001mb";

@Index("sslno", ["sslno"], {})
@Entity("suppliertype001mb", { schema: "trims" })
export class Suppliertype001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("varchar", { name: "descrip", length: 100 })
  descrip: string;

  @Column("varchar", { name: "order", length: 100 })
  order: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Status001mb,
    (status001mb) => status001mb.suppliertype001mbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Status001mb;

  setProperties(suppliertypeDTO: SuppliertypeDTO) {
    this.slNo = suppliertypeDTO.slNo;
    this.unitslno = suppliertypeDTO.unitslno;
    this.sslno = suppliertypeDTO.sslno;
    this.name = suppliertypeDTO.name;
    this.descrip = suppliertypeDTO.descrip;
    this.order = suppliertypeDTO.order;
    this.insertUser = suppliertypeDTO.insertUser;
    this.insertDatetime = suppliertypeDTO.insertDatetime;
    this.updatedUser = suppliertypeDTO.updatedUser;
    this.updatedDatetime = suppliertypeDTO.updatedDatetime;
}
}
