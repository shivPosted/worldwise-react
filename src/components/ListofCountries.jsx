import CountryCard from "./CountryCard";
import styles from "./ListofCountries.module.css";

export default function ListofCountries({ cities }) {
  const countryObj = cities.reduce((acc, item) => {
    //NOTE: can result in a bug👇👇

    if (acc.map((el) => el.country).includes(item.country)) return acc;
    acc.push({ countryCode: item.countryCode, country: item.country });
    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countryObj.map((country) => (
        <CountryCard countryObj={country} key={country.id} />
      ))}
    </ul>
  );
}
