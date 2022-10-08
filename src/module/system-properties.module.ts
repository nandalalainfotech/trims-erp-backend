import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemPropertiesController } from 'src/controller/system-properties.controller';
import { Person001mb } from 'src/entity/Person001mb';
import { Systemproperties001mb } from 'src/entity/Systemproperties001mb';
import { User001mb } from 'src/entity/User001mb';
import { SystemPropertiesService } from 'src/service/system-properties.service';

@Module({
  imports: [TypeOrmModule.forFeature([Systemproperties001mb,User001mb,Person001mb])],
  providers: [SystemPropertiesService],
  controllers: [SystemPropertiesController],
})
export class SystemPropertiesModule {}
