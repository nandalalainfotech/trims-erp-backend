import { PersonDTO } from "src/dto/person.dto";
import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User001mb } from "./User001mb";

@Index("UNI_firstname", ["firstname"], { unique: true })
@Index("UNI_lastname", ["lastname"], { unique: true })
@Index("UNI_dob", ["dob"], { unique: true })
@Entity("person001mb", { schema: "trims" })
export class Person001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "person_id" })
  personId: number;

  @Column("varchar", { name: "firstname", unique: true, length: 45 })
  firstname: string;

  @Column("varchar", { name: "lastname", unique: true, length: 45 })
  lastname: string;

  @Column("int", { name: "age" })
  age: number;

  @Column("datetime", { name: "dob", unique: true })
  dob: Date;

  @Column("varchar", { name: "sex", length: 30 })
  sex: string;

  @Column("varchar", { name: "maritalstatus", length: 30 })
  maritalstatus: string;

  @Column("varchar", { name: "bloodgroup", length: 30 })
  bloodgroup: string;

  @Column("varchar", { name: "address1", length: 50 })
  address1: string;

  @Column("varchar", { name: "address2", length: 50 })
  address2: string;

  @Column("varchar", { name: "address3", length: 50 })
  address3: string;

  @Column("varchar", { name: "religion", length: 30 })
  religion: string;

  @Column("varchar", { name: "city", length: 30 })
  city: string;

  @Column("varchar", { name: "state", length: 30 })
  state: string;

  @Column("varchar", { name: "country", length: 30 })
  country: string;

  @Column("int", { name: "zipcode" })
  zipcode: number;

  @Column("int", { name: "mobileno" })
  mobileno: number;

  @Column("int", { name: "workphoneno" })
  workphoneno: number;

  @Column("int", { name: "homephoneno" })
  homephoneno: number;

  @Column("varchar", { name: "primaryemail", length: 30 })
  primaryemail: string;

  @Column("varchar", { name: "secondaryemail", length: 30 })
  secondaryemail: string;

  @Column("varchar", { name: "occupationtype", length: 30 })
  occupationtype: string;

  @Column("varchar", { name: "occupationrole", length: 30 })
  occupationrole: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;


  setProperties(personDTO: PersonDTO) {
    this.personId = personDTO.personId;
    this.firstname = personDTO.firstname;
    this.lastname = personDTO.lastname;
    this.age = personDTO.age;
    this.dob = personDTO.dob;
    this.sex = personDTO.sex;
    this.maritalstatus = personDTO.maritalstatus;
    this.updatedDatetime = personDTO.updatedDatetime;
    this.bloodgroup = personDTO.bloodgroup;
    this.address1 = personDTO.address1;
    this.address2 = personDTO.address2;
    this.address3 = personDTO.address3;
    this.insertDatetime = personDTO.insertDatetime;
    this.updatedUser = personDTO.updatedUser;
    this.updatedDatetime = personDTO.updatedDatetime;
    this.religion = personDTO.religion;
    this.city = personDTO.city;
    this.state = personDTO.state;
    this.country = personDTO.country;
    this.zipcode = personDTO.zipcode;
    this.mobileno = personDTO.mobileno;
    this.workphoneno = personDTO.workphoneno;
    this.homephoneno = personDTO.homephoneno;
    this.primaryemail = personDTO.primaryemail;
    this.secondaryemail = personDTO.secondaryemail;
    this.occupationtype = personDTO.occupationtype;
    this.insertUser = personDTO.insertUser;
    this.insertDatetime = personDTO.insertDatetime;
    this.updatedUser = personDTO.updatedUser;
    this.updatedDatetime = personDTO.updatedDatetime;
}
}
