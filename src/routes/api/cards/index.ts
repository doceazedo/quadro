import { PrismaClient } from '@prisma/client';
import { number, object, string } from 'yup';
import { getFullBoard, validate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { InferType } from 'yup';

const prisma = new PrismaClient();
const schema = object({
  title: string().required(),
  body: string(),
  columnId: number().integer().required(),
})
  .noUnknown()
  .strict();

type Card = InferType<typeof schema>;

export const post: RequestHandler = async ({ request }) => {
  const [data, error] = await validate<Card>(schema, request);
  if (error) return error;

  const column = await prisma.column.findUnique({
    where: {
      id: data!.columnId,
    },
  });

  if (!column)
    return {
      status: 404,
      body: {
        message: 'the column you are trying to add this card does not exist',
      },
    };

  await prisma.card.create({
    data: {
      title: data!.title,
      body: data?.body || '',
      columnId: data!.columnId,
    },
  });

  const board = await getFullBoard(prisma, column.boardId);

  return {
    body: { ...board },
  };
};
