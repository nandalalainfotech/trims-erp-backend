import { EmployeeDetailsDTO } from "src/dto/employeedetails.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Statutory001wb } from "./Statutory001wb";

@Entity("emp001mb", { schema: "trims" })
export class Emp001mb {
 
  @PrimaryGeneratedColumn({ type: "int", name: "sl_no" })
  slNo: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "empcode" })
  empcode: string;

  @Column("varchar", { name: "empname", length: 200 })
  empname: string;

  @Column("varchar", { name: "des", length: 200 })
  des: string;

  @Column("int", { name: "age" })
  age: number;

  @Column({ name: "doj", type:"date" })
  doj: Date;


  @Column({ name: "dob", type:"date" })
  dob: Date;

  @Column("varchar", { name: "fname", length: 200 })
  fname: string;

  @Column("varchar", { name: "bgroup", length: 200 })
  bgroup: string;

  @Column("varchar", { name: "female", length: 200 })
  female: string;

  @Column("varchar", { name: "married", length: 200 })
  married: string;

  @Column("varchar", { name: "child", length: 200 })
  child: string;

  @Column("varchar", { name: "dep", length: 200 })
  dep: string;

  @Column("varchar", { name: "add1", length: 200 })
  add1: string;

  @Column("varchar", { name: "add2", length: 200 })
  add2: string;

  @Column("varchar", { name: "edu", length: 200 })
  edu: string;

  @Column("varchar", { name: "exp", length: 200 })
  exp: string;

  @Column("varchar", { name: "det", length: 200 })
  det: string;

  @Column("varchar", { name: "filename", length: 200 })
  filename: string;
  
  @Column("varchar", { name: "filepath", length: 50 })
  filepath: string;

  @Column("varchar", { name: "originalfilename", length: 50 })
  originalfilename: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;
    sl_no: number;
  


  setProperties(employeeDetailsDTO: EmployeeDetailsDTO) {
    this.slNo = employeeDetailsDTO.slNo;
    this.unitslno = employeeDetailsDTO.unitslno;
    this.empcode = employeeDetailsDTO.empcode;
    this.empname = employeeDetailsDTO.empname;
    this.des = employeeDetailsDTO.des;
    this.age = employeeDetailsDTO.age;
    // this.doj = employeeDetailsDTO.doj;
    this.doj =new Date( employeeDetailsDTO.doj);
    this.dob =new Date( employeeDetailsDTO.dob);

    this.fname = employeeDetailsDTO.fname;
    this.bgroup = employeeDetailsDTO.bgroup;
    this.female = employeeDetailsDTO.female;
    this.married = employeeDetailsDTO.married;
    this.child = employeeDetailsDTO.child;
    this.dep = employeeDetailsDTO.dep;
    this.add1 = employeeDetailsDTO.add1;
    this.add2 = employeeDetailsDTO.add2;
    this.edu = employeeDetailsDTO.edu;
    this.exp = employeeDetailsDTO.exp;
    this.det = employeeDetailsDTO.det;
    this.filename = employeeDetailsDTO.filename;
    this.filepath = employeeDetailsDTO.filepath;
    this.originalfilename = employeeDetailsDTO.originalfilename;
    this.insertUser = employeeDetailsDTO.insertUser;
    this.insertDatetime = employeeDetailsDTO.insertDatetime;
    this.updatedUser = employeeDetailsDTO.updatedUser;
    this.updatedDatetime = employeeDetailsDTO.updatedDatetime;
  }


}
