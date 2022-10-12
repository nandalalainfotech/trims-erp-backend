import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ReturnstockDTO } from "src/dto/Returnstock.dto";
import { Returnstock001wb } from "src/entity/Returnstock001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { ReturnstockService } from "src/service/Returnstock.service";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/Returnstock')
export class ReturnstockController {
	constructor(private readonly returnstockService: ReturnstockService) { }

    // --------Item-Pdf---------------
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('itempdf/:id/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloaditemPdf(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
        return await this.returnstockService.downloaditemPdf(unitslno,id, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('itemexcel/:id/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloaditemExcel(@Param('unitslno') unitslno: number,@Param('id') id: number, request: Request, @Res() response: Response) {
        return await this.returnstockService.downloaditemExcel(unitslno,id, response);
    }

    // --------Consum-pdf------------

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('consumpdf/:id/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadconsumPdf(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
        return await this.returnstockService.downloadconsumPdf(unitslno,id, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('consumexcel/:id/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadconsumExcel(@Param('unitslno') unitslno: number,@Param('id') id: number, request: Request, @Res() response: Response) {
        return await this.returnstockService.downloadconsumExcel(unitslno,id, response);
    }


    // --------------cpart-pdf----------

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('cpartpdf/:id/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadcpartPdf(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
        return await this.returnstockService.downloadcpartPdf(unitslno,id, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('cpartexcel/:id/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadcpartExcel(@Param('unitslno') unitslno: number,@Param('id') id: number, request: Request, @Res() response: Response) {
        return await this.returnstockService.downloadcpartExcel(unitslno,id, response);
    }

    // -------------part-pdf----------

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('partpdf/:id/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadpartPdf(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
        return await this.returnstockService.downloadpartPdf(unitslno,id, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('partexcel/:id/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadpartExcel(@Param('unitslno') unitslno: number,@Param('id') id: number, request: Request, @Res() response: Response) {
        return await this.returnstockService.downloadpartExcel(unitslno,id, response);
    }


     // --------Item-Pdf---------------
	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('itemFullpdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloaditemFullPdf(@Param('unitslno') unitslno: number, @Res() response: Response) {
        return await this.returnstockService.downloaditemFullPdf(unitslno, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('itemFullexcel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloaditemFullExcel(@Param('unitslno') unitslno: number, request: Request, @Res() response: Response) {
        return await this.returnstockService.downloaditemFullExcel(unitslno, response);
    }

    // --------Consum-pdf------------

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('consumFullpdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadconsumFullPdf(@Param('unitslno') unitslno: number, @Res() response: Response) {
        return await this.returnstockService.downloadconsumFullPdf(unitslno, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('consumFullexcel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadconsumFullExcel(@Param('unitslno') unitslno: number,@Param('id') id: number, request: Request, @Res() response: Response) {
        return await this.returnstockService.downloadconsumFullExcel(unitslno, response);
    }


    // --------------cpart-pdf----------

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('cpartFullpdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadcpartFullPdf(@Param('unitslno') unitslno: number, @Res() response: Response) {
        return await this.returnstockService.downloadcpartFullPdf(unitslno, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('cpartFullexcel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadcpartFullExcel(@Param('unitslno') unitslno: number, request: Request, @Res() response: Response) {
        return await this.returnstockService.downloadcpartFullExcel(unitslno, response);
    }

    // -------------part-pdf----------

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('partFullpdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadpartFullPdf(@Param('unitslno') unitslno: number, @Res() response: Response) {
        return await this.returnstockService.downloadpartFullPdf(unitslno, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('partFullexcel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadpartFullExcel(@Param('unitslno') unitslno: number, request: Request, @Res() response: Response) {
        return await this.returnstockService.downloadpartFullExcel(unitslno, response);
    }

	@hasRole(Role.superadmin, Role.admin, Role.user)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() returnstockDTO: ReturnstockDTO): Promise<Returnstock001wb> {
		return this.returnstockService.create(returnstockDTO);
	}

	@hasRole(Role.superadmin, Role.admin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() returnstockDTO: ReturnstockDTO): Promise<Returnstock001wb> {
		return this.returnstockService.update(returnstockDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll/:unitslno')
	findAll(@Param('unitslno') unitslno: number): Promise<Returnstock001wb[]> {
		return this.returnstockService.findAll(unitslno);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<Returnstock001wb> {
		return this.returnstockService.findOne(id);
	}

    @hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.returnstockService.remove(id);
	}
}