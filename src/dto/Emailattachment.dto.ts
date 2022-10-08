import { IsNotEmpty } from "class-validator";
import { Emailattachment001mb } from "src/entity/Emailattachment001mb";

import { BaseDTO } from "./Base.dto";


export class EmailattachmentDTO extends BaseDTO {

	emailattachmentid: number;

	unitslno: number;

	@IsNotEmpty()
	content: Buffer | null;

	@IsNotEmpty()
	contenttype: string | null;

	@IsNotEmpty()
	emailId: string | null;

	@IsNotEmpty()
	filename: string | null;

	@IsNotEmpty()
	filesize: string | null;

	setProperties(emailattachment001mb: Emailattachment001mb) {
		this.emailattachmentid = emailattachment001mb.emailattachmentid;
		this.unitslno = emailattachment001mb.unitslno;
		this.content = emailattachment001mb.content;
		this.contenttype = emailattachment001mb.contenttype;
		this.emailId = emailattachment001mb.emailId;
		this.filename = emailattachment001mb.filename;
		this.filesize = emailattachment001mb.filesize;
		this.insertUser = emailattachment001mb.insertUser;
		this.insertDatetime = emailattachment001mb.insertDatetime;
		this.updatedUser = emailattachment001mb.updatedUser;
		this.updatedDatetime = emailattachment001mb.updatedDatetime;
	}

}
