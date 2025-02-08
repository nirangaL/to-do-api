import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../interfaces/auth-user.interface';

export const LoggedUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): AuthUser | null => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const req = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user: AuthUser = req.user;
    if (user) {
      return user;
    }
    return null;
  },
);
