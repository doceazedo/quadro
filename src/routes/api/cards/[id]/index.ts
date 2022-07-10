import { PrismaClient } from '@prisma/client';
import { object, string } from 'yup';
import { getFullBoard, validate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { InferType } from 'yup';

const prisma = new PrismaClient();
const schema = object({
  title: string().required(),
  body: string(),
})
  .noUnknown()
  .strict();

type Card = InferType<typeof schema>;

export const put: RequestHandler = async ({ request, params }) => {
  const [data, error] = await validate<Card>(schema, request);
  if (error) return error;

  const id = parseInt(params.id) || 0;
  const card = await prisma.card.findUnique({
    where: {
      id,
    },
    include: {
      column: true,
    },
  });

  if (!card)
    return {
      status: 404,
      body: {
        message: 'this card does not exist',
      },
    };

  await prisma.card.update({
    where: {
      id,
    },
    data: {
      title: data!.title,
      body: data?.body || '',
    },
  });

  const board = await getFullBoard(prisma, card.column.boardId);

  return {
    body: { ...board },
  };
};
