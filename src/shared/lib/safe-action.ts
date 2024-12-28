import { getSession } from 'next-auth/react';
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE
} from 'next-safe-action';

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  }
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await getSession();
  console.info('session', session);

  return next({ ctx: { userId: '124' } });
});
