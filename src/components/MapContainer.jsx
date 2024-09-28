import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./MapContainer.module.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCitiesContext } from "./CitiesContext";
import { useEffect, useState } from "react";

export default function Map() {
  const { cities } = useCitiesContext();
  const [position, setPosition] = useState([50, 100]);
  const [searchParams, setSearchParams] = useSearchParams();

  const URL_lat = searchParams.get("lat");
  const URL_lng = searchParams.get("lng");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setPosition([lat, lng]);
      },
      () => {
        alert("you denied the loaction permission");
      },
    );
  }, []);

  useEffect(() => {
    if (URL_lat && URL_lng) setPosition([URL_lat, URL_lng]);
  }, [URL_lat, URL_lng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={13}
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
          console.log(lat, lng);
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
      </MapContainer>
    </div>
  );
}

function CenterMap({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
