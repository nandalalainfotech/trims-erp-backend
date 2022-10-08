import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UnitDepartMasterDTO } from "src/dto/unitdepartmaster.dto";
import { Unitdeptmaster001mb } from "src/entity/Unitdeptmaster001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { UnitDepartMasterService } from "src/service/unitdepartmaster.service";

@Controller('/testandreportstudio/api/unitdepartment')
export class UnitDepartMasterController {
    constructor(private readonly unitDepartMasterService: UnitDepartMasterService) { }


    // @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll')
    findAll(): Promise<Unitdeptmaster001mb[]> {
        return this.unitDepartMasterService.findAll();
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() unitDepartMasterDTO: UnitDepartMasterDTO): Promise<Unitdeptmaster001mb> {
        return this.unitDepartMasterService.create(unitDepartMasterDTO);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() unitDepartMasterDTO: UnitDepartMasterDTO): Promise<Unitdeptmaster001mb> {
        return this.unitDepartMasterService.update(unitDepartMasterDTO);
    }

    // @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Unitdeptmaster001mb> {
        return this.unitDepartMasterService.findOne(id);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.unitDepartMasterService.remove(id);
    }
}