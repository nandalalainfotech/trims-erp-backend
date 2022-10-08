import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'src/dto/User.dto';
import { Person001mb } from 'src/entity/Person001mb';
import { Role001mb } from 'src/entity/Role001mb';
import { User001mb } from 'src/entity/User001mb';
import { MailService } from 'src/mail/mail.service';
import { CustomerConsigneeModule } from 'src/module/customer-consignee.module';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
	saltRounds = 10;

	constructor(private mailService: MailService,
		@InjectRepository(User001mb) private readonly userRepository: Repository<User001mb>,
) { }

	async create(userDTO: UserDTO): Promise<User001mb> {
		let users : User001mb[]=[];
		users = await this.userRepository.find({ relations: ["dpslno2", "role","unitslno2"] });
		for(let i=0; i<users.length; i++){
			if(userDTO.username.toLowerCase() == users[i].username.toLowerCase()){
				throw new HttpException('User Name Already Exist', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		const user001mb = new User001mb();
		user001mb.setProperties(userDTO);  
		user001mb.password = "erpnext001";
		const hash = await bcrypt.hash(user001mb.password, this.saltRounds);
		user001mb.password = hash;
		// user001mb.dpslno2.department = userDTO.dpslno2.department;

		await this.userRepository.save(user001mb);
		await this.mailService.sendUserConfirmation(user001mb);
		return user001mb;
	}

	async updateRole(userDTO: UserDTO): Promise<User001mb> {

		const user001mb = await this.userRepository.findOne({ relations: ["role"], where: { personId: userDTO.personId } });

		user001mb.roleid = userDTO.roleid;
		let role001mb = new Role001mb();
		role001mb.id = userDTO.roleid;
		user001mb.role = role001mb;
		return this.userRepository.save(user001mb);
	}


	async update(userDTO: UserDTO): Promise<User001mb> {
		const user001mb = new User001mb();
		user001mb.dpslno = userDTO.dpslno;
		user001mb.unitslno = userDTO.unitslno;
		user001mb.firstname = userDTO.firstname;
		user001mb.lastname = userDTO.lastname;
		user001mb.username = userDTO.username;
		user001mb.roleid = userDTO.roleid;
		user001mb.status = userDTO.status;
		user001mb.email = userDTO.email;
		user001mb.securityquestion = userDTO.securityquestion;
		user001mb.securityanswer = userDTO.securityanswer;
		user001mb.updatedUser = userDTO.updatedUser;
		user001mb.updatedDatetime = userDTO.updatedDatetime;
		user001mb.updatedUser = userDTO.updatedUser;
		user001mb.updatedDatetime = userDTO.updatedDatetime;

		await this.userRepository.update({ personId: userDTO.personId }, user001mb);
		return user001mb;
	}

	async updatePassword(userDTO: UserDTO): Promise<User001mb> {
		const hash = await bcrypt.hash(userDTO.password, this.saltRounds);
		userDTO.password = hash;
		const user001mb = await this.userRepository.findOne({ where: { personId: userDTO.personId } });
		user001mb.password = userDTO.password;
		user001mb.status = "A";
		return this.userRepository.save(user001mb);
	}

	async updateUserName(user: any): Promise<User001mb> {
		const user001mb = await this.userRepository.findOne({ where: { personId: user.personId } });
		user001mb.username = user.username;
		return this.userRepository.save(user001mb);
	}

	async update1(updateTheme: any): Promise<User001mb> {
		const user001mb = await this.userRepository.findOne({ where: { personId: updateTheme.personId } });
		user001mb.theme = updateTheme.theme;
		return this.userRepository.save(user001mb);
	}

	async findAll(): Promise<User001mb[]> {
		return this.userRepository.find({ relations: ["dpslno2", "role","unitslno2"] });
	}

	findOne(personId: number): Promise<User001mb> {
		return this.userRepository.findOne(personId);
	}

	async remove(id: number): Promise<void> {
		await this.userRepository.delete(id);
		// await this.personRepository.delete(id);
	}
}