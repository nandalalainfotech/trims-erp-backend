import { PaymentDTO } from "src/dto/Payment.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("payment001wb", { schema: "trims" })
export class Payment001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column({ name: "date", type:"date" })
  date: Date;

  @Column("int", { name: "tAmount" })
  tAmount: number;

  @Column("int", { name: "paidAmount" })
  paidAmount: number;

  @Column("int", { name: "outAmount" })
  outAmount: number;

  @Column("varchar", { name: "modeofPay", length: 200 })
  modeofPay: string;

  @Column("varchar", { name: "chequeNo", length: 200 })
  chequeNo: string;

  @Column("varchar", { name: "payIdno", length: 200 })
  payIdno: string;

  @Column("varchar", { name: "status", length: 200 })
  status: string;

  @Column({ name: "dueDate", type:"date" })
  dueDate: Date;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;



  setProperties(paymentDTO: PaymentDTO) {
    this.slNo = paymentDTO.slNo;
    this.unitslno = paymentDTO.unitslno;
    this.date =  new Date(paymentDTO.date);
    this.tAmount = paymentDTO.tAmount;
    this.paidAmount = paymentDTO.paidAmount;
    this.outAmount = paymentDTO.outAmount;
    this.modeofPay = paymentDTO.modeofPay;
    this.chequeNo = paymentDTO.chequeNo;
    this.payIdno = paymentDTO.payIdno;
    this.status = paymentDTO.status;
    this.dueDate = new Date(paymentDTO.dueDate);
    this.insertUser = paymentDTO.insertUser;
    this.insertDatetime = paymentDTO.insertDatetime;
    this.updatedUser = paymentDTO.updatedUser;
    this.updatedDatetime = paymentDTO.updatedDatetime;
  }
}
