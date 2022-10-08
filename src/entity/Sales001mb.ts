import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sales001mb", { schema: "trims" })
export class Sales001mb {
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

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;
}
