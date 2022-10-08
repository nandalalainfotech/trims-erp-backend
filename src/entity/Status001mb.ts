import { StatusDTO } from "src/dto/Status.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Breakdown001mb } from "./Breakdown001mb";
import { Checklist001mb } from "./Checklist001mb";
import { Department001mb } from "./Department001mb";
import { Fixture001mb } from "./Fixture001mb";
import { Fixturechecklist001mb } from "./Fixturechecklist001mb";
import { Machine001mb } from "./Machine001mb";
import { Preventiveaction001mb } from "./Preventiveaction001mb";
import { Rootcause001mb } from "./Rootcause001mb";
import { Spares001mb } from "./Spares001mb";
import { Suppliertype001mb } from "./Suppliertype001mb";

@Entity("status001mb", { schema: "trims" })
export class Status001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "code_group" })
  codeGroup: number;

  @Column("varchar", { name: "name", length: 200 })
  name: string;

  @Column("char", { name: "status", length: 5 })
  status: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(() => Breakdown001mb, (breakdown001mb) => breakdown001mb.sslno2)
  breakdown001mbs: Breakdown001mb[];

  @OneToMany(() => Checklist001mb, (checklist001mb) => checklist001mb.sslno2)
  checklist001mbs: Checklist001mb[];


  @OneToMany(() => Department001mb, (department001mb) => department001mb.sslno2)
  department001mbs: Department001mb[];

  @OneToMany(() => Machine001mb, (machine001mb) => machine001mb.sslno2)
  machine001mbs: Machine001mb[];

  @OneToMany(() => Fixture001mb, (fixture001mb) => fixture001mb.sslno2)
  fixture001mb: Fixture001mb[];

  @OneToMany(
    () => Preventiveaction001mb,
    (preventiveaction001mb) => preventiveaction001mb.sslno2
  )
  preventiveaction001mbs: Preventiveaction001mb[];

  @OneToMany(() => Rootcause001mb, (rootcause001mb) => rootcause001mb.sslno2)
  rootcause001mbs: Rootcause001mb[];

  @OneToMany(() => Spares001mb, (spares001mb) => spares001mb.sslno2)
  spares001mbs: Spares001mb[];
  fixturestatus001mbs: any;
  status001mbs: any;
  fixturechecklist001mbs: any;

  @OneToMany(
    () => Suppliertype001mb,
    (suppliertype001mb) => suppliertype001mb.sslno2
  )
  suppliertype001mbs: Suppliertype001mb[];


  setProperties(statusDTO: StatusDTO) {
    this.slNo = statusDTO.slNo;
    this.unitslno = statusDTO.unitslno;
    this.codeGroup = statusDTO.codeGroup;
    this.name = statusDTO.name;
    this.status = statusDTO.status;
    this.insertUser = statusDTO.insertUser;
    this.insertDatetime = statusDTO.insertDatetime;
    this.updatedUser = statusDTO.updatedUser;
    this.updatedDatetime = statusDTO.updatedDatetime;
  }
}
