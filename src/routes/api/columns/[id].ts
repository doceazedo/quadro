import { PrismaClient } from '@prisma/client';
import { number, object } from 'yup';
import { validate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { InferType } from 'yup';

const prisma = new PrismaClient();
const schema = object({
  id: number().integer().required(),
});

type Column = InferType<typeof schema>;

export const get: RequestHandler = async ({ params }) => {
  const [data, error] = await validate<Column>(schema, { id: params.id });
  if (error) return error;

  const column = await prisma.column.findUnique({
    where: {
      id: data!.id,
    },
  });

  if (!column)
    return {
      status: 404,
      body: {
        message: 'this column does not exist',
      },
    };

  return {
    body: { ...column },
  };
};
