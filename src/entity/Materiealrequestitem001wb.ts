import { MateriealrequestitemDTO } from "src/dto/Materiealrequestitem.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("materiealrequestitem001wb", { schema: "trims" })
export class Materiealrequestitem001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "itemcode", nullable: true })
  itemcode: number | null;

  @Column("varchar", { name: "itemname", nullable: true, length: 250 })
  itemname: string | null;

  @Column("varchar", { name: "descrip", nullable: true, length: 250 })
  descrip: string | null;

  @Column("int", { name: "qunty", nullable: true })
  qunty: number | null;

  @Column("int", { name: "cucode", nullable: true })
  cucode: number | null;

  @Column("varchar", { name: "cuname", nullable: true, length: 250 })
  cuname: string | null;

  @Column("varchar", { name: "cudescrip", nullable: true, length: 250 })
  cudescrip: string | null;

  @Column("int", { name: "cuqunty", nullable: true })
  cuqunty: number | null;

  @Column("int", { name: "cptcode", nullable: true })
  cptcode: number | null;

  @Column("varchar", { name: "cptname", nullable: true, length: 250 })
  cptname: string | null;

  @Column("varchar", { name: "cptdescrip", nullable: true, length: 250 })
  cptdescrip: string | null;

  @Column("int", { name: "cptqunty", nullable: true })
  cptqunty: number | null;

  @Column("int", { name: "prtcode", nullable: true })
  prtcode: number | null;

  @Column("varchar", { name: "prtname", nullable: true, length: 250 })
  prtname: string | null;

  @Column("varchar", { name: "prtdescrip", nullable: true, length: 250 })
  prtdescrip: string | null;

  @Column("int", { name: "prtqunty", nullable: true })
  prtqunty: number | null;

  @Column("varchar", { name: "insert_user", nullable: true, length: 40 })
  insertUser: string | null;

  @Column("datetime", { name: "insert_datetime", nullable: true })
  insertDatetime: Date | null;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  setProperties(materiealrequestitemDTO:MateriealrequestitemDTO) {
    this.slNo = materiealrequestitemDTO.slNo;
    this.unitslno = materiealrequestitemDTO.unitslno;
    this.itemcode = materiealrequestitemDTO.itemcode
    this.itemname = materiealrequestitemDTO.itemname;
    this.descrip = materiealrequestitemDTO.descrip;
    this.qunty = materiealrequestitemDTO.qunty;
    
    this.cucode = materiealrequestitemDTO.cucode
    this.cuname = materiealrequestitemDTO.cuname;
    this.cudescrip = materiealrequestitemDTO.cudescrip;
    this.cuqunty = materiealrequestitemDTO.cuqunty;

    this.cptcode = materiealrequestitemDTO.cptcode
    this.cptname = materiealrequestitemDTO.cptname;
    this.cptdescrip = materiealrequestitemDTO.cptdescrip;
    this.cptqunty = materiealrequestitemDTO.cptqunty;

    this.prtcode = materiealrequestitemDTO.prtcode
    this.prtname = materiealrequestitemDTO.prtname;
    this.prtdescrip = materiealrequestitemDTO.prtdescrip;
    this.prtqunty = materiealrequestitemDTO.prtqunty;

    this.insertUser = materiealrequestitemDTO.insertUser;
    this.insertDatetime = materiealrequestitemDTO.insertDatetime;
    this.updatedUser = materiealrequestitemDTO.updatedUser;
    this.updatedDatetime = materiealrequestitemDTO.updatedDatetime;


  }
}
