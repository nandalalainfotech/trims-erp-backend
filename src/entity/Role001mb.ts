import { RoleDTO } from "src/dto/Role.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User001mb } from "./User001mb";

@Entity("role001mb", { schema: "trims" })
export class Role001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("varchar", { name: "rolename", length: 40 })
  rolename: string;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  @OneToMany(() => User001mb, (user001mb) => user001mb.role)
  user001mbs: User001mb[];

  setProperties(roleDTO: RoleDTO) {
    this.id = roleDTO.id;
    this.unitslno = roleDTO.unitslno;
    this.rolename = roleDTO.rolename;
    this.insertUser = roleDTO.insertUser;
    this.insertDatetime = roleDTO.insertDatetime;
    this.updatedUser = roleDTO.updatedUser;
    this.updatedDatetime = roleDTO.updatedDatetime;
  }
}
