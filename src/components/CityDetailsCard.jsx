import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./CityDetailsCard.module.css";
import { dateFormatter } from "./util";
import Button from "./Button";
import { useEffect, useState } from "react";

export default function CityDetailsCard() {
  // TEMP DATA
  const { id } = useParams();

  const navigate = useNavigate();
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    fetch(`http://localhost:9000/cities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { cityName, countryCode, date, notes } = data;
        console.log(date);
        setCurrentCity({ cityName, countryCode, date, notes });
      });
  }, [id]);

  const { cityName, countryCode, date, notes } = currentCity;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City Name</h6>
        <h3>
          <span>
            <img
              src={`https://flagcdn.com/24x18/${countryCode}.png`}
              alt={`${countryCode}-image`}
            />
          </span>{" "}
          {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{dateFormatter(date)}</p>
      </div>
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a href={`https://en.wikipedia.org/wiki/${cityName}`}>
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <Button type="back" onclick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </div>
    </div>
  );
}
