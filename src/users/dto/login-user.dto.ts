import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class LoginUserDto extends PickType(CreateUserDto, ['username', 'password'] as const) {}
