import styles from "./CountryCard.module.css";

export default function CountryCard({ country }) {
  const { country: name, emoji } = country;
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{name}</span>
    </li>
  );
}
