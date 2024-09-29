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

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [displayDate, setDisplayDate] = useState(new Date());
  const [cityData, setCityData] = useState({ cityName: "", countryCode: "" });
  const { lat, lng } = useUrlParams();
  const navigate = useNavigate();

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
          name: regionName,
        } = data.features.at(0).properties;

        console.log(cityName, countryCode);
        setCityData({ cityName: cityName || regionName, countryCode });
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (lat && lng) fetchCityData();
  }, [lat, lng]);

  if (isLoading) return <Spinner />;

  if (!(lat && lng))
    return <Message message="Start by selecting any city on the map" />;

  return (
    <form
      action="/none"
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
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
        <textarea name="comments" id="notes" />
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
