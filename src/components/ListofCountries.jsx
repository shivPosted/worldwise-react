import CountryCard from "./CountryCard";
import styles from "./ListofCountries.module.css";
export default function ListofCountries({ countries }) {
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryCard country={country} key={country.id} />
      ))}
    </ul>
  );
}
