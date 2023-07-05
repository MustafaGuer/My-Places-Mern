import React from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import styles from "./NewPlace.module.scss";

const NewPlace = () => {
  return (
    <form className={styles["place-form"]}>
      <Input
        element="input"
        type="text"
        label="Title"
        id="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
      />
    </form>
  );
};

export default NewPlace;
