import React, { useState, useCallback, useContext } from "react";

import { Coordinates } from "../../shared/models/Place";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext, AuthContextT } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import styles from "./PlaceItem.module.scss";

const PlaceItem: React.FC<{
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  coordinates: Coordinates;
  onDelete: (pid: string) => void;
}> = (props) => {
  const authCtx = useContext<AuthContextT>(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const openMapHandler = useCallback(() => setShowMap(true), []);

  const closeMapHandler = useCallback(() => setShowMap(false), []);

  const showDeleteWarningHandler = useCallback(() => setShowConfirm(true), []);

  const cancelDeleteWarningHandler = useCallback(
    () => setShowConfirm(false),
    []
  );

  const confirmDeleteHandler = async () => {
    setShowConfirm(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass={styles["place-item__modal-content"]}
        footerClass={styles["place-item__modal-actions"]}
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className={styles["map-container"]}>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirm}
        onCancel={cancelDeleteWarningHandler}
        header="Are you sure"
        footerClass={styles["place-item__modal-actions"]}
        footer={
          <>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className={styles["place-item"]}>
        <Card className={styles["place-item__content"]}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className={styles["place-item__image"]}>
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
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
            {authCtx.userId === props.creator && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {authCtx.userId === props.creator && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
