import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { PlaceId } from "../../shared/models/Params";

import { DUMMY_PLACES } from "../../DUMMY_PLACES";

const UpdatePlace = () => {
  const { placeId } = useParams<PlaceId>();

  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!place) {
    return (
      <div className="center">
        <h2>Could not find place.</h2>
      </div>
    );
  }

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        value={place.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={() => {}}
        value={place.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
