import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";
import { useUrlParams } from "../hooks/useUrlParams";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Message from "./Message";

const REVERSE_API = import.meta.env.VITE_reverse_geocode_api_key;

//datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { generateId } from "./util";
import { useCitiesContext } from "./CitiesContext";
import ErrorMessage from "./ErrorMessage";

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [displayDate, setDisplayDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [cityData, setCityData] = useState({
    cityName: "",
    countryCode: "",
    country: "",
  });
  const { lat, lng } = useUrlParams();
  const navigate = useNavigate();
  const {
    createNewCity,
    isLoading: isContextLoading,
    isError,
    errorMessage,
  } = useCitiesContext();

  useEffect(() => {
    console.log("form effect");
    async function fetchCityData() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${REVERSE_API}`,
        );
        if (!res.ok)
          throw new Error(
            `There was an errro in fetching city data from lat and lng${res.status}:${res.statusText}`,
          );
        const data = await res.json();
        console.log(data);
        const {
          city: cityName,
          country_code: countryCode,
          country,
        } = data.features.at(0).properties;

        console.log(cityName, countryCode);
        setCityData({ cityName, countryCode, country });
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (lat && lng) fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityData.cityName || !displayDate) return;

    const newCity = {
      cityName: cityData.cityName,
      country: cityData.country,
      countryCode: cityData.countryCode,
      date: displayDate.toISOString(),
      notes,
      id: generateId(),
      position: { lat, lng },
    };
    await createNewCity(newCity);
    navigate("/app");
  }

  if (isLoading) return <Spinner />;

  if (!(lat && lng))
    return <Message message="Start by selecting any city on the map" />;

  if (!cityData.cityName)
    return (
      <Message message="Looks like that is not a city, select a city to start" />
    );

  {
    isError && <ErrorMessage message={errorMessage} />;
  }

  return (
    <form
      action="/none"
      className={`${styles.form} ${isContextLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityname">City Name</label>
        <input
          type="text"
          id="cityname"
          value={cityData.cityName}
          onChange={(e) =>
            setCityData((cur) => {
              return { ...cur, cityName: e.target.value };
            })
          }
        />
        {cityData.countryCode ? (
          <img
            src={`https://flagcdn.com/24x18/${cityData.countryCode}.png`}
            alt={`${cityData.countryCode}-image`}
            className={styles.flag}
          />
        ) : (
          <span className={styles.flag}>🌊</span>
        )}
      </div>
      <div className={styles.row}>
        <label htmlFor="date">When did you visited?</label>
        {/* <input type="text" id="date" value={new Date().toISOString()} /> */}
        <DatePicker
          id="date"
          selected={displayDate}
          onChange={(date) => {
            console.log(displayDate);
            setDisplayDate(date);
          }}
          locale={navigator.language
            .split("-")
            .at(0)} /* NOTE: not sure about this */
          dateFormat="dd/MM/YYYY"
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">What are your thoughts about the city</label>
        <textarea
          name="comments"
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className={styles.buttons}>
        <Button onclick={() => {}} type="primary">
          Add
        </Button>
        <Button
          onclick={(e) => {
            e.preventDefault();
            navigate("/app");
          }}
          type="back"
        >
          &larr; back
        </Button>
      </div>
    </form>
  );
}
