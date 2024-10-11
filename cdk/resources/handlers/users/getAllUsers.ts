import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

const dynamodb = new DynamoDB({});

export async function getAllUsers(): Promise<{
  statusCode: number;
  body: string;
}> {
  const result = await dynamodb.send(
    new ScanCommand({
      TableName: 'Person',
    }),
  );

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
}