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
import { ToolsRootcauseService } from "src/service/toolsrootcause.service";
import { ToolsRootcauseDTO } from "src/dto/toolsrootcause.dto";
import { Toolsrootcause001mb } from "src/entity/Toolsrootcause001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/toolsrootcause')
export class ToolsRootcauseController {
	constructor(private readonly toolsrootcauseService: ToolsRootcauseService) { }


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.toolsrootcauseService.downloadPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.toolsrootcauseService.downloadExcel(unitslno,request, response);
	}




	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() toolsRootcauseDTO: ToolsRootcauseDTO): Promise<Toolsrootcause001mb> {
		return this.toolsrootcauseService.create(toolsRootcauseDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() toolsRootcauseDTO: ToolsRootcauseDTO): Promise<Toolsrootcause001mb> {
		return this.toolsrootcauseService.update(toolsRootcauseDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Toolsrootcause001mb[]> {
		return this.toolsrootcauseService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllbyBreakDownId/:bdslno')
	findAllbyBreakDownId(@Param('bdslno') bdslno: number): Promise<Toolsrootcause001mb[]> {
		return this.toolsrootcauseService.findAllbyBreakDownId(bdslno);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.toolsrootcauseService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Toolsrootcause001mb> {
		return this.toolsrootcauseService.findOne(id);
	}
}