import { EmailsignatureDTO } from "src/dto/Emailsignature.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("emailsignature001mb", { schema: "trims" })
export class Emailsignature001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "emailSignatureId" })
  emailSignatureId: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "companyName", nullable: true, length: 255 })
  companyName: string | null;

  @Column("varchar", { name: "companyWebsite", nullable: true, length: 255 })
  companyWebsite: string | null;

  @Column("varchar", { name: "country", nullable: true, length: 255 })
  country: string | null;

  @Column("varchar", { name: "emailAddress", nullable: true, length: 255 })
  emailAddress: string | null;

  @Column("varchar", {
    name: "employeeDesignation",
    nullable: true,
    length: 255,
  })
  employeeDesignation: string | null;

  @Column("int", { name: "employeeId", nullable: true })
  employeeId: number | null;

  @Column("varchar", { name: "employeeName", nullable: true, length: 255 })
  employeeName: string | null;

  @Column("varchar", {
    name: "employeeNamePrefix",
    nullable: true,
    length: 255,
  })
  employeeNamePrefix: string | null;

  @Column("varchar", { name: "logoLink", nullable: true, length: 255 })
  logoLink: string | null;

  @Column("int", { name: "mobileNumber", nullable: true })
  mobileNumber: number | null;

  @Column("int", { name: "phoneNumber", nullable: true })
  phoneNumber: number | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  setProperties(emailsignatureDTO: EmailsignatureDTO) {
    this.emailSignatureId = emailsignatureDTO.emailSignatureId;
    this.unitslno = emailsignatureDTO.unitslno;
    this.companyName = emailsignatureDTO.companyName;
    this.companyWebsite = emailsignatureDTO.companyWebsite;
    this.country = emailsignatureDTO.country;
    this.employeeDesignation = emailsignatureDTO.employeeDesignation;
    this.employeeId = emailsignatureDTO.employeeId;
    this.employeeName = emailsignatureDTO.employeeName;
    this.employeeNamePrefix = emailsignatureDTO.employeeNamePrefix;
    this.logoLink = emailsignatureDTO.logoLink;
    this.mobileNumber = emailsignatureDTO.mobileNumber;
    this.phoneNumber = emailsignatureDTO.phoneNumber;
    this.insertUser = emailsignatureDTO.insertUser;
    this.insertDatetime = emailsignatureDTO.insertDatetime;
    this.updatedUser = emailsignatureDTO.updatedUser;
    this.updatedDatetime = emailsignatureDTO.updatedDatetime;
  }
}
