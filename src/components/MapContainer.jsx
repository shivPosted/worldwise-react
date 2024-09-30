import { useNavigate } from "react-router-dom";
import styles from "./MapContainer.module.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCitiesContext } from "./CitiesContext";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useUrlParams } from "../hooks/useUrlParams";

export default function Map() {
  const [position, setPosition] = useState([50, 100]);
  const {
    isLoading: isPositionLoading,
    position: currentPosition,
    getPosition,
  } = useGeoLocation();

  const { cities } = useCitiesContext();
  const { lat: URL_LAT, lng: URL_LNG } = useUrlParams();

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       const { latitude: lat, longitude: lng } = pos.coords;
  //       setPosition([lat, lng]);
  //     },
  //     () => {
  //       alert("you denied the loaction permission");
  //     },
  //   );
  // }, []);

  useEffect(() => {
    if (currentPosition) setPosition(currentPosition);
  }, [currentPosition]);

  useEffect(() => {
    if (URL_LAT && URL_LNG) setPosition([URL_LAT, URL_LNG]);
  }, [URL_LAT, URL_LNG]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onclick={getPosition}>
        {isPositionLoading ? "Loading..." : "Use My Location"}
      </Button>
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => {
          const {
            position: { lat, lng },
            countryCode,
            cityName,
          } = city;
          return (
            <Marker position={[lat, lng]} key={city.id}>
              <Popup>
                <span>
                  <img
                    src={`https://flagcdn.com/24x18/${countryCode}.png`}
                    alt=""
                  />{" "}
                  <span>{cityName}</span>
                </span>
              </Popup>
            </Marker>
          );
        })}
        <CenterMap position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

//NOTE: this is for setting the map position beacause we can't set it just by updating state because of the external library used
function CenterMap({ position }) {
  const map = useMap(); //from leaflet library
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  //hook from leaflet library in which we can handle events
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`); //navigating and storing the lat and lng in url form to use it later
    },
  });
}
