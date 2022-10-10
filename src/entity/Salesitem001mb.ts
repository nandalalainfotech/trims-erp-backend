import { SalesItemMbDTO } from "src/dto/SalesItem.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("salesitem001mb", { schema: "trims" })
export class Salesitem001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "procode", length: 250 })
  procode: string;

  @Column("varchar", { name: "proname", length: 250 })
  proname: string;

  @Column("varchar", { name: "prodescrip", length: 250 })
  prodescrip: string;

  @Column("varchar", { name: "proqunty", length: 250 })
  proqunty: string;

  @Column("int", { name: "prounitamount" })
  prounitamount: number;

  @Column("varchar", { name: "prouom", length: 250 })
  prouom: string;

  @Column("int", { name: "progst" })
  progst: number;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

 

  setProperties(salesItemMbDTO: SalesItemMbDTO) {
    this.slNo=salesItemMbDTO.slNo;
    this.unitslno=salesItemMbDTO.unitslno;
    this.procode=salesItemMbDTO.procode;
    this.proname=salesItemMbDTO.proname;
    this.prodescrip=salesItemMbDTO.prodescrip;
    this.prounitamount=salesItemMbDTO.prounitamount;
    this.prouom=salesItemMbDTO.prouom;
    this.progst=salesItemMbDTO.progst;
    this.proqunty=salesItemMbDTO.proqunty;
    this.insertUser = salesItemMbDTO.insertUser;
    this.insertDatetime = salesItemMbDTO.insertDatetime;
    this.updatedUser = salesItemMbDTO.updatedUser;
    this.updatedDatetime = salesItemMbDTO.updatedDatetime;


}
}
