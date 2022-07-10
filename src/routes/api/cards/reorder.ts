import { PrismaClient } from '@prisma/client';
import { array, number, object } from 'yup';
import { getFullBoard, validate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { InferType } from 'yup';

const prisma = new PrismaClient();
const schema = object({
  boardId: number().required(),
  cards: array().of(
    object({
      id: number().required(),
      position: number().required(),
      columnId: number().required(),
    })
      .noUnknown()
      .strict(),
  ),
});

export type CardChanges = InferType<typeof schema>;

export const post: RequestHandler = async ({ request }) => {
  const [data, error] = await validate<CardChanges>(schema, request);
  if (error) return error;

  const updateCards = data!.cards!.map((card) =>
    prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        columnId: card.columnId,
        position: card.position,
      },
    }),
  );
  await Promise.all(updateCards);

  const board = await getFullBoard(prisma, data!.boardId);

  return {
    body: { ...board },
  };
};
