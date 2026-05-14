import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto, UserUsePackageDto } from './package.validate.dto';
import { PaginationDto } from '../common/padination/pagination';
@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  create(@Body() dto: CreatePackageDto) {
    return this.packageService.createPackage(dto);
  }

  @Post('user-use-package')
  createUserUsePackage(@Body() dto: UserUsePackageDto) {
    return this.packageService.createUserUsePackage(dto);
  }

  @Get('today')
  showToDayUsePackage(
    @Query('first_name') first_name?: string,
    @Query('last_name') last_name?: string,
    @Query('date') date?: string,
    @Query() query?: PaginationDto,
  ) {
    return this.packageService.showToDayUsePackage(
      first_name,
      last_name,
      date,
      query,
    );
  }
}
