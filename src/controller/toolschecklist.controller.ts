import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ChecklistDTO } from "src/dto/Checklist.dto";
import { Checklist001mb } from "src/entity/Checklist001mb";
import { ChecklistSettingService } from "src/service/checklist.service";
import { Response } from "express";
import { Request } from "supertest";
import { FixtureChecklistSettingService } from "src/service/fixturechecklist.service";
import { FixtureChecklistDTO } from "src/dto/FixtureChecklist.dto";
import { Fixturechecklist001mb } from "src/entity/Fixturechecklist001mb";
import { ToolsChecklistSettingService } from "src/service/toolschecklist.service";
import { ToolsChecklistDTO } from "src/dto/toolschecklist.dto";
import { Toolschecklist001mb } from "src/entity/Toolschecklist001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');



@Controller('/testandreportstudio/api/toolschecklist')
export class ToolsChecklistController {
	constructor(private readonly toolschecklistService: ToolsChecklistSettingService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.toolschecklistService.downloadPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.toolschecklistService.downloadExcel(unitslno,request, response);
	}



	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() toolsChecklistDTO: ToolsChecklistDTO): Promise<Toolschecklist001mb> {
		return this.toolschecklistService.create(toolsChecklistDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() toolsChecklistDTO: ToolsChecklistDTO): Promise<Toolschecklist001mb> {
		return this.toolschecklistService.update(toolsChecklistDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Toolschecklist001mb[]> {
		return this.toolschecklistService.findAll(unitslno);
	}


	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.toolschecklistService.remove(slNo);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Toolschecklist001mb> {
		return this.toolschecklistService.findOne(id);
	}
}