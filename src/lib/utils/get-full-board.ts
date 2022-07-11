import type { PrismaClient } from '@prisma/client';

export const getFullBoard = async (client: PrismaClient, id: number) => {
  const board = await client.board.findUnique({
    where: {
      id,
    },
    include: {
      columns: {
        include: {
          cards: true,
        },
      },
    },
  });

  board!.columns = board!.columns
    .map((column) => ({
      ...column,
      cards: column.cards.sort((a, b) => a.position - b.position),
    }))
    .sort((a, b) => a.position - b.position);

  return board;
};
