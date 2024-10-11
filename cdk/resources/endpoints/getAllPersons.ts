import { getAllUsers } from '../handlers/users/getAllUsers';

export const handler = async (): Promise<{ statusCode: number; body: string }> => {
  try {
    return await getAllUsers();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
