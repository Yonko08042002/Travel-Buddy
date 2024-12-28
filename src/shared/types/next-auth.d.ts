import type { UserWithRoles } from 'application/use-cases/user';
import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }

  interface User extends DefaultUser {
    userRoles?: UserWithRoles['userRoles'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userRoles: UserWithRoles['userRoles'];
  }
}
