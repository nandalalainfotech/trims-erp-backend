import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PurchasereqslipDTO } from "src/dto/Purchasereqslip.dto";
import { Purchasereqslip001wb } from "src/entity/Purchasereqslip001wb";
import { PurchasereqslipService } from "src/service/Purchasereqslip.service";
import { Response } from "express";
import { Request } from "supertest";
import { resolve } from "path";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/purchasereq')
export class PurchasereqslipController {
	constructor(private readonly purchasereqslipService: PurchasereqslipService) { }
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Purchasereqslip001wb[]> {
		return this.purchasereqslipService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.purchasereqslipService.downloadPdf(unitslno,request, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:id/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadIDPdf(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
		return await this.purchasereqslipService.downloadIDPdf(unitslno,id, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.purchasereqslipService.downloadExcel(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:id/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadIDExcel(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
		return await this.purchasereqslipService.downloadIDExcel(unitslno,id, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('getCount')
	getCount(): Promise<string> {
		return this.purchasereqslipService.getCount();
	}



	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() purchasereqslipDTO: PurchasereqslipDTO): Promise<Purchasereqslip001wb> {
		return this.purchasereqslipService.create(purchasereqslipDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() purchasereqslipDTO: PurchasereqslipDTO): Promise<Purchasereqslip001wb> {
		return this.purchasereqslipService.update(purchasereqslipDTO);
	}

	
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Purchasereqslip001wb> {
		return this.purchasereqslipService.findOne(id);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('updatereqslip/:approvel/:pchaseslno/:remarks')
	updatereqslip(@Param('approvel') approvel: any, @Param('pchaseslno') pchaseslno: any, @Param('remarks') remarks: any): Promise<Purchasereqslip001wb> {
		return this.purchasereqslipService.updatereqslip(approvel, pchaseslno, remarks);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.purchasereqslipService.remove(id);
	}

}