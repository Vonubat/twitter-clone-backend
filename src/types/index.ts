import { Request } from 'express';
import { User } from '../db/entities/user.entity';

export type SimpleMessageResponse = Promise<{
  message: string;
}>;

export interface TokenPayload {
  userId: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
