import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDTO } from 'src/dto/User.dto';
import { User001mb } from 'src/entity/User001mb';
import { hasRole } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { UserService } from 'src/service/user.service';


@Controller('/testandreportstudio/api/user')
export class UserController {
	constructor(private readonly userService: UserService) { }
	// --------------------------user registration-------------
	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("Registersave")
	create1(@Body() userDTO: UserDTO): Promise<User001mb> {
		return this.userService.create(userDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('registerfindAll')
	findAll1(): Promise<User001mb[]> {
		return this.userService.findAll();
	}
	// --------------------------user registration end-------------
	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("save")
	create(@Body() userDTO: UserDTO): Promise<User001mb> {
		return this.userService.create(userDTO);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("update")
	update(@Body() userDTO: UserDTO): Promise<User001mb> {
		return this.userService.update(userDTO);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put("updateRole")
	updateRole(@Body() roleid: any): Promise<User001mb> {
		return this.userService.updateRole(roleid);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post("updateUserTheme")
	updateUserTheme(@Body() updateTheme: any): Promise<User001mb> {
		return this.userService.update1(updateTheme);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('updateUserName')
	updateUserName(@Body() userName: any): Promise<User001mb> {
		return this.userService.updateUserName(userName);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post('updatePassword')
	updatePassword(@Body() userDTO: UserDTO): Promise<User001mb> {
		return this.userService.updatePassword(userDTO);
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('findAll')
	findAll(): Promise<User001mb[]> {
		return this.userService.findAll();
	}

	@hasRole(Role.superadmin, Role.admin, Role.user, Role.guest)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':personId')
	findOne(@Param('personId') personId: number): Promise<User001mb> {
		return this.userService.findOne(personId);
	}

	@hasRole(Role.superadmin)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete('delete/:id')
	remove(@Param('id') id: number): Promise<void> {
		return this.userService.remove(id);
	}
}

