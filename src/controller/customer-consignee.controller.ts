import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CustomerConsigneeDTO } from "src/dto/customer-consignee.dto";
import { Customerconsignee001mb } from "src/entity/Customerconsignee001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { CustomerConsigneeService } from "src/service/customer-consignee.service";

var path = require('path');
const fs = require('fs');
import { Response } from "express";
import { Request } from "supertest";

@Controller('/testandreportstudio/api/customerConsignee')

export class CustomerConsigneeController {
	constructor(private readonly customerConsigneeService: CustomerConsigneeService) {

	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.customerConsigneeService.downloadPdf(unitslno,request, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.customerConsigneeService.downloadExcel(unitslno,request, response);
    }

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() customerConsigneeDTO: CustomerConsigneeDTO): Promise<Customerconsignee001mb> {
		return this.customerConsigneeService.create(customerConsigneeDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() customerConsigneeDTO: CustomerConsigneeDTO): Promise<Customerconsignee001mb> {
		return this.customerConsigneeService.update(customerConsigneeDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Customerconsignee001mb[]> {
		return this.customerConsigneeService.findAll(unitslno);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.customerConsigneeService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Customerconsignee001mb> {
		return this.customerConsigneeService.findOne(id);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllbyConsigneeId/:poslNo')
	findAllbyConsigneeId(@Param('poslNo') poslNo: number): Promise<Customerconsignee001mb[]> {
		return this.customerConsigneeService.findAllbyConsigneeId(poslNo);
	}
}