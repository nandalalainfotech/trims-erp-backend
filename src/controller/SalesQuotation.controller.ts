import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Response } from "express";
import { Request } from "supertest";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { Salesquotation001wb } from "src/entity/SalesQuotation001wb";
import { SalesInvoiceDTO } from "src/dto/salesInvoice.dto";
import { SalesQuotationService } from "src/service/Salesquotation.service";
import { SalesQuotationDTO } from "src/dto/salesQuotation.dto";
var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/salesquotation')
export class SalesQuotationController {
    constructor(private readonly salesQuotationService: SalesQuotationService) { }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.salesQuotationService.downloadPdf(unitslno,request, response);
    }



    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:id/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadParamsPdf(@Param('id') id: number, @Param('unitslno') unitslno: number,@Res() response: Response) {
        return await this.salesQuotationService.downloadParamsPdf(id,unitslno, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:id/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel1(@Param('id') id: number, @Param('unitslno') unitslno: number,request: Request, @Res() response: Response) {
        return await this.salesQuotationService.downloadExcel1(id,unitslno, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.salesQuotationService.downloadExcel(unitslno,request, response);
    }

    
    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() salesQuotationDTO: SalesQuotationDTO): Promise<Salesquotation001wb> {
        return this.salesQuotationService.create(salesQuotationDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('getCount')
    getCount(): Promise<string> {
        return this.salesQuotationService.getCount();
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('getCount1')
    getCount1(): Promise<string> {
        return this.salesQuotationService.getCount1();
    }

    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() salesQuotationDTO: SalesQuotationDTO): Promise<Salesquotation001wb> {
        return this.salesQuotationService.update(salesQuotationDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll/:unitslno')
    findAll(@Param('unitslno') unitslno: number): Promise<Salesquotation001wb[]> {
        return this.salesQuotationService.findAll(unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Salesquotation001wb> {
        return this.salesQuotationService.findOne(id);
    }



    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: number): Promise<void> {
        return this.salesQuotationService.remove(id);
    }

}