import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { UserId } from "../../shared/models/Params";

import { DUMMY_PLACES } from "../../DUMMY_PLACES";

const UserPlaces = () => {
  const { userId } = useParams<UserId>();
  //   const { userId } = useParams<Record<string, string | undefined>>();
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
