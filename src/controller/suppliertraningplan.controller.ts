import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SuppliertrainingplanDTO } from "src/dto/Suppliertraningplan.dto";
import { Suppliertrainingplan001wb } from "src/entity/Suppliertrainingplan001wb";
import { SuppliertrainingService } from "src/service/suppliertraningplan.service";
import { Request } from "supertest";
import { Response } from "express";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/suptraining')
export class SuppliertrainingController {
    constructor(private readonly suppliertrainingService: SuppliertrainingService) { }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('NotificationAll/:unitslno')
    NotificationAll(@Param('unitslno') unitslno: number): Promise<Suppliertrainingplan001wb[]> {
        return this.suppliertrainingService.NotificationAll(unitslno);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() suppliertrainingplanDTO: SuppliertrainingplanDTO): Promise<Suppliertrainingplan001wb> {
        return this.suppliertrainingService.create(suppliertrainingplanDTO);
    }

    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() suppliertrainingplanDTO: SuppliertrainingplanDTO): Promise<Suppliertrainingplan001wb> {
        return this.suppliertrainingService.update(suppliertrainingplanDTO);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll/:unitslno')
    findAll(@Param('unitslno') unitslno: number): Promise<Suppliertrainingplan001wb[]> {
        return this.suppliertrainingService.findAll(unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAllBySupplierId/:supregslno/:unitslno')
    findAllBySupplierId(@Param('supregslno') supregslno: number, @Param('unitslno') unitslno: number): Promise<Suppliertrainingplan001wb[]> {
        return this.suppliertrainingService.findAllBySupplierId(supregslno, unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Suppliertrainingplan001wb> {
        return this.suppliertrainingService.findOne(id);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.suppliertrainingService.remove(id);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:supregslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('supregslno') supregslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.suppliertrainingService.downloadPdf(supregslno, request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:supregslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('supregslno') supregslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.suppliertrainingService.downloadExcel(supregslno, request, response);
    }
}