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
import { FollowingDto } from './dto/following-user.dto';
import { UnFollowingDto } from './dto/unfollowing-user.dto';

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

  @ApiSecurity('Authentication')
  @UseGuards(JwtAuthenticationGuard)
  @ApiOperation({ summary: 'Follow user' })
  @ApiResponse({ status: 201, description: 'Return follow User', type: User })
  @Post('/follow')
  follow(@Body() dto: FollowingDto, @Req() request: RequestWithUser): Promise<User> {
    const { user } = request;
    return this.usersService.followingProcess(dto, user);
  }

  @ApiSecurity('Authentication')
  @UseGuards(JwtAuthenticationGuard)
  @ApiOperation({ summary: 'Unfollow user' })
  @ApiResponse({ status: 201, description: 'Return User Owner', type: User })
  @Post('/unfollow')
  unfollow(@Body() dto: UnFollowingDto, @Req() request: RequestWithUser): Promise<User> {
    const { user } = request;
    return this.usersService.unFollowingProcess(dto, user);
  }

  @ApiOperation({ summary: 'get followers list' })
  @ApiResponse({ status: 201, description: 'Return followers list', type: [User] })
  @Get('follow/followers')
  getFollowers(@Req() request: RequestWithUser): Promise<User[]> {
    const { user } = request;
    return this.usersService.getFollowers(user);
  }

  @ApiOperation({ summary: 'get followings list' })
  @ApiResponse({ status: 201, description: 'Return followings list', type: [User] })
  @Get('follow/followings')
  getFollowings(@Req() request: RequestWithUser): Promise<User[]> {
    const { user } = request;
    return this.usersService.getFollowings(user);
  }
}
