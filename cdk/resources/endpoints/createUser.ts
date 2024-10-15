// eslint-disable-next-line
import { APIGatewayProxyEvent } from 'aws-lambda';

// eslint-disable-next-line
import { create } from '../handlers/users/create';

const handler = async (
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

// eslint-disable-next-line import/no-commonjs
module.exports = { handler };
