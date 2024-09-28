import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import styles from "./MapContainer.module.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  useMapEvents,
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
