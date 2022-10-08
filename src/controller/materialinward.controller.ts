import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MaterialinwardService } from "src/service/materialinward.service";
import { Materialinward001wb } from "src/entity/Materialinward001wb";
import { MaterialinwardDTO } from "src/dto/Materialinward.dto";
import { Response } from "express";
import { Request } from "supertest";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

var path = require('path');
const fs = require('fs');


@Controller('/testandreportstudio/api/materialinward')

export class MaterialinwardController {
    constructor(private readonly materialinwardService: MaterialinwardService) { }
    
    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll/:unitslno')
    findAll(@Param('unitslno') unitslno: number): Promise<Materialinward001wb[]> {
        return this.materialinwardService.findAll(unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.materialinwardService.downloadPdf(unitslno,request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.materialinwardService.downloadExcel(unitslno,request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:id/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadIDPdf(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
        return await this.materialinwardService.downloadIDPdf(unitslno,id, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:id/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadIDExcel(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
        return await this.materialinwardService.downloadIDExcel(unitslno,id, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('UpdateMaterialinward/:approvel/:materialSlno/:remarks')
    UpdateMaterialinward(@Param('approvel') approvel: any, @Param('materialSlno') materialSlno: any, @Param('remarks') remarks: any): Promise<Materialinward001wb> {
        return this.materialinwardService.UpdateMaterialinward(approvel, materialSlno, remarks);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('getCount')
    getCount(): Promise<string> {
        return this.materialinwardService.getCount();
    }

    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() materialinwardDTO: MaterialinwardDTO): Promise<Materialinward001wb> {
        return this.materialinwardService.create(materialinwardDTO);
    }

    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() materialinwardDTO: MaterialinwardDTO): Promise<Materialinward001wb> {
        return this.materialinwardService.update(materialinwardDTO);
    }

   

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Materialinward001wb> {
        return this.materialinwardService.findOne(id);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.materialinwardService.remove(id);
    }

}