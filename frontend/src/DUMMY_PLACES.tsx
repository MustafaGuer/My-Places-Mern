import Place from "./shared/models/Place";

export const DUMMY_PLACES: Place[] = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    address: "20 W 34th St., New York, NY 10001, United States",
    creator: "u1",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    location: { lat: 40.7484445, lng: -73.9882393 },
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "One of the most famous sky scrapers in the world!",
    address: "20 W 34th St., New York, NY 10001, United States",
    creator: "u2",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    location: { lat: 40.7484445, lng: -73.9882393 },
  },
];
