import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PreventivePlanDTO } from "src/dto/preventiveplan.dto";
import { Preventiveplan001wb } from "src/entity/Preventiveplan001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { PreventivePlanService } from "src/service/preventiveplan.service";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/preventiveplan')
export class PreventivePlanController {
	constructor(private readonly preventivePlanService: PreventivePlanService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findNotificationAll/:unitslno')
	findNotificationAll(@Param('unitslno') unitslno: number): Promise<Preventiveplan001wb[]> {
		return this.preventivePlanService.findNotificationAll(unitslno);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() preventivePlanDTO: PreventivePlanDTO): Promise<Preventiveplan001wb> {
		return this.preventivePlanService.create(preventivePlanDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() preventivePlanDTO: PreventivePlanDTO): Promise<Preventiveplan001wb> {
		return this.preventivePlanService.update(preventivePlanDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll')
	findAll(): Promise<Preventiveplan001wb[]> {
		return this.preventivePlanService.findAll();
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllByMachineId/:mslno/:unitslno')
	findAllByMachineId(@Param('mslno') mslno: number, @Param('unitslno') unitslno: number,): Promise<Preventiveplan001wb[]> {
		return this.preventivePlanService.findAllByMachineId(mslno, unitslno);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllByDashboard')
	findAllByDashboard(): Promise<any> {
		return this.preventivePlanService.findAllByDashboard();
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Preventiveplan001wb> {
		return this.preventivePlanService.findOne(id);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.preventivePlanService.remove(id);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:mslno/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('mslno') mslno: any,@Param('unitslno') unitslno: any, @Req() request: Request, @Res() response: Response) {
		return await this.preventivePlanService.downloadPdf(mslno,unitslno, request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:mslno/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('mslno') mslno: any,@Param('unitslno') unitslno: any, @Req() request: Request, @Res() response: Response) {

		return await this.preventivePlanService.downloadExcel(mslno,unitslno, request, response);
	}
}