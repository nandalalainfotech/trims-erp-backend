import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Breakdownreg001wb } from "./Breakdownreg001wb";
import { Checklist001mb } from "./Checklist001mb";
import { Dailychecklist001wb } from "./Dailychecklist001wb";
import { Status001mb } from "./Status001mb";
import { Machine001wb } from "./Machine001wb";
import { Preventivechecklist001wb } from "./Preventivechecklist001wb";
import { Preventiveplan001wb } from "./Preventiveplan001wb";
import { Spares001mb } from "./Spares001mb";
import { MachineDTO } from "src/dto/Machine.dto";

@Index("sslno", ["sslno"], {})
@Entity("machine001mb", { schema: "trims" })
export class Machine001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "sslno" })
  sslno: number;

  @Column("varchar", { name: "mcode", length: 50 })
  mcode: string;

  @Column("varchar", { name: "mname", length: 500 })
  mname: string;

  @Column( { name: "year", type:"date" })
  year: Date;

  @Column("varchar", { name: "capacity", length: 100 })
  capacity: string;

  @Column("varchar", { name: "mtype", length: 100 })
  mtype: string;

  @Column("varchar", { name: "make", length: 100 })
  make: string;

  @Column("varchar", { name: "location", length: 100 })
  location: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(
    () => Breakdownreg001wb,
    (breakdownreg001wb) => breakdownreg001wb.mslno2
  )
  breakdownreg001wbs: Breakdownreg001wb[];

  @OneToMany(() => Checklist001mb, (checklist001mb) => checklist001mb.mcslno2)
  checklist001mbs: Checklist001mb[];

  @OneToMany(
    () => Dailychecklist001wb,
    (dailychecklist001wb) => dailychecklist001wb.mslno2
  )
  dailychecklist001wbs: Dailychecklist001wb[];

  @ManyToOne(() => Status001mb, (status001mb) => status001mb.machine001mbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "sslno", referencedColumnName: "slNo" }])
  sslno2: Status001mb;

  @OneToMany(() => Machine001wb, (machine001wb) => machine001wb.mslno2)
  machine001wbs: Machine001wb[];

  @OneToMany(
    () => Preventivechecklist001wb,
    (preventivechecklist001wb) => preventivechecklist001wb.mslno2
  )
  preventivechecklist001wbs: Preventivechecklist001wb[];

  @OneToMany(
    () => Preventiveplan001wb,
    (preventiveplan001wb) => preventiveplan001wb.mslno2
  )
  preventiveplan001wbs: Preventiveplan001wb[];

  @OneToMany(() => Spares001mb, (spares001mb) => spares001mb.msslno2)
  spares001mbs: Spares001mb[];
    mslno2: any;
    status: string;
    date: string | number | Date;
  fixturepreventiveplan001wbs: any;


  setProperties(machineDTO: MachineDTO) {
    this.slNo = machineDTO.slNo;
    this.unitslno = machineDTO.unitslno;
    this.sslno = machineDTO.sslno;
    this.mcode = machineDTO.mcode;
    this.mname = machineDTO.mname;
    this.year = new Date(machineDTO.year);
    this.capacity = machineDTO.capacity;
    this.mtype = machineDTO.mtype;
    this.make = machineDTO.make;
    this.location = machineDTO.location;
    this.insertUser = machineDTO.insertUser;
    this.insertDatetime = machineDTO.insertDatetime;
    this.updatedUser = machineDTO.updatedUser;
    this.updatedDatetime = machineDTO.updatedDatetime;
  }
}
