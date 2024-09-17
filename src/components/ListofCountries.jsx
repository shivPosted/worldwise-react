import CountryCard from "./CountryCard";
import styles from "./ListofCountries.module.css";

export default function ListofCountries({ cities }) {
  console.log(cities);
  const countryObj = cities.reduce((acc, item) => {
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
