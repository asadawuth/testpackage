import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { DatabaseModule } from '../database';
@Module({
  imports: [DatabaseModule],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule {}
