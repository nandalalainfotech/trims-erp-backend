import { IsNotEmpty } from "class-validator";
import { Email001mb } from "src/entity/Email001mb";
import { BaseDTO } from "./Base.dto";

export class EmailDTO extends BaseDTO {

	emailId: number;

	unitslno: number;

	@IsNotEmpty()
	emailFrom: string;

	@IsNotEmpty()
	emailTo: string;

	@IsNotEmpty()
	emailCc: string;

	@IsNotEmpty()
	emailBcc: string;

	@IsNotEmpty()
	emailDate: Date | null;

	@IsNotEmpty()
	emailSubject: string | null;

	@IsNotEmpty()
	emailBody: string | null;

	@IsNotEmpty()
	emailCurrentPlace: string | null;

	@IsNotEmpty()
	isEmailViewed: string | null;

	@IsNotEmpty()
	isEmailAttachmentExists: string | null;

	@IsNotEmpty()
	multipleEmailId: string | null;

	setProperties(email001mb: Email001mb) {
		this.emailId = email001mb.emailId;
		this.unitslno = email001mb.unitslno;
		this.emailFrom = email001mb.emailFrom;
		this.emailTo = email001mb.emailTo;
		this.emailCc = email001mb.emailCc;
		this.emailBcc = email001mb.emailBcc;
		this.emailDate = email001mb.emailDate;
		this.emailSubject = email001mb.emailSubject;
		this.emailBody = email001mb.emailBody;
		this.emailCurrentPlace = email001mb.emailCurrentPlace;
		this.isEmailViewed = email001mb.isEmailViewed;
		this.isEmailAttachmentExists = email001mb.isEmailAttachmentExists;
		this.multipleEmailId = email001mb.multipleEmailId;
		this.insertUser = email001mb.insertUser;
        this.insertDatetime = email001mb.insertDatetime;
        this.updatedUser = email001mb.updatedUser;
        this.updatedDatetime = email001mb.updatedDatetime;
	}
}
