import { PrismaClient } from '@prisma/client';
import { object, string } from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword, setCookieHeaders, validate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { InferType } from 'yup';

const prisma = new PrismaClient();
const schema = object({
  email: string().email().required(),
  password: string().required(),
})
  .noUnknown()
  .strict();

type User = InferType<typeof schema>;

export const post: RequestHandler = async ({ request }) => {
  const [data, error] = await validate<User>(schema, request);
  if (error) return error;

  const password = hashPassword(data!.password);
  const user = await prisma.user.findUnique({
    where: {
      email: data!.email,
    },
  });

  if (!user || user.password != password)
    return {
      status: 403,
      body: {
        message: 'email or password are invalid',
      },
    };

  const token = uuidv4();
  const headers = setCookieHeaders(token);
  await prisma.user.update({
    where: {
      email: data!.email,
    },
    data: {
      token,
    },
  });

  return {
    headers,
    body: {
      message: 'logged in successfully',
    },
  };
};
