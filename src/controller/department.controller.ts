import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { DepartmentDTO } from "src/dto/Department.dto";
import { Department001mb } from "src/entity/Department001mb";
import { DepartmentSettingService } from "src/service/department.service";
import { Request } from "supertest";
import { Response } from "express";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/department')
export class DepartmentController {
	constructor(private readonly departmentService: DepartmentSettingService) { }


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Req() request: Request, @Res() response: Response) {

		return await this.departmentService.downloadPdf(request, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Req() request: Request, @Res() response: Response) {
		return await this.departmentService.downloadExcel(request, response);
	}


	// @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	// @UseGuards(JwtAuthGuard, RolesGuard)
	@Get('loginDeptFindAll')
	loginDeptFindAll(): Promise<Department001mb[]> {
		return this.departmentService.findAll();
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll')
	findAll(): Promise<Department001mb[]> {
		return this.departmentService.findAll();
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() departmentDTO: DepartmentDTO): Promise<Department001mb> {
		return this.departmentService.create(departmentDTO);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() departmentDTO: DepartmentDTO): Promise<Department001mb> {
		return this.departmentService.update(departmentDTO);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.departmentService.remove(slNo);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Department001mb> {
		return this.departmentService.findOne(id);
	}
}