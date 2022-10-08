
import { ProdDTO } from "src/dto/Prod.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("prod001mb", { schema: "trims" })
export class Prod001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "proddno", length: 50 })
  proddno: string;

  @Column("varchar", { name: "proddname", length: 250 })
  proddname: string;

  @Column("varchar", { name: "catno", length: 250 })
  catno: string;

  @Column("varchar", { name: "drawingno", length: 250 })
  drawingno: string;

  @Column("varchar", { name: "cusdetails", length: 250 })
  cusdetails: string;

  @Column("varchar", { name: "remarks", length: 250 })
  remarks: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  setProperties(prodDTO: ProdDTO) {

        this.slNo=prodDTO.slNo;
        this.unitslno=prodDTO.unitslno;
        this.proddno=prodDTO.proddno;
        this.proddname=prodDTO.proddname;
        this.catno=prodDTO.catno;
        this.drawingno=prodDTO.drawingno;
        this.cusdetails=prodDTO.cusdetails;
        this.remarks=prodDTO.remarks;
        this.insertUser = prodDTO.insertUser;
        this.insertDatetime = prodDTO.insertDatetime;
        this.updatedUser = prodDTO.updatedUser;
        this.updatedDatetime = prodDTO.updatedDatetime;
    
    
    }
}