import { OrderItemwbDTO } from "src/dto/orderitem-wb.dto";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchaseorder001wb } from "./Purchaseorder001wb";

@Index("purchaseslno", ["purchaseslno"], {})
@Entity("orderitem001wb", { schema: "trims" })
export class Orderitem001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no", unsigned: true })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;
  
    @Column("int", { name: "purchaseslno", nullable: true })
  purchaseslno: number | null;

  @Column("int", { name: "itemcode", nullable: true })
  itemcode: number | null;

  @Column("varchar", { name: "itemname", nullable: true, length: 250 })
  itemname: string | null;

  @Column("varchar", { name: "descrip", nullable: true, length: 250 })
  descrip: string | null;

  @Column("varchar", { name: "qunty", nullable: true, length: 250 })
  qunty: string | null;

  @Column("varchar", { name: "uom", nullable: true, length: 250 })
  uom: string | null;

  @Column("varchar", { name: "unitrate", nullable: true, length: 250 })
  unitrate: string | null;

  @Column("int", { name: "totalamount", nullable: true })
  totalamount: number | null;

  @Column("varchar", { name: "hsn", nullable: true, length: 250 })
  hsn: string | null;

  @Column("int", { name: "cucode", nullable: true })
  cucode: number | null;

  @Column("varchar", { name: "cuname", nullable: true, length: 250 })
  cuname: string | null;

  @Column("varchar", { name: "cudescrip", nullable: true, length: 250 })
  cudescrip: string | null;

  @Column("varchar", { name: "cuqunty", nullable: true, length: 250 })
  cuqunty: string | null;

  @Column("varchar", { name: "cuom", nullable: true, length: 250 })
  cuom: string | null;

  @Column("varchar", { name: "cunitrate", nullable: true, length: 250 })
  cunitrate: string | null;

  @Column("int", { name: "cutotalamount", nullable: true })
  cutotalamount: number | null;

  @Column("varchar", { name: "chsn", nullable: true, length: 250 })
  chsn: string | null;

  @Column("int", { name: "cptcode", nullable: true })
  cptcode: number | null;

  @Column("varchar", { name: "cptname", nullable: true, length: 250 })
  cptname: string | null;

  @Column("varchar", { name: "cptdescrip", nullable: true, length: 250 })
  cptdescrip: string | null;

  @Column("varchar", { name: "cptqunty", nullable: true, length: 250 })
  cptqunty: string | null;

  @Column("varchar", { name: "cptuom", nullable: true, length: 250 })
  cptuom: string | null;

  @Column("varchar", { name: "cptunitrate", nullable: true, length: 250 })
  cptunitrate: string | null;

  @Column("int", { name: "cpttotalamount", nullable: true })
  cpttotalamount: number | null;

  @Column("varchar", { name: "cpthsn", nullable: true, length: 250 })
  cpthsn: string | null;

  @Column("int", { name: "prtcode", nullable: true })
  prtcode: number | null;

  @Column("varchar", { name: "prtmname", nullable: true, length: 250 })
  prtmname: string | null;

  @Column("varchar", { name: "prtdescrip", nullable: true, length: 250 })
  prtdescrip: string | null;

  @Column("varchar", { name: "prtqunty", nullable: true, length: 250 })
  prtqunty: string | null;

  @Column("varchar", { name: "prtuom", nullable: true, length: 250 })
  prtuom: string | null;

  @Column("varchar", { name: "prtunitrate", nullable: true, length: 250 })
  prtunitrate: string | null;

  @Column("int", { name: "prttotalamount", nullable: true })
  prttotalamount: number | null;

  @Column("varchar", { name: "prthsn", nullable: true, length: 250 })
  prthsn: string | null;

  @Column("varchar", { name: "insert_user", nullable: true, length: 40 })
  insertUser: string | null;

  @Column("datetime", { name: "insert_datetime", nullable: true })
  insertDatetime: Date | null;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Purchaseorder001wb,
    (purchaseorder001wb) => purchaseorder001wb.orderitem001wbs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "purchaseslno", referencedColumnName: "slNo" }])
  purchaseslno2: Purchaseorder001wb;

    

  setProperties(orderItemwbDTO: OrderItemwbDTO) {
    this.slNo=orderItemwbDTO.slNo;
    this.unitslno=orderItemwbDTO.unitslno;
        this.purchaseslno = orderItemwbDTO.purchaseslno;
        this.itemcode=orderItemwbDTO.itemcode;
        this.itemname=orderItemwbDTO.itemname;
        this.descrip=orderItemwbDTO.descrip;
        this.qunty=orderItemwbDTO.qunty;
        this.uom=orderItemwbDTO.uom;
        this.unitrate=orderItemwbDTO.unitrate;
        this.totalamount=orderItemwbDTO.totalamount;
    
        this.hsn = orderItemwbDTO.hsn;
        this.chsn = orderItemwbDTO.chsn;
        this.cpthsn = orderItemwbDTO.cpthsn;
        this.prthsn = orderItemwbDTO.prthsn;

        this.cucode=orderItemwbDTO.cucode;
        this.cuname=orderItemwbDTO.cuname;
        this.cudescrip=orderItemwbDTO.cudescrip;
        this.cuqunty=orderItemwbDTO.cuqunty;
        this.cuom=orderItemwbDTO.cuom;
        this.cunitrate=orderItemwbDTO.cunitrate;
        this.cutotalamount=orderItemwbDTO.cutotalamount;
    
    
        this.cptcode=orderItemwbDTO.cptcode;
        this.cptname=orderItemwbDTO.cptname;
        this.cptdescrip=orderItemwbDTO.cptdescrip;
        this.cptqunty=orderItemwbDTO.cptqunty;
        this.cptuom=orderItemwbDTO.cptuom;
        this.cptunitrate=orderItemwbDTO.cptunitrate;
        this.cpttotalamount=orderItemwbDTO.cpttotalamount;
    
    
        this.prtcode=orderItemwbDTO.prtcode;
        this.prtmname=orderItemwbDTO.prtmname;
        this.prtdescrip=orderItemwbDTO.prtdescrip;
        this.prtqunty=orderItemwbDTO.prtqunty;
        this.prtuom=orderItemwbDTO.prtuom;
        this.prtunitrate=orderItemwbDTO.prtunitrate;
        this.prttotalamount=orderItemwbDTO.prttotalamount;
    
    
    
        this.insertUser = orderItemwbDTO.insertUser;
        this.insertDatetime = orderItemwbDTO.insertDatetime;
        this.updatedUser = orderItemwbDTO.updatedUser;
        this.updatedDatetime = orderItemwbDTO.updatedDatetime;


}

}
