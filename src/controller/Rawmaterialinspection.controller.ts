import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RawmaterialinspectionDTO } from "src/dto/Rawmaterialinspection.dto";
import { Rawmaterialinspection001wb } from "src/entity/Rawmaterialinspection001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { RawmaterialinspectionService } from "src/service/Rawmaterialinspection.service";

import { Request } from "supertest";



@Controller('/testandreportstudio/api/Rawmaterialinspection')
export class RawmaterialinspectionController {
	constructor(private readonly rawmaterialinspectionService: RawmaterialinspectionService) { }
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Rawmaterialinspection001wb[]> {
		return this.rawmaterialinspectionService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAllOrderitem/:unitslno')
	findAllOrderitem(@Param('unitslno') unitslno: number): Promise<Rawmaterialinspection001wb[]> {
		return this.rawmaterialinspectionService.findAllOrderitem(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findByConsumableItem/:unitslno')
	findByConsumableItem(@Param('unitslno') unitslno: number): Promise<Rawmaterialinspection001wb[]> {
		return this.rawmaterialinspectionService.findByConsumableItem(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findByChildItem/:unitslno')
	findByChildItem(@Param('unitslno') unitslno: number): Promise<Rawmaterialinspection001wb[]> {
		return this.rawmaterialinspectionService.findByChildItem(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findByPartItem/:unitslno')
	findByPartItem(@Param('unitslno') unitslno: number): Promise<Rawmaterialinspection001wb[]> {
		return this.rawmaterialinspectionService.findByPartItem(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findByItem/:unitslno')
	findByItem(@Param('unitslno') unitslno: number): Promise<Rawmaterialinspection001wb[]> {
		return this.rawmaterialinspectionService.findByItem(unitslno);
	}

	// -------------- stockInword excel && Pdf----------------------

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('itemStockpdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloaditemStockpdf(@Param('unitslno') unitslno: number, @Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloaditemStockpdf(unitslno, request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('itemStockexcel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloaditemStockExcel(@Param('unitslno') unitslno: number, @Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloaditemStockExcel(unitslno, request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('consumableStockpdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadconsumableStockPdf(@Param('unitslno') unitslno: number, @Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloadconsumableStockPdf(unitslno, request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('consumablStockexcel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadconsumableStockExcel(@Param('unitslno') unitslno: number, @Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloadconsumableStockExcel(unitslno, request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('childPartStockpdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadchildPartStockPdf(@Param('unitslno') unitslno: number, @Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloadchildPartStockPdf(unitslno, request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('childPartStockexcel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadchildPartStockExcel(@Param('unitslno') unitslno: number, @Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloadchildPartStockExcel(unitslno, request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('partStockpdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPartStockPdf(@Param('unitslno') unitslno: number, @Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloadPartStockPdf(unitslno, request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('partStockexcel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadPartStockExcel(@Param('unitslno') unitslno: number, @Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloadPartStockExcel(unitslno, request, response);
	}

	// ---------Stock Excel && Pdf---------------

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('itempdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloaditemPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloaditemPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('itemexcel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloaditemExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloaditemExcel(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('consumablepdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadconsumablePdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloadconsumablePdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('consumablexcel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadconsumableExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloadconsumableExcel(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('childPartpdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadchildPartPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloadchildPartPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('childPartexcel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadchildPartExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloadchildPartExcel(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('partpdf/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadPartPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloadPartPdf(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('partexcel/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadPartExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
		return await this.rawmaterialinspectionService.downloadPartExcel(unitslno,request, response);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('save')
	create(@Body() rawmaterialinspectionDTO: RawmaterialinspectionDTO) {
		return this.rawmaterialinspectionService.create(rawmaterialinspectionDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() rawmaterialinspectionDTO: RawmaterialinspectionDTO) {
		return this.rawmaterialinspectionService.update(rawmaterialinspectionDTO);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:slNo')
	remove(@Param('slNo') slNo: number): Promise<void> {
		return this.rawmaterialinspectionService.remove(slNo);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Rawmaterialinspection001wb> {
		return this.rawmaterialinspectionService.findOne(id);
	}

	// @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	// @UseGuards(JwtAuthGuard, RolesGuard)
	// @Get(':findByItem')
	// c(@Param('findByItem') rawmaterialinspection001wb:number): Promise<Rawmaterialinspection001wb> {
	// 	return this.rawmaterialinspectionService.groupBy(rawmaterialinspection001wb);
	// }

}