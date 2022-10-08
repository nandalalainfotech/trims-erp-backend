import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PartitemDTO } from "src/dto/partitem.dto";
import { Part001mb } from "./Part001mb";
import { Salesquotation001wb } from "./SalesQuotation001wb";

@Index("partitemsl_no", ["partitemslNo"], {})
@Index("prtcode", ["prtcode"], {})
@Entity("partitem001wb", { schema: "trims" })
export class Partitem001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("smallint", { name: "partitemsl_no", nullable: true, unsigned: true })
  partitemslNo: number | null;

  @Column("int", { name: "prtcode", nullable: true })
  prtcode: number | null;

  @Column("varchar", { name: "prtmname", nullable: true, length: 250 })
  prtmname: string | null;

  @Column("varchar", { name: "prtdescrip", nullable: true, length: 250 })
  prtdescrip: string | null;

  @Column("varchar", { name: "prtqunty", nullable: true, length: 250 })
  prtqunty: string | null;

  @Column("varchar", { name: "prthsn", nullable: true, length: 250 })
  prthsn: string | null;

  @Column("varchar", { name: "prtuom", nullable: true, length: 250 })
  prtuom: string | null;

  @Column("varchar", { name: "prtunitrate", nullable: true, length: 250 })
  prtunitrate: string | null;

  @Column("int", { name: "prttotalamount", nullable: true })
  prttotalamount: number | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Salesquotation001wb,
    (salesquotation001wb) => salesquotation001wb.partitem001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "partitemsl_no", referencedColumnName: "slNo" }])
  partitemslNo2: Salesquotation001wb;

  @ManyToOne(() => Part001mb, (part001mb) => part001mb.partitem001wbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "prtcode", referencedColumnName: "slNo" }])
  prtcode2: Part001mb;



    setProperties(partitemDTO: PartitemDTO) {
        this.slNo = partitemDTO.slNo;
        this.unitslno = partitemDTO.unitslno;
        this.partitemslNo = partitemDTO.partitemslNo;
        this.prtcode = partitemDTO.prtcode;
        this.prtmname = partitemDTO.prtmname;
        this.prtdescrip = partitemDTO.prtdescrip;
        this.prtqunty = partitemDTO.prtqunty;
        this.prthsn = partitemDTO.prthsn;
        this.prtuom = partitemDTO.prtuom;
        this.prtunitrate = partitemDTO.prtunitrate;
        this.prttotalamount = partitemDTO.prttotalamount;        
        this.insertUser = partitemDTO.insertUser;
        this.insertDatetime = partitemDTO.insertDatetime;
        this.updatedUser = partitemDTO.updatedUser;
        this.updatedDatetime = partitemDTO.updatedDatetime;
      }
  }
  