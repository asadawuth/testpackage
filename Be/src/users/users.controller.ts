import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateAddressDto } from './user.validate.dto';
import { PaginationDto } from '../common/padination/pagination';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/address/:id')
  createAddress(
    @Param('id') id: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.usersService.createAddress(Number(id), createAddressDto);
  }

  @Get('/hello')
  hello() {
    return { message: 'Hello, World!' };
  }

  @Get('/allUsers')
  allUsers(@Query() query: PaginationDto) {
    return this.usersService.allUsers(query);
  }

  @Get('/new-user-day')
  newUserDay(@Query('date') date: string, @Query() query: PaginationDto) {
    return this.usersService.newUserDay(date, query);
  }

  @Delete('/address/:id')
  deleteAddressUser(@Param('id') id: string) {
    return this.usersService.deleteAddressUser(Number(id));
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }

  @Get('/userAddress/:id')
  userAddress(@Param('id') id: string) {
    return this.usersService.userAddress(Number(id));
  }
}
