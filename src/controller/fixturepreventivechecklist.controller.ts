import { Body, Controller, Delete, Header, Get, Param, Post, Put, Res, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PreventiveChecklistDTO } from "src/dto/preventivechecklist.dto";
import { Preventivechecklist001wb } from "src/entity/Preventivechecklist001wb";
import { PreventiveCheckListService } from "src/service/preventivechecklist.service";
import { Response } from "express";
import { Request } from "supertest";
import { Fixturepreventivechecklist001wb } from "src/entity/Fixturepreventivechecklist001wb";
import { FixturePreventiveChecklistDTO } from "src/dto/fixturepreventivechecklist.dto";
import { FixturePreventiveCheckListService } from "src/service/fixturepreventivecheklist.service";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
var path = require('path');
const fs = require('fs')

@Controller('/testandreportstudio/api/fixturepreventivechecklist')
export class FixturepreventivechecklistController {
	constructor(private readonly fixturepreventiveCheckListService: FixturePreventiveCheckListService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:mslno/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('mslno') mslno: any, @Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.fixturepreventiveCheckListService.downloadPdf(mslno, unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:mslno/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('mslno') mslno: any,@Param('unitslno') unitslno: number, @Req() request: Request, @Res() response: Response) {
		return await this.fixturepreventiveCheckListService.downloadExcel(mslno, unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() fixturepreventiveChecklistDTO: FixturePreventiveChecklistDTO[]): Promise<Fixturepreventivechecklist001wb[]> {
		return this.fixturepreventiveCheckListService.create(fixturepreventiveChecklistDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() fixturepreventiveChecklistDTO: FixturePreventiveChecklistDTO): Promise<Fixturepreventivechecklist001wb> {
		return this.fixturepreventiveCheckListService.update(fixturepreventiveChecklistDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Fixturepreventivechecklist001wb[]> {
		return this.fixturepreventiveCheckListService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllByFixtureId/:mslno/:unitslno')
	findAllByFixtureId(@Param('mslno') mslno: number, @Param('unitslno') unitslno: number): Promise<Fixturepreventivechecklist001wb[]> {
		return this.fixturepreventiveCheckListService.findAllByFixtureId(mslno, unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Fixturepreventivechecklist001wb> {
		return this.fixturepreventiveCheckListService.findOne(id);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.fixturepreventiveCheckListService.remove(id);
	}


	
}