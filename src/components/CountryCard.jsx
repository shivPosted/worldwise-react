import styles from "./CountryCard.module.css";

export default function CountryCard({ countryObj }) {
  console.log(countryObj);
  const { country, emoji } = countryObj;
  return (
    <li className={styles.countryItem}>
      <span>{country}</span>
    </li>
  );
}
