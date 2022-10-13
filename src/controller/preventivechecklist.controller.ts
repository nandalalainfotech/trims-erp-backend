import { Body, Controller, Delete, Header, Get, Param, Post, Put, Res, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PreventiveChecklistDTO } from "src/dto/preventivechecklist.dto";
import { Preventivechecklist001wb } from "src/entity/Preventivechecklist001wb";
import { PreventiveCheckListService } from "src/service/preventivechecklist.service";
import { Response } from "express";
import { Request } from "supertest";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
var path = require('path');
const fs = require('fs')

@Controller('/testandreportstudio/api/preventivechecklist')
export class PreventiveCheckListController {
	constructor(private readonly preventiveCheckListService: PreventiveCheckListService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:mslno/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('mslno') mslno: any, @Param('unitslno') unitslno: any, @Req() request: Request, @Res() response: Response) {
		return await this.preventiveCheckListService.downloadPdf(mslno, unitslno, request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:mslno/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('mslno') mslno: any, @Param('unitslno') unitslno: any,@Req() request: Request, @Res() response: Response) {
		return await this.preventiveCheckListService.downloadExcel(mslno, unitslno, request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() preventiveChecklistDTO: PreventiveChecklistDTO[]): Promise<Preventivechecklist001wb[]> {
		return this.preventiveCheckListService.create(preventiveChecklistDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() preventiveChecklistDTO: PreventiveChecklistDTO): Promise<Preventivechecklist001wb> {
		return this.preventiveCheckListService.update(preventiveChecklistDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll')
	findAll(): Promise<Preventivechecklist001wb[]> {
		return this.preventiveCheckListService.findAll();
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllByMachineId/:mslno/:unitslno')
	findAllByMachineId(@Param('mslno') mslno: number, @Param('unitslno') unitslno: number,): Promise<Preventivechecklist001wb[]> {
		return this.preventiveCheckListService.findAllByMachineId(mslno, unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Preventivechecklist001wb> {
		return this.preventiveCheckListService.findOne(id);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.preventiveCheckListService.remove(id);
	}


	
}