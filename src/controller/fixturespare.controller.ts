import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SparesDTO } from "src/dto/spares.dto";
import { Spares001mb } from "src/entity/Spares001mb";
import { SpareService } from "src/service/spares.service";
import { Response } from "express";
import { Request } from "supertest";
import { FixtureSpareService } from "src/service/fixturespare.service";
import { Fixturespares001mb } from "src/entity/Fixturespares001mb";
import { FixtureSparesDTO } from "src/dto/FixtureSpare.dto";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/fixspare')
export class FixtureSparesController {
	constructor(private readonly fixturespareService: FixtureSpareService) { }


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.fixturespareService.downloadPdf(unitslno,request, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.fixturespareService.downloadExcel(unitslno,request, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Fixturespares001mb[]> {
		return this.fixturespareService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() fixtureSparesDTO: FixtureSparesDTO): Promise<Fixturespares001mb> {
		return this.fixturespareService.create(fixtureSparesDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() fixtureSparesDTO: FixtureSparesDTO): Promise<Fixturespares001mb> {
		return this.fixturespareService.update(fixtureSparesDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Fixturespares001mb> {
		return this.fixturespareService.findOne(id);
	}


	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.fixturespareService.remove(id);
	}
}