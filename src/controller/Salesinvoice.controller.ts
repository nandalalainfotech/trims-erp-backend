import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Response } from "express";
import { Request } from "supertest";
import { SalesInvoiceService } from "src/service/SalesInvoice.service";
import { Salesinvoice001wb } from "src/entity/Salesinvoice001wb";
import { SalesInvoiceDTO } from "src/dto/salesInvoice.dto";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/salesinvocie')
export class SalesInvoiceController {
    constructor(private readonly salesInvoiceService: SalesInvoiceService) { }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.salesInvoiceService.downloadPdf(unitslno,request, response);
    }



    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:id/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadParamsPdf(@Param('id') id: number, @Param('unitslno') unitslno: number,@Res() response: Response) {
        return await this.salesInvoiceService.downloadParamsPdf(id,unitslno, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:id/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel1(@Param('id') id: number, @Param('unitslno') unitslno: number,request: Request, @Res() response: Response) {
        return await this.salesInvoiceService.downloadExcel1(id,unitslno, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.salesInvoiceService.downloadExcel(unitslno,request, response);
    }

    
    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() salesInvoiceDTO: SalesInvoiceDTO): Promise<Salesinvoice001wb> {
        return this.salesInvoiceService.create(salesInvoiceDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('getCount')
    getCount(): Promise<string> {
        return this.salesInvoiceService.getCount();
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('getCount1')
    getCount1(): Promise<string> {
        return this.salesInvoiceService.getCount1();
    }

    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() salesInvoiceDTO: SalesInvoiceDTO): Promise<Salesinvoice001wb> {
        return this.salesInvoiceService.update(salesInvoiceDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll/:unitslno')
    findAll(@Param('unitslno') unitslno: number): Promise<Salesinvoice001wb[]> {
        return this.salesInvoiceService.findAll(unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Salesinvoice001wb> {
        return this.salesInvoiceService.findOne(id);
    }



    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: number): Promise<void> {
        return this.salesInvoiceService.remove(id);
    }

}