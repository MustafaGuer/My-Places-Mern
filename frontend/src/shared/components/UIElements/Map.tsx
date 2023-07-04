import React, { useRef, useEffect } from "react";

import { Coordinates } from "../../models/Place";
import styles from "./Map.module.scss";

const Map: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  center: Coordinates;
  zoom: number;
}> = (props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const { center, zoom } = props;

  useEffect(() => {
    const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
      center: center,
      zoom: zoom,
    });

    new google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`${styles.map} ${props.className}`}
      style={props.style}
    >
      Map
    </div>
  );
};

export default Map;
