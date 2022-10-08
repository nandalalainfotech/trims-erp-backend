import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

import { EmployeeDetailsDTO } from "src/dto/employeedetails.dto";

import { Emp001mb } from "src/entity/Emp001mb";
import { ActivityService } from "src/service/activity.service";
import { EmployeeDetailsService } from "src/service/Employeedetails.service";
import { Request } from "supertest";
import { Response } from "express";
import { createReadStream } from "fs";
import { FirstaidMaterialsDTO } from "src/dto/firstaid-materials.dto";
import { Firstaidwb001 } from "src/entity/Firstaidwb001";
import { FirstaidMaterialsService } from "src/service/firstaidmaterials.service";
import { SafetyEquipmentsService } from "src/service/safetyequipments.service";
import { SafetyEquipmentsDTO } from "src/dto/safetyequipments.dto";
import { Safetyequwb001 } from "src/entity/Safetyequwb001";
import { LegalDocumentsService } from "src/service/legaldocuments.service";
import { Legal001mb } from "src/entity/Legal001mb";
import { LegalDTO } from "src/dto/legaldocuments.dto";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
var path = require('path');




const fs = require('fs');



@Controller('/testandreportstudio/api/legaldocuments')
export class LegalDocumentsControllers {
	// safetyEquipmentsService: any;
	constructor(private readonly legalDocumentsService: LegalDocumentsService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.legalDocumentsService.downloadPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.legalDocumentsService.downloadExcel(unitslno,request, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() legalDTO: LegalDTO): Promise<Legal001mb> {

		return this.legalDocumentsService.create(legalDTO);
	}


	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() legalDTO: LegalDTO): Promise<Legal001mb> {
		return this.legalDocumentsService.update(legalDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Legal001mb[]> {
		return this.legalDocumentsService.findAll(unitslno);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.legalDocumentsService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Legal001mb> {
		return this.legalDocumentsService.findOne(id);
	}

}