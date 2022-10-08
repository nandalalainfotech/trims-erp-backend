import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Observable } from "rxjs";
import { User001mb } from "src/entity/User001mb";
import { Repository } from "typeorm";
import { ROLES_KEY } from "./role.decorator";
import { Role } from "./role.enum";



@Injectable()
export class RolesGuard implements CanActivate {
    constructor(@InjectRepository(User001mb) private readonly userRepository: Repository<User001mb>,
        private reflector: Reflector) { }


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (!roles) {
            return true;
        }

        const user = context.switchToHttp().getRequest();
      
        
        if (user && user.user && user.user.username) {
            return this.userRepository.find({ relations: ['role'],  where: { username: user.user.username, } }).then((users: User001mb[]) => {
                let user001mb: User001mb = users[0];

                
                const hasRole = () => roles.indexOf(Role[user001mb.role.rolename]) > -1;
                let hasPermission: boolean = false;
                if (hasRole()) {
                    hasPermission = true;
                };
                return hasRole && hasPermission;
            });
        }
        else {
            return false
        }
    }
}