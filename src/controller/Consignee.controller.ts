import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ConsigneeDTO } from "src/dto/Consignee.dto";
import { Consignee001mb } from "src/entity/Consignee001mb";
import { ConsigneeService } from "src/service/Consignee.service";

import { Response } from "express";
import { Request } from "supertest";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/consignee')

export class ConsigneeController {
	constructor(private readonly consigneeService: ConsigneeService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.consigneeService.downloadPdf(unitslno,request, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.consigneeService.downloadExcel(unitslno,request, response);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() consigneeDTO: ConsigneeDTO): Promise<Consignee001mb> {
		return this.consigneeService.create(consigneeDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() consigneeDTO: ConsigneeDTO): Promise<Consignee001mb> {
		return this.consigneeService.update(consigneeDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Consignee001mb[]> {
		return this.consigneeService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllbyPurchaseOrderId/:poslNo')
	findAllbyPurchaseOrderId(@Param('poslNo') poslNo: number): Promise<Consignee001mb[]> {
		return this.consigneeService.findAllbyPurchaseOrderId(poslNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllByconsignee/:consigneeSlno')
	findAllByconsignee(@Param('consigneeSlno') consigneeSlno: number): Promise<Consignee001mb[]> {
		return this.consigneeService.findAllByconsignee(consigneeSlno);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.consigneeService.remove(slNo);
	}

}