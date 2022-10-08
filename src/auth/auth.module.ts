import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controller/auth.controller';
import { Person001mb } from 'src/entity/Person001mb';
import { Role001mb } from 'src/entity/Role001mb';
import { User001mb } from 'src/entity/User001mb';
import { RolesGuard } from 'src/role/role.guard';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User001mb, Person001mb, Role001mb]),
        JwtModule.registerAsync({
            imports: [ConfigModule], // Missing this
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '5000s' }
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, JwtStrategy, RolesGuard],
    controllers: [AuthController],
    exports: [AuthService, RolesGuard]
})

export class AuthModule { }