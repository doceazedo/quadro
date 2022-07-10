import { PrismaClient } from '@prisma/client';
import { number, object } from 'yup';
import { getFullBoard, validate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { InferType } from 'yup';

const prisma = new PrismaClient();
const schema = object({
  id: number().integer().required(),
});

type Board = InferType<typeof schema>;

export const get: RequestHandler = async ({ params }) => {
  const [data, error] = await validate<Board>(schema, { id: params.id });
  if (error) return error;

  const board = await getFullBoard(prisma, data!.id);

  if (!board)
    return {
      status: 404,
      body: {
        message: 'this board does not exist',
      },
    };

  return {
    body: { ...board },
  };
};
