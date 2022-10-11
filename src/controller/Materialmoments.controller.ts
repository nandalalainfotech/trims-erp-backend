import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MaterialmomentsDTO } from "src/dto/Materialmoments.dto";
import { Materialmoments001wb } from "src/entity/Materialmoments001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { MaterialmomentsService } from "src/service/Materialmoments.service";
import { Request } from "supertest";

var path = require('path'); 
const fs = require('fs');

@Controller('/testandreportstudio/api/materialmoments')
export class MaterialmomentsController {
	constructor(private readonly materialmomentsService: MaterialmomentsService) { }
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Materialmoments001wb[]> {
		return this.materialmomentsService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('itempdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloaditemPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.materialmomentsService.downloaditemPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('itemexcel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloaditemExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.materialmomentsService.downloaditemExcel(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('consumablepdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadconsumablePdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.materialmomentsService.downloadconsumablePdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('consumablexcel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadconsumableExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.materialmomentsService.downloadconsumableExcel(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('childPartpdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadchildPartPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.materialmomentsService.downloadchildPartPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('childPartexcel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadchildPartExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.materialmomentsService.downloadchildPartExcel(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('partpdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPartPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.materialmomentsService.downloadPartPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('partexcel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadPartExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.materialmomentsService.downloadPartExcel(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() materialmomentsDTO: MaterialmomentsDTO): Promise<Materialmoments001wb> {
		return this.materialmomentsService.create(materialmomentsDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() materialmomentsDTO: MaterialmomentsDTO): Promise<Materialmoments001wb> {
		return this.materialmomentsService.update(materialmomentsDTO);
	}

	

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Materialmoments001wb> {
		return this.materialmomentsService.findOne(id);
	}

    @hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: string): Promise<void> {
		return this.materialmomentsService.remove(id);
	}
}