import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { FixturePreventivePlanDTO } from "src/dto/fixturepreventiveplan.dto";
import { PreventivePlanDTO } from "src/dto/preventiveplan.dto";
import { Fixturepreventiveplan001wb } from "src/entity/Fixturepreventiveplan001wb";
import { Preventiveplan001wb } from "src/entity/Preventiveplan001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { FixturePreventivePlanService } from "src/service/fixturepreventiveplan.service";
import { PreventivePlanService } from "src/service/preventiveplan.service";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/fixturepreventiveplan')
export class FixturePreventivePlanController {
	constructor(private readonly fixturepreventivePlanService: FixturePreventivePlanService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:mslno/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('mslno') mslno: any,@Param('unitslno') unitslno: number, @Req() request: Request, @Res() response: Response) {
		return await this.fixturepreventivePlanService.downloadPdf(mslno, unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:mslno/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('mslno') mslno: any,@Param('unitslno') unitslno: number, @Req() request: Request, @Res() response: Response) {

		return await this.fixturepreventivePlanService.downloadExcel(mslno, unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findNotificationAll')
	findNotificationAll(): Promise<Fixturepreventiveplan001wb[]> {
		return this.fixturepreventivePlanService.findNotificationAll();
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	create(@Body() fixturepreventivePlanDTO: FixturePreventivePlanDTO): Promise<Fixturepreventiveplan001wb> {
		return this.fixturepreventivePlanService.create(fixturepreventivePlanDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() fixturepreventivePlanDTO: FixturePreventivePlanDTO): Promise<Fixturepreventiveplan001wb> {
		return this.fixturepreventivePlanService.update(fixturepreventivePlanDTO);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Fixturepreventiveplan001wb[]> {
		return this.fixturepreventivePlanService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllByFixtureId/:mslno/:unitslno')
	findAllByFixtureId(@Param('mslno') mslno: number, @Param('unitslno') unitslno: number): Promise<Fixturepreventiveplan001wb[]> {
		return this.fixturepreventivePlanService.findAllByFixtureId(mslno, unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllByDashboard')
	findAllByDashboard(): Promise<any> {
		return this.fixturepreventivePlanService.findAllByDashboard();
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Fixturepreventiveplan001wb> {
		return this.fixturepreventivePlanService.findOne(id);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.fixturepreventivePlanService.remove(id);
	}


	
}