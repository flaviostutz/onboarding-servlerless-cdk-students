interface User {
  id: number;
  name: string;
  birthDate: string;
  city: string;
}

export const handler = async (): Promise<{ statusCode: number; body: string }> => {
  const users: User[] = [
    { id: 1, name: 'Alice', birthDate: '1990-01-01', city: 'Amsterdam' },
    { id: 2, name: 'Bob', birthDate: '1985-05-12', city: 'Rotterdam' },
    { id: 3, name: 'Charlie', birthDate: '1992-06-25', city: 'Utrecht' },
    { id: 4, name: 'David', birthDate: '1988-03-18', city: 'The Hague' },
    { id: 5, name: 'Eva', birthDate: '1995-12-09', city: 'Eindhoven' },
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};
