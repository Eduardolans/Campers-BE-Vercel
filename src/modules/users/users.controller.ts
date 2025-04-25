import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuardGuard } from '../../guards/auth-guard.guard';
import { Roles } from '../../decorators/roles.decorators';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuardGuard)
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  // @Post()
  // async create(@Body() data: any) {
  //   return await this.userService.create(data);
  // }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
