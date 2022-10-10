import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CustomerpomasterDTO } from "src/dto/Customerpomaster.dto";
import { Customerpomaster001mb } from "src/entity/Customerpomaster001mb";
import { CustomerpomasterService } from "src/service/Customerpomaster.service";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { Response } from "express";
import { Request } from "supertest";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/CustomerPoMaster')
export class CustomerpomasterController {
    
    constructor(private readonly customerpomasterService: CustomerpomasterService) { }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Customerpomaster001mb[]> {
		return this.customerpomasterService.findAll(unitslno);
	}


	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.customerpomasterService.downloadPdf(unitslno,request, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.customerpomasterService.downloadExcel(unitslno,request, response);
    }

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdfId/:id/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadIDPdf(@Param('unitslno') unitslno: number,@Param('id') id: number,@Req() request: Request, @Res() response: Response) {
		return await this.customerpomasterService.downloadIDPdf(unitslno,id, request,response);
	}

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excelID/:id/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadIDExcel(@Param('unitslno') unitslno: number,@Param('id') id: number,@Req() request: Request, @Res() response: Response) {
		return await this.customerpomasterService.downloadIDExcel(unitslno,id,request, response);
	}

    @hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() customerpomasterDTO: CustomerpomasterDTO): Promise<Customerpomaster001mb> {
		return this.customerpomasterService.create(customerpomasterDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() customerpomasterDTO: CustomerpomasterDTO): Promise<Customerpomaster001mb> {
		return this.customerpomasterService.update(customerpomasterDTO);
	}

   
    @hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.customerpomasterService.remove(id);
	}
    
}