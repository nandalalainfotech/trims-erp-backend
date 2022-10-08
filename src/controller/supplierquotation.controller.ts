import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { SupplierQuotationDTO } from "src/dto/supplierquotation.dto";
import { Supplierquotation001wb } from "src/entity/Supplierquotation001wb";
import { SupplierQuotationService } from "src/service/supplierquotation.service";
import { Request } from "supertest";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
var path = require('path');
const fs = require('fs');
@Controller('/testandreportstudio/api/supquotation')
export class SupplierQuotationController {
    constructor(private readonly supplierQuotationService: SupplierQuotationService) { }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.supplierQuotationService.downloadPdf(unitslno,request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:id/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadParamsPdf(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
        return await this.supplierQuotationService.downloadParamsPdf(unitslno,id, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.supplierQuotationService.downloadExcel(unitslno,request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:id/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel1(@Param('unitslno') unitslno: number,@Param('id') id: number, request: Request, @Res() response: Response) {
        return await this.supplierQuotationService.downloadExcel1(unitslno,id, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {
        return this.supplierQuotationService.create1(supplierQuotationDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('fileSave')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Body() supplierQuotationDTO: SupplierQuotationDTO) {
        return this.supplierQuotationService.create2(file, supplierQuotationDTO);
    }

 
    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {
        return this.supplierQuotationService.update(supplierQuotationDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('fileUpdate')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile1(@UploadedFile() file: Express.Multer.File, @Body() supplierQuotationDTO: SupplierQuotationDTO): Promise<Supplierquotation001wb> {
        return this.supplierQuotationService.update1(file, supplierQuotationDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll/:unitslno')
    findAll(@Param('unitslno') unitslno: number): Promise<Supplierquotation001wb[]> {
        return this.supplierQuotationService.findAll(unitslno);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAllbySupplierId/:poslNo')
    findAllbySupplierId(@Param('poslNo') poslNo: number): Promise<Supplierquotation001wb[]> {
        return this.supplierQuotationService.findAllbySupplierId(poslNo);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Supplierquotation001wb> {
        return this.supplierQuotationService.findOne(id);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('UpdateSupplierQuotation/:approvel/:pchaseslno/:remarks')
    UpdateSupplierQuotation(@Param('approvel') approvel: any, @Param('pchaseslno') pchaseslno: any, @Param('remarks') remarks: any): Promise<Supplierquotation001wb> {
        return this.supplierQuotationService.UpdateSupplierQuotation(approvel, pchaseslno, remarks);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.supplierQuotationService.remove(id);
    }
}