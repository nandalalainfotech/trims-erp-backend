import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { BreakDownRegDTO } from "src/dto/breakdownRegwb.dto";
import { Breakdownreg001wb } from "src/entity/Breakdownreg001wb";
import { BreakDownRegService } from "src/service/breakDownRegwb.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { Request } from "supertest";
import { createReadStream } from "fs";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
var path = require('path');
const fs = require('fs')


@Controller('/testandreportstudio/api/breakdownreg')
export class BreakDownRegController {
	constructor(private readonly breakDownRegService: BreakDownRegService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File, @Body() breakDownRegDTO: BreakDownRegDTO) {
		return this.breakDownRegService.create(file, breakDownRegDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	@UseInterceptors(FileInterceptor('file'))
	uploadFile1(@UploadedFile() file: Express.Multer.File, @Body() breakDownRegDTO: BreakDownRegDTO) {
		return this.breakDownRegService.update(file, breakDownRegDTO);
	}

	// @UseGuards(JwtAuthGuard)
	// @Get('findAll')
	// findAll(): Promise<Breakdownreg001wb[]> {
	// 	return this.breakDownRegService.findAll();
	// }
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllByMachineId/:mslno/:unitslno')
	findAllByMachineId(@Param('mslno') mslno: number, @Param('unitslno') unitslno: number,): Promise<Breakdownreg001wb[]> {
		return this.breakDownRegService.findAllByMachineId(mslno, unitslno);
	}
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllByDashboard')
	findAllByDashboard(): Promise<any> {
		return this.breakDownRegService.findAllByDashboard();
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.breakDownRegService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Breakdownreg001wb> {
		return this.breakDownRegService.findOne(id);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:mslno/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('mslno') mslno: any,@Param('unitslno') unitslno: any,  @Req() request: Request, @Res() response: Response) {
		return await this.breakDownRegService.downloadPdf(mslno,unitslno, request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:mslno/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('mslno') mslno: any,@Param('unitslno') unitslno: any,  @Req() request: Request, @Res() response: Response) {
		return await this.breakDownRegService.downloadExcel(mslno,unitslno, request, response);
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