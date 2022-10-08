import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { OrderItemMbDTO } from "src/dto/orderitems.dto";

import { OrderItemMbService } from "src/service/orderitems.service";
import { Response } from "express";
import { Request } from "supertest";
import { SalesItemMbService } from "src/service/salesitem.service";
import { Salesitem001mb } from "src/entity/Salesitem001mb";
import { SalesItemMbDTO } from "src/dto/SalesItem.dto";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/sale')
export class SalesItemMbController {
	constructor(private readonly salesItemMbService: SalesItemMbService) { }

	// @Get('pdf/:unitslno')
	// @Header('Content-Type', 'application/pdf')
	// async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
	// 			return await this.salesItemMbService.downloadPdf(unitslno,request, response);
	// }


	// @Get('excel/:unitslno')
	// @Header("Content-Type",
	// 	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	// @Header("Content-Disposition",
	// 	"attachment; filename=" + "Attendace Report" + ".xlsx")
	// async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {		
	//     return await this.salesItemMbService.downloadExcel(unitslno,request, response);
	// }

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() salesItemMbDTO: SalesItemMbDTO): Promise<Salesitem001mb> {
		return this.salesItemMbService.create(salesItemMbDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() salesItemMbDTO: SalesItemMbDTO): Promise<Salesitem001mb> {
		return this.salesItemMbService.update(salesItemMbDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Salesitem001mb[]> {
		return this.salesItemMbService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('getCount')
	getCount(): Promise<string> {
		return this.salesItemMbService.getCount();
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.salesItemMbService.remove(id);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':custemerSlno')
	findOne(@Param('custemerSlno') custemerSlno: number): Promise<Salesitem001mb> {
		return this.salesItemMbService.findOne(custemerSlno);
	}


}


