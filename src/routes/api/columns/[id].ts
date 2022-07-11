import { PrismaClient } from '@prisma/client';
import { number, object, string } from 'yup';
import { getFullBoard, validate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { InferType } from 'yup';

const prisma = new PrismaClient();

export const get: RequestHandler = async ({ params }) => {
  const schema = object({
    id: number().integer().required(),
  });
  type Column = InferType<typeof schema>;

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

export const put: RequestHandler = async ({ request, params }) => {
  const schema = object({
    title: string().required(),
  });
  type Column = InferType<typeof schema>;

  const id = parseInt(params.id) || 0;
  const [data, error] = await validate<Column>(schema, request);
  if (error) return error;

  const column = await prisma.column.update({
    where: {
      id: id,
    },
    data: data!,
  });

  if (!column)
    return {
      status: 404,
      body: {
        message: 'this column does not exist',
      },
    };

  const updatedBoard = await getFullBoard(prisma, column.boardId);

  return {
    body: updatedBoard,
  };
};
