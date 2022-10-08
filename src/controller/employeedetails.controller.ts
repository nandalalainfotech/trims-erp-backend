import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

import { EmployeeDetailsDTO } from "src/dto/employeedetails.dto";

import { Emp001mb } from "src/entity/Emp001mb";
import { ActivityService } from "src/service/activity.service";
import { EmployeeDetailsService } from "src/service/Employeedetails.service";

import { Response } from "express";
import { createReadStream } from "fs";
import { Request } from "supertest";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');



@Controller('/testandreportstudio/api/empdetails')
export class EmployeeDetailsController {
	constructor(private readonly employeedetailsService: EmployeeDetailsService) { }


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {

		return await this.employeedetailsService.downloadPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {

		return await this.employeedetailsService.downloadExcel(unitslno,request, response);
	}



	// @UseGuards(JwtAuthGuard)
	// @Post("save")
	// create(@Body() employeedetailsDTO: EmployeeDetailsDTO): Promise<Emp001mb> {
	// 	return this.employeedetailsService.create(employeedetailsDTO);
	// }

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File, @Body() employeedetailsDTO: EmployeeDetailsDTO) {

		return this.employeedetailsService.create(file, employeedetailsDTO);
	}

	// @UseGuards(JwtAuthGuard)
	// @Put("update")
	// update(@Body() employeedetailsDTO: EmployeeDetailsDTO): Promise<Emp001mb> {
	// 	return this.employeedetailsService.update(employeedetailsDTO);
	// }
	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	@UseInterceptors(FileInterceptor('file'))
	uploadFile1(@UploadedFile() file: Express.Multer.File, @Body() employeedetailsDTO: EmployeeDetailsDTO) {
		return this.employeedetailsService.update(file, employeedetailsDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Emp001mb[]> {
		return this.employeedetailsService.findAll(unitslno);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.employeedetailsService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Emp001mb> {
		return this.employeedetailsService.findOne(id);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('download/:originalfilename')
	download(@Param() originalfilename: any, @Req() request: Request, @Res() response: Response) {


		var filePath = path.join(`./uploads/`) + originalfilename.originalfilename;
		const filestream = createReadStream(filePath);


		filestream.pipe(response);
	}
}