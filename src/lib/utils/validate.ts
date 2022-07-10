import { ValidationError } from 'yup';
import type { AnyObjectSchema } from 'yup';

type ErrorResponse = {
  status: number;
  body?: {
    message: string;
  };
};

const jsonError = 'invalid json request';

export const validate = async <T>(
  schema: AnyObjectSchema,
  request: Request | object,
): Promise<[T | null, ErrorResponse | null]> => {
  let data;
  try {
    data = request instanceof Request ? await request.json() : request;
  } catch (error) {
    return [
      null,
      {
        status: 400,
        body: {
          message: jsonError,
        },
      },
    ];
  }

  try {
    const validated = await schema.validate(data);
    return [validated, null];
  } catch (error) {
    if (error instanceof ValidationError) {
      return [
        null,
        {
          status: 400,
          body: {
            message: error.message,
          },
        },
      ];
    }
    return [null, { status: 500 }];
  }
};
