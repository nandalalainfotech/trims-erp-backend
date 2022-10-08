import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MachineDTO } from "src/dto/Machine.dto";
import { Machine001mb } from "src/entity/Machine001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { MachineSettingService } from "src/service/machine.service";
import { Response } from "express";
import { Request } from "supertest";
import { Fixture001mb } from "src/entity/Fixture001mb";
import { FixtureDTO } from "src/dto/fixture.dto";
import { FixtureSettingService } from "src/service/fixture.service";
import { ToolsMasterService } from "src/service/toolsmaster.service";
import { Toolsmaster001mb } from "src/entity/Toolsmaster001mb";
import { ToolsMasterDTO } from "src/dto/toolsmaster.dto";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/toolsmaster')
export class ToolsMasterController {
	constructor(private readonly toolsmasterService: ToolsMasterService) { }


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.toolsmasterService.downloadPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.toolsmasterService.downloadExcel(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() toolsmasterDTO: ToolsMasterDTO): Promise<Toolsmaster001mb> {
		return this.toolsmasterService.create(toolsmasterDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() toolsmasterDTO: ToolsMasterDTO): Promise<Toolsmaster001mb> {
		return this.toolsmasterService.update(toolsmasterDTO);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('getCount')
	getCount(): Promise<string> {
		return this.toolsmasterService.getCount();
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Toolsmaster001mb[]> {
		return this.toolsmasterService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllSlNoAndMcode/:unitslno')
	findAllSlNoAndMcode(@Param('unitslno') unitslno: number): Promise<Toolsmaster001mb[]> {
		return this.toolsmasterService.findAllSlNoAndMcode(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Toolsmaster001mb> {
		return this.toolsmasterService.findOne(id);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.toolsmasterService.remove(id);
	}



}


