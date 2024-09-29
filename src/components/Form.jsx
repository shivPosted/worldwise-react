import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";
import { useUrlParams } from "../hooks/useUrlParams";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Message from "./Message";

export default function Form() {
  const navigate = useNavigate();
  const { lat, lng } = useUrlParams();
  const [cityData, setCityData] = useState({ cityName: "", countryCode: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("form effect");
    async function fetchCityData() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=204cec54c45543bb8119a66423c82d74`,
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
        <input type="text" id="date" value={new Date().toISOString()} />
      </div>
      <div className={styles.row}>
        <label htmlFor="date">What are your thoughts about the city</label>
        <textarea name="comments" id="" />
      </div>
      <div className={styles.buttons}>
        <Button onclick={() => {}} type="primary">
          Add
        </Button>
        <Button onclick={() => navigate("/app")} type="back">
          &larr; back
        </Button>
      </div>
    </form>
  );
}
