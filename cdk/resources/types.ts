export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Person {
  id: string;
  name: string;
  birthDate: string;
  city: string;
  phone: string;
  picture: string;
  coordinates: Coordinates;
}
