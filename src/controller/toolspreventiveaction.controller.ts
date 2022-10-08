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
import { ToolsPreventiveactionService } from "src/service/toolspreventiveaction.service";
import { ToolsPreventiveactionDTO } from "src/dto/toolspreventiveaction.dto";
import { Toolspreventiveaction001mb } from "src/entity/Toolspreventiveaction001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/toolspreventiveaction')
export class ToolsPreventiveactionController {
	constructor(private readonly toolspreventiveactionService: ToolsPreventiveactionService) { }


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.toolspreventiveactionService.downloadPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.toolspreventiveactionService.downloadExcel(unitslno,request, response);
	}







	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() toolsPreventiveactionDTO: ToolsPreventiveactionDTO): Promise<Toolspreventiveaction001mb> {
		return this.toolspreventiveactionService.create(toolsPreventiveactionDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() toolsPreventiveactionDTO: ToolsPreventiveactionDTO): Promise<Toolspreventiveaction001mb> {
		return this.toolspreventiveactionService.update(toolsPreventiveactionDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Toolspreventiveaction001mb[]> {
		return this.toolspreventiveactionService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllbyRootCauseId/:trcslno')
	findAllbyRootCauseId(@Param('trcslno') trcslno: number): Promise<Toolspreventiveaction001mb[]> {
		return this.toolspreventiveactionService.findAllbyRootCauseId(trcslno);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.toolspreventiveactionService.remove(slNo);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Toolspreventiveaction001mb> {
		return this.toolspreventiveactionService.findOne(id);
	}
}