import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MaterialinspectionDTO } from "src/dto/Materialinspection.dto";
import { Materialinspection001wb } from "src/entity/MaterialInspection001wb";

import { MaterialinspectionService } from "src/service/Materialinspection.service";
import { Response } from "express";
import { Request } from "supertest";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');


@Controller(`/testandreportstudio/api/materialinspect`)
export class MaterialinspectionController {
    constructor(private readonly materialinspectionService: MaterialinspectionService) { }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll/:unitslno')
    findAll(@Param('unitslno') unitslno: number): Promise<Materialinspection001wb[]> {
        return this.materialinspectionService.findAll(unitslno);
    }
    
    @Get('pdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.materialinspectionService.downloadPdf(unitslno,request, response);
    }


    @Get('excel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.materialinspectionService.downloadExcel(unitslno,request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:id/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadIDPdf(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
        return await this.materialinspectionService.downloadIDPdf(unitslno,id, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:id/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadIDExcel(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
        return await this.materialinspectionService.downloadIDExcel(unitslno,id, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('save')
    create(@Body() materialinspectionDTO: MaterialinspectionDTO) {
        return this.materialinspectionService.create(materialinspectionDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('getCount')
    getCount(): Promise<string> {
        return this.materialinspectionService.getCount();
    }

    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() materialinspectionDTO: MaterialinspectionDTO) {
        return this.materialinspectionService.update(materialinspectionDTO);
    }

    

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:slNo')
    remove(@Param('slNo') slNo: number): Promise<void> {
        return this.materialinspectionService.remove(slNo);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Materialinspection001wb> {
        return this.materialinspectionService.findOne(id);
    }





}