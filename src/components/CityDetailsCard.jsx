import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./CityDetailsCard.module.css";
import { dateFormatter } from "./util";
import Button from "./Button";

export default function CityDetailsCard() {
  // TEMP DATA
  const navigate = useNavigate();
  const currentCity = {
    cityName: "Jaipur",
    countryCode: "in",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  };

  const { cityName, countryCode, date, notes } = currentCity;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City Name</h6>
        <h3>
          {cityName}
          <span>
            <img
              src={`https://flagcdn.com/24x18/${countryCode}.png`}
              alt={`${countryCode}-image`}
            />
          </span>
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <h3>{dateFormatter(date)}</h3>
      </div>
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <h3>{notes}</h3>
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
          &larr;Back
        </Button>
      </div>
    </div>
  );
}
