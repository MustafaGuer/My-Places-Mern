export type Coordinates = {
  lat: number;
  lng: number;
};

interface Place {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: Coordinates;
}

export default Place;
