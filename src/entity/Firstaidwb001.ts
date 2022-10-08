import { FirstaidMaterialsDTO } from "src/dto/firstaid-materials.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("firstaidwb001", { schema: "trims" })
export class Firstaidwb001 {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "fabxno" })
  fabxno: number;

  @Column("varchar", { name: "mname", length: 100 })
  mname: string;


  @Column({ name: "date", type:"date" })
  date: Date;


  @Column("varchar", { name: "app", length: 100 })
  app: string;

  @Column("varchar", { name: "loc", length: 100 })
  loc: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;


  setProperties(firstaidMaterialsDTO: FirstaidMaterialsDTO) {
    this.slNo = firstaidMaterialsDTO.slNo;
    this.unitslno = firstaidMaterialsDTO.unitslno;
    this.fabxno = firstaidMaterialsDTO.fabxno;
    this.mname = firstaidMaterialsDTO.mname;
    this.date =new Date( firstaidMaterialsDTO.date);
    this.app = firstaidMaterialsDTO.app;
    this.loc = firstaidMaterialsDTO.loc;
    this.insertUser = firstaidMaterialsDTO.insertUser;
    this.insertDatetime = firstaidMaterialsDTO.insertDatetime;
    this.updatedUser = firstaidMaterialsDTO.updatedUser;
    this.updatedDatetime = firstaidMaterialsDTO.updatedDatetime;
  }
}
