import { PrismaClient } from '@prisma/client';
import * as cookie from 'cookie';
import type { GetSession, Handle } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  if (!cookies.token) return resolve(event);

  const user = await prisma.user.findUnique({
    where: {
      token: cookies.token,
    },
  });
  if (user) event.locals.user = user;
  return await resolve(event);
};

export const getSession: GetSession = async (event) => ({
  user: event.locals.user || null,
});
