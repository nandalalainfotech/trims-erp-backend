import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierreportDTO } from "src/dto/Supplierreport.dto";
import { Supplierreport001wb } from "src/entity/Supplierreport001wb";
import { SupplierreportService } from "src/service/supplierreportwb.service";
import { Request } from "supertest";
import { Response } from "express";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";


var path = require('path');
const fs = require('fs');




@Controller('/testandreportstudio/api/supreport')
export class SupplierreportController {
	constructor(private readonly supplierreportService: SupplierreportService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:supregslNo')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('supregslNo') supregslNo: any, @Req() request: Request, @Res() response: Response) {
		return await this.supplierreportService.downloadPdf(supregslNo, request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:supregslNo')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('supregslNo') supregslNo: any, @Req() request: Request, @Res() response: Response) {

		return await this.supplierreportService.downloadExcel(supregslNo, request, response);
	}




	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() supplierreportDTO: SupplierreportDTO): Promise<Supplierreport001wb> {
		return this.supplierreportService.create(supplierreportDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() supplierreportDTO: SupplierreportDTO): Promise<Supplierreport001wb> {
		return this.supplierreportService.update(supplierreportDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll')
	findAll(): Promise<Supplierreport001wb[]> {
		return this.supplierreportService.findAll();
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllBySupplierId/:supregslno/:unitslno')
	findAllBySupplierId(@Param('supregslno') supregslno: number, @Param('unitslno') unitslno: number): Promise<Supplierreport001wb[]> {
		return this.supplierreportService.findAllBySupplierId(supregslno, unitslno);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.supplierreportService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Supplierreport001wb> {
		return this.supplierreportService.findOne(id);
	}
}