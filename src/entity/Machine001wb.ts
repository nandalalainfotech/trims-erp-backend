import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Machine001mb } from "./Machine001mb";
import { Checklist001mb } from "./Checklist001mb";
import { MachineWBDTO } from "src/dto/Machine-wb.dto";

@Index("mslno", ["mslno"], {})
@Index("cpslno", ["cpslno"], {})
@Entity("machine001wb", { schema: "trims" })
export class Machine001wb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "mslno" })
  mslno: number;

  @Column("char", { name: "status", length: 1 })
  status: string;

  @Column("datetime", { name: "date" })
  date: Date;

  @Column("int", { name: "cpslno" })
  cpslno: number;

  @Column("datetime", { name: "checkpointdate" })
  checkpointdate: Date;

  @Column("varchar", { name: "observation", length: 250 })
  observation: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(() => Machine001mb, (machine001mb) => machine001mb.machine001wbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "mslno", referencedColumnName: "slNo" }])
  mslno2: Machine001mb;

  @ManyToOne(
    () => Checklist001mb,
    (checklist001mb) => checklist001mb.machine001wbs,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "cpslno", referencedColumnName: "slNo" }])
  cpslno2: Checklist001mb;

  setProperties(machineWBDTO: MachineWBDTO) {
    this.slNo = machineWBDTO.slNo;
    this.unitslno = machineWBDTO.unitslno;
    this.mslno = machineWBDTO.mslno;
    this.status = machineWBDTO.status;
    this.date = machineWBDTO.date;
    this.cpslno = machineWBDTO.cpslno;
    this.checkpointdate = machineWBDTO.checkpointdate;
    this.observation = machineWBDTO.observation;
    this.insertUser = machineWBDTO.insertUser;
    this.insertDatetime = machineWBDTO.insertDatetime;
    this.updatedUser = machineWBDTO.updatedUser;
    this.updatedDatetime = machineWBDTO.updatedDatetime;
  }
}
