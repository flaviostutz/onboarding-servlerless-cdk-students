import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

const dynamodb = new DynamoDB({});

export async function getOnePerson({
  id,
}: {
  id: string;
}): Promise<{ statusCode: number; body: string }> {
  const result = await dynamodb.send(
    new GetCommand({
      TableName: 'Person',
      Key: {
        id,
      },
    }),
  );

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'User not found' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
}
