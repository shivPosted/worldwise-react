import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./MapContainer.module.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useCitiesContext } from "./CitiesContext";
import { useState } from "react";

export default function Map() {
  const { cities } = useCitiesContext();
  const [position, setPosition] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          const { lat, lng } = city.position;
          <Marker position={[lat, lng]} key={city.id}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>;
        })}
      </MapContainer>
    </div>
  );
}
