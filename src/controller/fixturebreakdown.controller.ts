import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { BreakdownDTO } from "src/dto/breakdown.dto";
import { Breakdown001mb } from "src/entity/Breakdown001mb";
import { BreakdownService } from "src/service/breakdown-setting.service";
import { Request } from "supertest";
import { Response } from "express";
import { Fixturebreakdown001mb } from "src/entity/Fixturebreakdown001mb";
import { FixtureBreakdownDTO } from "src/dto/fixturebreakdown.dto";
import { FixtureBreakdownService } from "src/service/fixturebreakdown.service";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/fixturebreakdown')
export class FixtureBreakdownController {
	constructor(private readonly fixturebreakdownService: FixtureBreakdownService) { }


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {

		return await this.fixturebreakdownService.downloadPdf(unitslno,request, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.fixturebreakdownService.downloadExcel(unitslno,request, response);
	}



	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() fixturebreakdownDTO: FixtureBreakdownDTO): Promise<Fixturebreakdown001mb> {
		return this.fixturebreakdownService.create(fixturebreakdownDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() fixturebreakdownDTO: FixtureBreakdownDTO): Promise<Fixturebreakdown001mb> {
		return this.fixturebreakdownService.update(fixturebreakdownDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Fixturebreakdown001mb[]> {
		return this.fixturebreakdownService.findAll(unitslno);
	}


	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.fixturebreakdownService.remove(slNo);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Fixturebreakdown001mb> {
		return this.fixturebreakdownService.findOne(id);
	}
}