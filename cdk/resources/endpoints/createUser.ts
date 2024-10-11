import { APIGatewayProxyEvent } from 'aws-lambda';

import { create } from '../handlers/users/create';

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<{ statusCode: number; body: string }> => {
  try {
    return await create(event.body);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
