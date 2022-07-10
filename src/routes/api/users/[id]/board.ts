import { PrismaClient } from '@prisma/client';
import { number, object } from 'yup';
import { getFullBoard, validate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { InferType } from 'yup';

const prisma = new PrismaClient();
const schema = object({
  id: number().integer().required(),
});

type BoardOwner = InferType<typeof schema>;

export const get: RequestHandler = async ({ params }) => {
  const [data, error] = await validate<BoardOwner>(schema, { id: params.id });
  if (error) return error;

  const user = await prisma.user.findUnique({
    where: {
      id: data!.id,
    },
    include: {
      boards: true,
    },
  });

  if (!user?.boards.length)
    return {
      status: 404,
      body: {
        message: 'this user has no boards',
      },
    };

  const board = await getFullBoard(prisma, user!.boards[0].id);

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
