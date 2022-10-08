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
import { ToolsStatusService } from "src/service/toolsstatus.service";
import { Toolsstatus001mb } from "src/entity/Toolsstatus001mb";
import { ToolsStatusDTO } from "src/dto/toolsstatusdto";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/toolsstatus')
export class ToolsStatusController {
	constructor(private readonly toolsstatusService: ToolsStatusService) { }


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.toolsstatusService.downloadPdf(unitslno,request, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.toolsstatusService.downloadExcel(unitslno,request, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() toolsstatusDTO: ToolsStatusDTO): Promise<Toolsstatus001mb> {
		return this.toolsstatusService.create(toolsstatusDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() toolsstatusDTO: ToolsStatusDTO): Promise<Toolsstatus001mb> {
		return this.toolsstatusService.update(toolsstatusDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Toolsstatus001mb[]> {
		return this.toolsstatusService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Toolsstatus001mb> {
		return this.toolsstatusService.findOne(id);
	}


	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.toolsstatusService.remove(id);
	}
}