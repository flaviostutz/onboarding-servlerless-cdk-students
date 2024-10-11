import { randomUUID } from 'crypto';

import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import axios from 'axios';

import { Person } from '../../types';

const dynamodb = new DynamoDB({});

export async function create(body: string | null): Promise<{ statusCode: number; body: string }> {
  const uuid = randomUUID();

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing body' }),
    };
  }

  let bodyParsed = JSON.parse(body) as Omit<Person, 'phone' | 'picture' | 'coordinates'>;

  try {
    bodyParsed = JSON.parse(body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON body' }),
    };
  }

  // Check for empty required fields
  const requiredFields = ['id', 'name', 'birth_date', 'city'];
  const emptyField = requiredFields.find((field) => !bodyParsed[field]);
  if (emptyField) {
    return {
      statusCode: 422,
      body: JSON.stringify({ message: `Field '${emptyField}' cannot be empty` }),
    };
  }

  // Fetch additional data from randomuser.me
  const { data } = await axios.get('https://randomuser.me/api/');
  const { phone, picture, location } = data.results[0];

  const item: Person = {
    ...bodyParsed,
    id: uuid,
    phone,
    picture: picture.large,
    coordinates: {
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    },
  };

  await dynamodb.send(
    new PutCommand({
      TableName: 'Person',
      Item: item,
    }),
  );

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'User created', user: item }),
  };
}
