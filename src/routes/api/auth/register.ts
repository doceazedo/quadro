import { PrismaClient } from '@prisma/client';
import { object, string } from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword, setCookieHeaders, validate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { InferType } from 'yup';

const prisma = new PrismaClient();
const schema = object({
  email: string().email().required(),
  password: string().min(6).required(),
  name: string().required(),
})
  .noUnknown()
  .strict();

type User = InferType<typeof schema>;

export const post: RequestHandler = async ({ request }) => {
  const [data, error] = await validate<User>(schema, request);
  if (error) return error;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data!.email,
    },
  });
  if (existingUser)
    return {
      status: 409,
      body: {
        message: 'this email already exists',
      },
    };

  const token = uuidv4();
  const password = hashPassword(data!.password);
  const user = await prisma.user.create({
    data: {
      name: data!.name,
      email: data!.email,
      password,
      token,
    },
  });
  const headers = setCookieHeaders(token);

  await prisma.board.create({
    data: {
      title: 'My first board',
      ownerId: user.id,
    },
  });

  return {
    headers,
    body: {
      message: 'registered successfully',
    },
  };
};
