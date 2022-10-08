import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PreventiveactionDTO } from "src/dto/preventiveaction.dto";
import { Preventiveaction001mb } from "src/entity/Preventiveaction001mb";
import { PreventiveactionService } from "src/service/preventiveaction-setting.service";
import { Response } from "express";
import { Request } from "supertest";
import { FixturePreventiveactionDTO } from "src/dto/fixturepreventiveaction.dto";
import { FixturePreventiveactionService } from "src/service/fixturepreventiveaction.service";
import { Fixturepreventiveaction001mb } from "src/entity/Fixturepreventiveaction001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/fixturepreventiveaction')
export class FixturePreventiveactionController {
	constructor(private readonly fixturepreventiveactionService: FixturePreventiveactionService) { }


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.fixturepreventiveactionService.downloadPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.fixturepreventiveactionService.downloadExcel(unitslno,request, response);
	}







	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() fixturepreventiveactionDTO: FixturePreventiveactionDTO): Promise<Fixturepreventiveaction001mb> {
		return this.fixturepreventiveactionService.create(fixturepreventiveactionDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() fixturepreventiveactionDTO: FixturePreventiveactionDTO): Promise<Fixturepreventiveaction001mb> {
		return this.fixturepreventiveactionService.update(fixturepreventiveactionDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Fixturepreventiveaction001mb[]> {
		return this.fixturepreventiveactionService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllbyRootCauseId/:rcslno')
	findAllbyRootCauseId(@Param('rcslno') rcslno: number): Promise<Fixturepreventiveaction001mb[]> {
		return this.fixturepreventiveactionService.findAllbyRootCauseId(rcslno);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.fixturepreventiveactionService.remove(slNo);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Fixturepreventiveaction001mb> {
		return this.fixturepreventiveactionService.findOne(id);
	}
}