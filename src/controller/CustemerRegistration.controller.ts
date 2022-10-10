import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Response } from "express";
import { Request } from "supertest";
import { CustemerRegistrationService } from "src/service/CustemerRegistration.service";
import { CustemerRegistrationDTO } from "src/dto/custemerRegistration.dto";
import { Custemerregistration001mb } from "src/entity/Custemerregistration001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/custemerReg')
export class CustemerRegistrationController {
    constructor(private readonly CustemerRegiService: CustemerRegistrationService) { }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.CustemerRegiService.downloadPdf(unitslno,request, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.CustemerRegiService.downloadExcel(unitslno,request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('pdfId/:id/:unitslno')
	@Header('Content-Type', 'application/pdf')
	async downloadIDPdf(@Param('unitslno') unitslno: number,@Param('id') id: number,@Req() request: Request, @Res() response: Response) {
		return await this.CustemerRegiService.downloadIDPdf(unitslno,id, request,response);
	}

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('excelID/:id/:unitslno')
	@Header("Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	@Header("Content-Disposition",
		"attachment; filename=" + "Attendace Report" + ".xlsx")
	async downloadIDExcel(@Param('unitslno') unitslno: number,@Param('id') id: number,@Req() request: Request, @Res() response: Response) {
		return await this.CustemerRegiService.downloadIDExcel(unitslno,id,request, response);
	}

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('getCount')
    getCount(): Promise<string> {
        return this.CustemerRegiService.getCount();
    }

    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() custemerRegDTO: CustemerRegistrationDTO): Promise<Custemerregistration001mb> {
        return this.CustemerRegiService.create(custemerRegDTO);
    }

    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() custemerRegDTO: CustemerRegistrationDTO): Promise<Custemerregistration001mb> {
        return this.CustemerRegiService.update(custemerRegDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll/:unitslno')
    findAll(@Param('unitslno') unitslno: number): Promise<Custemerregistration001mb[]> {
        return this.CustemerRegiService.findAll(unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAllSlNoAndSuppcode')
    findAllSlNoAndSuppcode(): Promise<Custemerregistration001mb[]> {
        return this.CustemerRegiService.findAllSlNoAndSuppcode();
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Custemerregistration001mb> {
        return this.CustemerRegiService.findOne(id);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.CustemerRegiService.remove(id);
    }


}