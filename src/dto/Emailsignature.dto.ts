import { IsNotEmpty } from "class-validator";
import { Emailsignature001mb } from "src/entity/Emailsignature001mb";

import { BaseDTO } from "./Base.dto";


export class EmailsignatureDTO extends BaseDTO {

	emailSignatureId: number;

	unitslno: number;

	@IsNotEmpty()
	companyName: string | null;

	@IsNotEmpty()
	companyWebsite: string | null;

	@IsNotEmpty()
	country: string | null;

	@IsNotEmpty()
	emailAddress: string | null;

	@IsNotEmpty()
	employeeDesignation: string | null;

	@IsNotEmpty()
	employeeId: number | null;

	@IsNotEmpty()
	employeeName: string | null;

	@IsNotEmpty()
	employeeNamePrefix: string | null;

	@IsNotEmpty()
	logoLink: string | null;

	@IsNotEmpty()
	mobileNumber: number | null;

	@IsNotEmpty()
	phoneNumber: number | null;

	setProperties(emailsignature001mb: Emailsignature001mb) {
		this.emailSignatureId = emailsignature001mb.emailSignatureId;
		this.unitslno = emailsignature001mb.unitslno;
		this.companyName = emailsignature001mb.companyName;
		this.companyWebsite = emailsignature001mb.companyWebsite;
		this.country = emailsignature001mb.country;
		this.employeeDesignation = emailsignature001mb.employeeDesignation;
		this.employeeId = emailsignature001mb.employeeId;
		this.employeeName = emailsignature001mb.employeeName;
		this.employeeNamePrefix = emailsignature001mb.employeeNamePrefix;
		this.logoLink = emailsignature001mb.logoLink;
		this.mobileNumber = emailsignature001mb.mobileNumber;
		this.phoneNumber = emailsignature001mb.phoneNumber;
		this.insertUser = emailsignature001mb.insertUser;
        this.insertDatetime = emailsignature001mb.insertDatetime;
        this.updatedUser = emailsignature001mb.updatedUser;
        this.updatedDatetime = emailsignature001mb.updatedDatetime;
	}

}
