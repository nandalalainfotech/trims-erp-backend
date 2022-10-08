import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PersonDTO } from "src/dto/person.dto";
import { Person001mb } from "src/entity/Person001mb";
import { hasRole } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { PersonService } from "src/service/person.service";

@Controller('/testandreportstudio/api/person')
export class PersonController {
    constructor(private readonly personService: PersonService) { }
    // --------------------------user registration-------------
    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("regSave")
    create1(@Body() personDTO: PersonDTO): Promise<Person001mb> {
        return this.personService.create(personDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('regFindAll')
    findAll1(): Promise<Person001mb[]> {
        return this.personService.findAll();
    }
    // --------------------------user registration-------------

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post("save")
    create(@Body() personDTO: PersonDTO): Promise<Person001mb> {
        return this.personService.create(personDTO);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update")
    update(@Body() personDTO: PersonDTO): Promise<Person001mb> {
        return this.personService.update(personDTO);
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('findAll')
    findAll(): Promise<Person001mb[]> {
        return this.personService.findAll();
    }

    @hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Person001mb> {
        return this.personService.findOne(id);
    }

    @hasRole(Role.superadmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.personService.remove(id);
    }
}