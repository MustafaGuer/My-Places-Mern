import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

import HttpError from "../shared/model/http-error";
import getCoordsForAddress from "../shared/util/location";

interface LatLng {
  lat: number;
  lng: number;
}

interface Place {
  id: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  imageUrl: string;
  location: LatLng;
}

let DUMMY_PLACES: Place[] = [
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
];

const getPlaceById = (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    throw new HttpError("Could not find a place for the provided id!", 404);
  }

  res.json({ place });
};

const getPlacesByUserId = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id!", 404)
    );
  }

  res.json({ places });
};

const postCreatePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinatesFromGoogle;
  try {
    coordinatesFromGoogle = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const newPlace: Place = {
    id: uuidv4(),
    title,
    description,
    location: coordinatesFromGoogle,
    address,
    creator,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
  };

  DUMMY_PLACES.push(newPlace);

  res.status(201).json({ place: newPlace });
};

const patchUpdatePlace = (req: Request, res: Response) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  const updatedPlace = { ...DUMMY_PLACES[placeIndex], title, description };
  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req: Request, res: Response) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    throw new HttpError("Could not find a place for the provided id!", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.json({ message: "Deleted place." });
};

export default {
  getPlaceById,
  getPlacesByUserId,
  postCreatePlace,
  patchUpdatePlace,
  deletePlace,
};
