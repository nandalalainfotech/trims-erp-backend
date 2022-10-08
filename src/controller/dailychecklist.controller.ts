import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { DailyChecklistDTO } from "src/dto/DailyChecklist.dto";
import { Dailychecklist001wb } from "src/entity/Dailychecklist001wb";
import { DailyCheckListService } from "src/service/dailychecklist.service";
import { Response } from "express";
import { Request } from "supertest";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
var path = require('path');
const fs = require('fs')


@Controller('/testandreportstudio/api/dailychecklist')
export class DailyCheckListController {
    constructor(private readonly dailyChecklistService: DailyCheckListService) { }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll')
    findAll(): Promise<Dailychecklist001wb[]> {
        return this.dailyChecklistService.findAll();
    }

    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() dailyChecklistDTO: DailyChecklistDTO): Promise<Dailychecklist001wb> {
        return this.dailyChecklistService.create(dailyChecklistDTO);
    }

    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() dailyChecklistDTO: DailyChecklistDTO): Promise<Dailychecklist001wb> {
        return this.dailyChecklistService.update(dailyChecklistDTO);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:slNo')
    remove(@Param('slNo') slNo: number): Promise<void> {
        return this.dailyChecklistService.remove(slNo);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Dailychecklist001wb> {
        return this.dailyChecklistService.findOne(id);
    }



    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAllByMachineId/:mslno/:unitslno')
    findAllByMachineId(@Param('mslno') mslno: number, @Param('unitslno') unitslno: number,): Promise<Dailychecklist001wb[]> {
        return this.dailyChecklistService.findAllByMachineId(mslno, unitslno);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:mslno/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('mslno') mslno: any,@Param('unitslno') unitslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.dailyChecklistService.downloadPdf(mslno,unitslno, request, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:mslno/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('mslno') mslno: any,@Param('unitslno') unitslno: any, @Req() request: Request, @Res() response: Response) {
        return await this.dailyChecklistService.downloadExcel(mslno,unitslno, request, response);
    }
}