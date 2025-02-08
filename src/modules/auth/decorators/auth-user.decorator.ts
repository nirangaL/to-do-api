import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../interfaces/auth-user.interface';

export const LoggedUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): AuthUser | null => {
    const req = ctx.switchToHttp().getRequest();
    const user: AuthUser = req.user;
    if (user) {
      return user;
    }
    return null;
  },
);
