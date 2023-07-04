import React from "react";

import Input from "../../shared/components/FormElements/Input";
import styles from "./NewPlace.module.scss";

const NewPlace = () => {
  return (
    <form className={styles["place-form"]}>
      <Input element="input" type="text" label="Title" id="title" />
    </form>
  );
};

export default NewPlace;
