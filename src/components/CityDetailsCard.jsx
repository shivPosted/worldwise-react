import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./CityDetailsCard.module.css";
import Button from "./Button";
import { useEffect } from "react";
import { useCitiesContext } from "./CitiesContext";
import { dateFormatter } from "./util";
import Spinner from "./Spinner";

export default function CityDetailsCard() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { currentCity, loadCurrentCity, isLoading } = useCitiesContext();

  useEffect(() => {
    console.log("inside effect");
    loadCurrentCity(id);
  }, [id]);

  const { cityName, countryCode, date, notes } = currentCity;
  if (isLoading) return <Spinner />;
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
