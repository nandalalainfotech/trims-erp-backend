import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Response } from "express";
import { Request } from "supertest";
import { FixturedailychecklistDTO } from "src/dto/Fixturedailychecklist.dto";
import { FixturedailychecklistService } from "src/service/Fixturedailychecklist.service";
import { Fixturedailychecklist001wb } from "src/entity/Fixturedailychecklist001wb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
var path = require('path');
const fs = require('fs')


@Controller('/testandreportstudio/api/dailychecklist')
export class FixturDailyCheckListController {
    constructor(private readonly fixturedailychecklistService: FixturedailychecklistService) { }

// @Get('pdf/:mslno')
    // @Header('Content-Type', 'application/pdf')
    // async downloadPdf(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
    // 	return await this.fixturedailychecklistService.downloadPdf(mslno, request, response);
    // }


    // @Get('excel/:mslno')
    // @Header("Content-Type",
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    // @Header("Content-Disposition",
    //     "attachment; filename=" + "Attendace Report" + ".xlsx")
    // async downloadExcel(@Param('mslno') mslno: any, @Req() request: Request, @Res() response: Response) {
    //     return await this.fixturedailychecklistService.downloadExcel(mslno, request, response);
    // }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll/:unitslno')
    findAll(@Param('unitslno') unitslno: number): Promise<Fixturedailychecklist001wb[]> {
        return this.fixturedailychecklistService.findAll(unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() fixturedailychecklistDTO: FixturedailychecklistDTO): Promise<Fixturedailychecklist001wb> {
        return this.fixturedailychecklistService.create(fixturedailychecklistDTO);
    }

    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() fixturedailychecklistDTO: FixturedailychecklistDTO): Promise<Fixturedailychecklist001wb> {
        return this.fixturedailychecklistService.update(fixturedailychecklistDTO);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:slNo')
    remove(@Param('slNo') slNo: number): Promise<void> {
        return this.fixturedailychecklistService.remove(slNo);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Fixturedailychecklist001wb> {
        return this.fixturedailychecklistService.findOne(id);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAllByMachineId/:mslno/:unitslno')
    findAllByMachineId(@Param('mslno') mslno: number, @Param('unitslno') unitslno: number): Promise<Fixturedailychecklist001wb[]> {
        return this.fixturedailychecklistService.findAllByMachineId(mslno, unitslno);
    }

    
}