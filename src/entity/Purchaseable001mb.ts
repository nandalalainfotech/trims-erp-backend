import { PurchaseableDTO } from "src/dto/purchaseable.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("purchaseable001mb", { schema: "trims" })
export class Purchaseable001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "purscode", length: 500 })
  purscode: string;

  @Column("varchar", { name: "pursname", length: 500 })
  pursname: string;

  @Column("varchar", { name: "descrip", length: 500 })
  descrip: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;


  setProperties(purchaseableDTO: PurchaseableDTO) {
    this.slNo=purchaseableDTO.slNo;
    this.unitslno=purchaseableDTO.unitslno;
    this.purscode=purchaseableDTO.purscode;
    this.pursname=purchaseableDTO.pursname;
    this.descrip=purchaseableDTO.descrip;
    this.insertUser = purchaseableDTO.insertUser;
    this.insertDatetime = purchaseableDTO.insertDatetime;
    this.updatedUser = purchaseableDTO.updatedUser;
    this.updatedDatetime = purchaseableDTO.updatedDatetime;


}

}
