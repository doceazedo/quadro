import { PrismaClient } from '@prisma/client';
import { number, object, string } from 'yup';
import { validate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { InferType } from 'yup';

const prisma = new PrismaClient();
const schema = object({
  title: string().required(),
  boardId: number().integer().required(),
})
  .noUnknown()
  .strict();

type Column = InferType<typeof schema>;

export const post: RequestHandler = async ({ request }) => {
  const [data, error] = await validate<Column>(schema, request);
  if (error) return error;

  const board = await prisma.board.findUnique({
    where: {
      id: data!.boardId,
    },
  });

  if (!board)
    return {
      status: 404,
      body: {
        message: 'the board you are trying to add this column does not exist',
      },
    };

  const column = await prisma.column.create({
    data: data!,
  });

  return {
    body: column,
  };
};
