import styles from "./CountryCard.module.css";

export default function CountryCard({ countryObj }) {
  const { country, countryCode } = countryObj;
  return (
    <li className={styles.countryItem}>
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${country}-flag`}
      />
      <span>{country}</span>
    </li>
  );
}
