import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import styles from "./review-map.module.scss";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9uYWhhbGxpYm9uZSIsImEiOiJjamxvMnFraG0wMDc3M3FudjQ1N214ZTRwIn0.xI100RpP8Uh4jbxU0i3waA";

const ReviewMap = ({ location }) => {
  const mapContainer = useRef(null);

  const coords = location.coordinates;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: coords,
      zoom: 15,
      interactive: false
    });
    new mapboxgl.Marker().setLngLat(coords).addTo(map);
  }, [location]);

  return <div className={styles.map} ref={mapContainer} />;
};

export default ReviewMap;
