import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import PlaceItem from "./PlaceItem";
import Place from "../../shared/models/Place";
import styles from "./PlaceList.module.scss";

const PlaceList: React.FC<{ items?: Place[] }> = (props) => {
  if (props.items?.length === 0) {
    return (
      <div className={`${styles["place-list"]} center`}>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className={styles["place-list"]}>
      {props.items?.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creator={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
