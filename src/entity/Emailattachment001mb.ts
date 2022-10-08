import { EmailattachmentDTO } from "src/dto/Emailattachment.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("emailattachment001mb", { schema: "trims" })
export class Emailattachment001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "emailattachmentid" })
  emailattachmentid: number;

  @Column("int", { name: "unitslno" })
  unitslno: number;

  @Column("tinyblob", { name: "content", nullable: true })
  content: Buffer | null;

  @Column("varchar", { name: "contenttype", nullable: true, length: 255 })
  contenttype: string | null;

  @Column("varchar", { name: "emailId", nullable: true, length: 225 })
  emailId: string | null;

  @Column("varchar", { name: "filename", nullable: true, length: 255 })
  filename: string | null;

  @Column("varchar", { name: "filesize", nullable: true, length: 255 })
  filesize: string | null;

  @Column("varchar", { name: "insert_user", length: 40 })
  insertUser: string;

  @Column("datetime", { name: "insert_datetime" })
  insertDatetime: Date;

  @Column("varchar", { name: "updated_user", nullable: true, length: 40 })
  updatedUser: string | null;

  @Column("datetime", { name: "updated_datetime", nullable: true })
  updatedDatetime: Date | null;

  setProperties(emailattachmentDTO: EmailattachmentDTO) {
		this.emailattachmentid = emailattachmentDTO.emailattachmentid;
    this.unitslno = emailattachmentDTO.unitslno;
		this.content = emailattachmentDTO.content;
		this.contenttype = emailattachmentDTO.contenttype;
		this.emailId = emailattachmentDTO.emailId;
		this.filename = emailattachmentDTO.filename;
		this.filesize = emailattachmentDTO.filesize;
		this.insertUser = emailattachmentDTO.insertUser;
		this.insertDatetime = emailattachmentDTO.insertDatetime;
		this.updatedUser = emailattachmentDTO.updatedUser;
		this.updatedDatetime = emailattachmentDTO.updatedDatetime;
	}

}
