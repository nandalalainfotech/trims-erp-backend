import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierauditDTO } from "src/dto/supplieraudit.dto";
import { Supplieraudit001wb } from "src/entity/Supplieraudit001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { SupplierAuditService } from "src/service/supplierAudit.service";
import { Request } from "supertest";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/supaudit')
export class SupplierAuditController {
    constructor(private readonly supplierAuditService: SupplierAuditService) { }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findNotification/:unitslno')
    findNotification(@Param('unitslno') unitslno: number): Promise<Supplieraudit001wb[]> {
        return this.supplierAuditService.findNotification(unitslno);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() supplierauditDTO: SupplierauditDTO): Promise<Supplieraudit001wb> {
        return this.supplierAuditService.create(supplierauditDTO);
    }

    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() supplierauditDTO: SupplierauditDTO): Promise<Supplieraudit001wb> {
        return this.supplierAuditService.update(supplierauditDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll')
    findAll(): Promise<Supplieraudit001wb[]> {
        return this.supplierAuditService.findAll();
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAllBySupplierId/:supregslno/:unitslno')
    findAllBySupplierId(@Param('supregslno') supregslno: number, @Param('unitslno') unitslno: number): Promise<Supplieraudit001wb[]> {
        return this.supplierAuditService.findAllBySupplierId(supregslno, unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Supplieraudit001wb> {
        return this.supplierAuditService.findOne(id);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.supplierAuditService.remove(id);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:supregslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('supregslno') supregslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.supplierAuditService.downloadPdf(supregslno, request, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:supregslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('supregslno') supregslno: any, @Req() request: Request, @Res() response: Response) {

        return await this.supplierAuditService.downloadExcel(supregslno, request, response);
    }
}