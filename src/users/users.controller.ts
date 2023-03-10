import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Put, Req, UseGuards } from '@nestjs/common/decorators';
import { ApiExcludeEndpoint, ApiOperation, ApiProperty, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from 'src/db/entities/user.entity';
import JwtAuthenticationGuard from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { UpdateBgImageDto } from './dto/update-bgImage.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Create new User' })
  @ApiResponse({ status: 201, description: 'Return created User', type: User })
  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: 200, description: 'Return array of all Users', type: [User] })
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get User by username' })
  @ApiResponse({ status: 200, description: 'Return User with his/her tweets and likes', type: User })
  @ApiProperty({
    type: String,
  })
  @Get(':username')
  getByUsername(@Param('username') username: string): Promise<User> {
    return this.usersService.getUserByUsername(username);
  }

  @ApiSecurity('Authentication')
  @UseGuards(JwtAuthenticationGuard)
  @ApiOperation({ summary: 'Update User`s avatar' })
  @ApiResponse({ status: 200, description: 'Return updated User', type: User })
  @Put('/avatar')
  updateAvatar(@Body() dto: UpdateAvatarDto, @Req() request: RequestWithUser): Promise<User> {
    const { user } = request;
    return this.usersService.updateUserAvatar(dto, user);
  }

  @ApiSecurity('Authentication')
  @UseGuards(JwtAuthenticationGuard)
  @ApiOperation({ summary: 'Update User`s bgImage' })
  @ApiResponse({ status: 200, description: 'Return updated User', type: User })
  @Put('/bgImage')
  updateBgImage(@Body() dto: UpdateBgImageDto, @Req() request: RequestWithUser): Promise<User> {
    const { user } = request;
    return this.usersService.updateUserBgImage(dto, user);
  }
}
