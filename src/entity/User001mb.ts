import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Unitmaster001mb } from "./Unitmaster001mb";
import { Department001mb } from "./Department001mb";
import { Role001mb } from "./Role001mb";
import { UserDTO } from "src/dto/User.dto";

@Index("unitslno", ["unitslno"], {})
@Index("dpslno", ["dpslno"], {})
@Index("roleid", ["roleid"], {})
@Entity("user001mb", { schema: "trims" })
export class User001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "person_id" })
  personId: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("int", { name: "dpslno" })
  dpslno: number;

  @Column("int", { name: "roleid" })
  roleid: number;

  @Column("varchar", { name: "firstname", length: 45 })
  firstname: string;

  @Column("varchar", { name: "lastname", length: 45 })
  lastname: string;

  @Column("varchar", { name: "username", length: 40 })
  username: string;

  @Column("varchar", { name: "password", length: 100 })
  password: string;

  @Column("char", { name: "status", length: 1 })
  status: string;

  @Column("varchar", { name: "email", length: 30 })
  email: string;

  @Column("varchar", { name: "securityquestion", length: 250 })
  securityquestion: string;

  @Column("varchar", { name: "securityanswer", length: 250 })
  securityanswer: string;

  @Column("varchar", {
    name: "theme",
    nullable: true,
    length: 10,
    default: () => "'#286090'",
  })
  theme: string | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @ManyToOne(
    () => Unitmaster001mb,
    (unitmaster001mb) => unitmaster001mb.user001mbs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "unitslno", referencedColumnName: "slNo" }])
  unitslno2: Unitmaster001mb;

  @ManyToOne(
    () => Department001mb,
    (department001mb) => department001mb.user001mbs,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "dpslno", referencedColumnName: "slNo" }])
  dpslno2: Department001mb;

  @ManyToOne(() => Role001mb, (role001mb) => role001mb.user001mbs, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "roleid", referencedColumnName: "id" }])
  role: Role001mb;


  setProperties(userDTO: UserDTO) {
    this.personId = userDTO.personId;
    this.unitslno = userDTO.unitslno;
    this.dpslno = userDTO.dpslno;
    this.firstname = userDTO.firstname;
    this.lastname = userDTO.lastname;
    this.username = userDTO.username;
    this.roleid = userDTO.roleid;
    this.password = userDTO.password;
    this.status = userDTO.status;
    this.email = userDTO.email;
    this.securityquestion = userDTO.securityquestion;
    this.securityanswer = userDTO.securityanswer;
    this.theme = userDTO.theme;
    this.insertUser = userDTO.insertUser;
    this.insertDatetime = userDTO.insertDatetime;
    this.updatedUser = userDTO.updatedUser;
    this.updatedDatetime = userDTO.updatedDatetime;
    
  }
}
