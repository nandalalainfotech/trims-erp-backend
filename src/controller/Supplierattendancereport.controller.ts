import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierattendancereportDTO } from "src/dto/Supplierattendancereport.dto";
import { Supplierattendancereport001wb } from "src/entity/Supplierattendancereport001wb";
import { SupplierattendanceService } from "src/service/Supplierattendancereport.service";
import { Request } from "supertest";
import { Response } from "express";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/attendanceReport')
export class SupplierattendanceController {
    constructor(private readonly supplierattendanceService: SupplierattendanceService) { }

    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() supplierattendancereportDTO: SupplierattendancereportDTO): Promise<Supplierattendancereport001wb> {
        return this.supplierattendanceService.create(supplierattendancereportDTO);
    }

    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() supplierattendancereportDTO: SupplierattendancereportDTO): Promise<Supplierattendancereport001wb> {
        return this.supplierattendanceService.update(supplierattendancereportDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll')
    findAll(): Promise<Supplierattendancereport001wb[]> {
        return this.supplierattendanceService.findAll();
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAllBySupplierId/:supregslNo/:unitslno')
    findAllBySupplierId(@Param('supregslNo') supregslNo: number, @Param('unitslno') unitslno: number): Promise<Supplierattendancereport001wb[]> {
        return this.supplierattendanceService.findAllBySupplierId(supregslNo, unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Supplierattendancereport001wb> {
        return this.supplierattendanceService.findOne(id);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.supplierattendanceService.remove(id);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:supregslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('supregslno') supregslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.supplierattendanceService.downloadPdf(supregslno, request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:supregslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('supregslno') supregslno: any, @Req() request: Request, @Res() response: Response) {

        return await this.supplierattendanceService.downloadExcel(supregslno, request, response);
    }
}