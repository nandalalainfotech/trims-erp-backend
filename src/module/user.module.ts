import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/user.controller';
import { Person001mb } from 'src/entity/Person001mb';
import { User001mb } from 'src/entity/User001mb';
import { RolesGuard } from 'src/role/role.guard';
import { UserService } from 'src/service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User001mb, Person001mb])],
  providers: [UserService, RolesGuard],
  controllers: [UserController],
  exports: [UserService,]
})
export class UserModule { }