import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { StatusDTO } from "src/dto/Status.dto";
import { Status001mb } from "src/entity/Status001mb";
import { StatusService } from "src/service/status.service";
import { Response } from "express";
import { Request } from "supertest";
import { FixtureStatusDTO } from "src/dto/FixtureStatus.dto";
import { Fixturestatus001mb } from "src/entity/Fixturestatus001mb";
import { FixtureStatusService } from "src/service/fixturestatus.service";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/fixturestatus')
export class FixtureStatusController {
	constructor(private readonly fixturestatusService: FixtureStatusService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.fixturestatusService.downloadPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.fixturestatusService.downloadExcel(unitslno,request, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() fixturestatusDTO: FixtureStatusDTO): Promise<Fixturestatus001mb> {
		console.log("Form--->", Fixturestatus001mb);
		return this.fixturestatusService.create(fixturestatusDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() fixturestatusDTO: FixtureStatusDTO): Promise<Fixturestatus001mb> {
		return this.fixturestatusService.update(fixturestatusDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Fixturestatus001mb[]> {
		return this.fixturestatusService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Fixturestatus001mb> {
		return this.fixturestatusService.findOne(id);
	}


	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.fixturestatusService.remove(id);
	}
}