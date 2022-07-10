import { PrismaClient } from '@prisma/client';
import { object, string } from 'yup';
import sha256 from 'crypto-js/sha256.js';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import { validate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { InferType } from 'yup';

const prisma = new PrismaClient();
const salt = process.env.PASSWORD_SALT;
const schema = object({
  email: string().email().required(),
  password: string().required(),
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
  const password = sha256(`${salt}.${data!.password}`).toString();
  await prisma.user.create({
    data: {
      name: data!.name,
      email: data!.email,
      password,
      token,
    },
  });

  const headers = {
    'Set-Cookie': cookie.serialize('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 90, // keep session for three months
      sameSite: 'strict',
      path: '/',
    }),
  };

  return {
    headers,
    body: {
      message: 'registered successfully',
    },
  };
};
