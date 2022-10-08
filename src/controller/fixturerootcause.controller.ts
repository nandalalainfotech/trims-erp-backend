import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RootcauseDTO } from "src/dto/rootcause.dto";
import { Rootcause001mb } from "src/entity/Rootcause001mb";
import { RootcauseService } from "src/service/rootcause-setting.service";
import { Response } from "express";
import { Request } from "supertest";
import { Fixturerootcause001mb } from "src/entity/Fixturerootcause001mb";
import { FixtureRootcauseService } from "src/service/fixturerootcause.service";
import { FixtureRootcauseDTO } from "src/dto/fixturerootcause.dto";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/fixturerootcause')
export class FixtureRootcauseController {
	constructor(private readonly fixturerootcauseService: FixtureRootcauseService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.fixturerootcauseService.downloadPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.fixturerootcauseService.downloadExcel(unitslno,request, response);
	}




	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() fixturerootcauseDTO: FixtureRootcauseDTO): Promise<Fixturerootcause001mb> {
		return this.fixturerootcauseService.create(fixturerootcauseDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() fixturerootcauseDTO: FixtureRootcauseDTO): Promise<Fixturerootcause001mb> {
		return this.fixturerootcauseService.update(fixturerootcauseDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Fixturerootcause001mb[]> {
		return this.fixturerootcauseService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllbyBreakDownId/:bdslno')
	findAllbyBreakDownId(@Param('bdslno') bdslno: number): Promise<Fixturerootcause001mb[]> {
		return this.fixturerootcauseService.findAllbyBreakDownId(bdslno);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.fixturerootcauseService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Fixturerootcause001mb> {
		return this.fixturerootcauseService.findOne(id);
	}
}