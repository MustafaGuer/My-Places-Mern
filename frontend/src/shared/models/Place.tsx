export type Coordinates = {
  lat: number;
  lng: number;
};

interface Place {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: Coordinates;
}

export default Place;
