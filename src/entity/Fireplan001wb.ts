import { FireplanDTO } from "src/dto/fireplan.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("fireplan001wb", { schema: "trims" })
export class Fireplan001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "fire", length: 200 })
  fire: string;

  @Column("varchar", { name: "app", length: 100 })
  app: string;

  @Column("varchar", { name: "loc", length: 100 })
  loc: string;

  @Column({ name: "date", type:"date" })
  date: Date;

  @Column({ name: "date1", type:"date" })
  date1: Date;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;



  
  setProperties(fireplanDTO : FireplanDTO ) {
        
    this.slNo = fireplanDTO.slNo;
    this.unitslno = fireplanDTO.unitslno;
    this.fire = fireplanDTO.fire;
    this.app = fireplanDTO.app;
    this.loc = fireplanDTO.loc;
    this.date =new Date( fireplanDTO.date);
    this.date1 =new Date( fireplanDTO.date1);
    this.insertUser = fireplanDTO.insertUser;
    this.insertDatetime = fireplanDTO.insertDatetime;
    this.updatedUser = fireplanDTO.updatedUser;
    this.updatedDatetime = fireplanDTO.updatedDatetime;

  }
}
