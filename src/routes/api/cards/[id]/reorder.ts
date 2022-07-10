import { PrismaClient } from '@prisma/client';
import { number, object } from 'yup';
import { getFullBoard, validate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { InferType } from 'yup';

const prisma = new PrismaClient();
const schema = object({
  position: number().required(),
})
  .noUnknown()
  .strict();

type Card = InferType<typeof schema>;

export const post: RequestHandler = async ({ request, params }) => {
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

  const column = await prisma.column.findUnique({
    where: {
      id: card.columnId,
    },
    include: {
      cards: true,
    },
  });

  const fromIndex = column!.cards.findIndex((x) => x.id == id);
  const movingCard = column!.cards.splice(fromIndex, 1)[0]; // remove, grab it
  column!.cards.splice(data!.position, 0, movingCard);

  const updateCards = column!.cards.map((card, i) =>
    prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        position: i,
      },
    }),
  );
  await Promise.all(updateCards);

  const board = await getFullBoard(prisma, card.column.boardId);

  return {
    body: { ...board },
  };
};
