import { APIGatewayProxyEvent } from 'aws-lambda';

import { getOnePerson } from '../handlers/users/getUser';

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<{ statusCode: number; body: string }> => {
  const id = event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing path parameter: id' }),
    };
  }

  try {
    return await getOnePerson({ id });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
