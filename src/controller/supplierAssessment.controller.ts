import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierAssessmentDTO } from "src/dto/supplierAssessment.dto";
import { Supplierassessment001wb } from "src/entity/Supplierassessment001wb";
import { SupplierAssessmentService } from "src/service/supplierAssessment.service";
import { Request } from "supertest";
import { Response } from "express";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";


var path = require('path');
const fs = require('fs');



@Controller('/testandreportstudio/api/assessment')
export class SupplierAssessmentController {
    constructor(private readonly supplierAssessmentService: SupplierAssessmentService) { }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:suppSlno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('suppSlno') suppSlno: any, @Req() request: Request, @Res() response: Response) {
        return await this.supplierAssessmentService.downloadPdf(suppSlno, request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:suppSlno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('suppSlno') suppSlno: any, @Req() request: Request, @Res() response: Response) {

        return await this.supplierAssessmentService.downloadExcel(suppSlno, request, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() supplierAssessmentDTO: SupplierAssessmentDTO): Promise<Supplierassessment001wb> {
        return this.supplierAssessmentService.create(supplierAssessmentDTO);
    }

    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() supplierAssessmentDTO: SupplierAssessmentDTO): Promise<Supplierassessment001wb> {
        return this.supplierAssessmentService.update(supplierAssessmentDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll')
    findAll(): Promise<Supplierassessment001wb[]> {
        return this.supplierAssessmentService.findAll();
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAllBySupplierId/:suppSlno/:unitslno')
    findAllBySupplierId(@Param('suppSlno') suppSlno: number, @Param('unitslno') unitslno: number): Promise<Supplierassessment001wb[]> {
        return this.supplierAssessmentService.findAllBySupplierId(suppSlno, unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Supplierassessment001wb> {
        return this.supplierAssessmentService.findOne(id);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.supplierAssessmentService.remove(id);
    }
}