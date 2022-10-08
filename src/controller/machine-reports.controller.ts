import { Controller, Header, Get, Param, Req, Res, UseGuards } from "@nestjs/common";
var path = require('path');
const fs = require('fs');
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { MachineReportsService } from "src/service/machine-reports.service";
import { Request } from "supertest";


@Controller('/testandreportstudio/api/machineReports')
export class MachineReportsController {

    constructor(private readonly machineReportsService: MachineReportsService) { }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:mslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.machineReportsService.downloadPdf(mslno, request, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:mslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.machineReportsService.downloadExcel(mslno, request, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:mslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel1(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.machineReportsService.downloadExcel(mslno, request, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:mslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel2(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.machineReportsService.downloadExcel(mslno, request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:mslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel3(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.machineReportsService.downloadExcel(mslno, request, response);
    }
}