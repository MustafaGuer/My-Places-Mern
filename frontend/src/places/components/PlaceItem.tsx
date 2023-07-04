import React, { useState, useCallback } from "react";

import { Coordinates } from "../../shared/models/Place";
import Card from "../../shared/components/UIElements/Card";
import styles from "./PlaceItem.module.scss";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

const PlaceItem: React.FC<{
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  coordinates: Coordinates;
}> = (props) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = useCallback(() => setShowMap(true), []);

  const closeMapHandler = useCallback(() => setShowMap(false), []);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass={styles["place-item__modal-content"]}
        footerClass={styles["place-item__modal-actions"]}
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className={styles["map-container"]}>
          <h2>THE MAP!</h2>
        </div>
      </Modal>
      <li className={styles["place-item"]}>
        <Card className={styles["place-item__content"]}>
          <div className={styles["place-item__image"]}>
            <img src={props.image} alt={props.title} />
          </div>
          <div className={styles["place-item__info"]}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={styles["place-item__actions"]}>
            <Button onClick={openMapHandler} inverse>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
