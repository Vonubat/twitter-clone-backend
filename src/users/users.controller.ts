import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/db/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new User' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by username' })
  @ApiResponse({ status: 200, type: User })
  @ApiProperty({
    type: String,
  })
  @Get(':username')
  getByUsername(@Param('username') username: string): Promise<User> {
    return this.usersService.getUserByUsername(username);
  }
}
