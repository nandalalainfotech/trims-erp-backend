import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PurchaseInvoicePayDTO } from "src/dto/PurchaseInvoicePay.dto";
import { Purchaseinvoicepay001wb } from "src/entity/Purchaseinvoicepay001wb";
import { hasRole } from "src/role/role.decorator";
import { Response } from "express";
import { Request } from "supertest";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { PurchaseInvoicePayService } from "src/service/PurchaseInvoicePay.service";
var path = require('path');
const fs = require('fs');

@Controller('/testandreportstudio/api/PurchaseInvoicePay')
export class PurchaseInvoicePayController {
    constructor(private readonly purchaseInvoicePayService: PurchaseInvoicePayService) { }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadPdf(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.purchaseInvoicePayService.downloadPdf(unitslno,request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('pdf/:id/:unitslno')
    @Header('Content-Type', 'application/pdf')
    async downloadParamsPdf(@Param('unitslno') unitslno: number,@Param('id') id: number, @Res() response: Response) {
        return await this.purchaseInvoicePayService.downloadParamsPdf(unitslno,id, response);
    }


    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:id/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel1(@Param('unitslno') unitslno: number,@Param('id') id: number, request: Request, @Res() response: Response) {
        return await this.purchaseInvoicePayService.downloadExcel1(unitslno,id, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('excel/:unitslno')
    @Header("Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Header("Content-Disposition",
        "attachment; filename=" + "Attendace Report" + ".xlsx")
    async downloadExcel(@Param('unitslno') unitslno: number,@Req() request: Request, @Res() response: Response) {
        return await this.purchaseInvoicePayService.downloadExcel(unitslno,request, response);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() purchaseInvoicePayDTO: PurchaseInvoicePayDTO): Promise<Purchaseinvoicepay001wb> {
        return this.purchaseInvoicePayService.create1(purchaseInvoicePayDTO);
    }
    
    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('fileSave')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Body() purchaseInvoicePayDTO: PurchaseInvoicePayDTO) {
        return this.purchaseInvoicePayService.create2(file, purchaseInvoicePayDTO);
    }

    
    @hasRole(Role.superadmin, Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() purchaseInvoicePayDTO: PurchaseInvoicePayDTO): Promise<Purchaseinvoicepay001wb> {
        return this.purchaseInvoicePayService.update(purchaseInvoicePayDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('fileUpdate')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile1(@UploadedFile() file: Express.Multer.File, @Body() purchaseInvoicePayDTO: PurchaseInvoicePayDTO): Promise<Purchaseinvoicepay001wb> {
        return this.purchaseInvoicePayService.update1(file, purchaseInvoicePayDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll/:unitslno')
    findAll(@Param('unitslno') unitslno: number): Promise<Purchaseinvoicepay001wb[]> {
        return this.purchaseInvoicePayService.findAll(unitslno);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.purchaseInvoicePayService.remove(id);
    }

}